# Documentación: Flujo Completo de Checkout

## Resumen

Este documento describe el flujo completo de compra desde la selección de un libro hasta que aparece en la biblioteca del usuario, incluyendo los diferentes métodos de pago y estados de las órdenes.

---

## 1. Modelo de Datos en Firestore

### 1.1. Colección `orders`

Cada documento en la colección `orders` tiene la siguiente estructura:

```typescript
{
  id: string;                    // ID del documento (generado automáticamente)
  buyerId: string;              // UID del usuario que compra
  items: OrderItem[];           // Array de libros en la orden
  subtotal: number;             // Subtotal antes de impuestos
  tax: number;                  // Impuestos (IVA 19%)
  total: number;                 // Total a pagar
  status: 'pending' | 'paid' | 'cancelled';
  paymentMethod?: 'online-simulated' | 'manual' | 'stripe' | 'wompi';
  paymentIntentId?: string;      // Para futuras integraciones con pasarelas
  isGift: boolean;              // Si es un regalo
  recipientEmail: string | null; // Email del destinatario (si es regalo)
  createdAt: Timestamp;          // Fecha de creación
  updatedAt: Timestamp;          // Fecha de última actualización
  paidAt?: Timestamp;           // Fecha de pago (solo si status = 'paid')
}
```

### 1.2. Subcolección `users/{userId}/library`

Cada documento en `users/{userId}/library/{bookId}` representa un libro otorgado al usuario:

```typescript
{
  bookId: string;               // ID del libro (también es el ID del documento)
  grantedAt: Timestamp;         // Fecha en que se otorgó el libro
  source: 'order' | 'manual';   // Origen del libro
  orderId: string | null;       // ID de la orden (si viene de una compra)
}
```

---

## 2. Flujo de Compra

### 2.1. Selección de Libro (`/libreria/[id]`)

El usuario puede:
- **Añadir al carrito**: Agrega el libro al carrito sin redirigir
- **Comprar ahora**: Limpia el carrito, agrega solo ese libro y redirige a `/carrito`

### 2.2. Carrito (`/carrito`)

- El usuario revisa los libros en su carrito
- Al hacer clic en "Proceder al checkout":
  1. Se verifica que el usuario esté autenticado (redirige a login si no)
  2. Se crea una orden en Firestore con `status = 'pending'`
  3. Se obtiene el `orderId` retornado
  4. Se limpia el carrito
  5. Se redirige a `/checkout/[orderId]`

### 2.3. Checkout (`/checkout/[orderId]`)

El usuario:
1. Ve el resumen de la orden (libros, totales)
2. Selecciona método de pago:
   - **Pago simulado en línea**: Para pruebas, se procesa inmediatamente
   - **Pago manual / transferencia**: Requiere confirmación del admin
3. Opcionalmente marca "¿Es un regalo?" y proporciona `recipientEmail`
4. Confirma la compra

**Al confirmar:**

- **Si pago simulado**:
  1. Se actualiza la orden: `status = 'paid'`, `paidAt = now`
  2. Se llama `grantBooksToUser(buyerId, bookIds, orderId)`
  3. Se redirige a `/checkout/success/[orderId]`

- **Si pago manual**:
  1. Se actualiza la orden: `paymentMethod = 'manual'`, `isGift`, `recipientEmail`
  2. Se mantiene `status = 'pending'`
  3. Se muestra mensaje informativo
  4. Se redirige a `/checkout/success/[orderId]`

### 2.4. Página de Éxito (`/checkout/success/[orderId]`)

Muestra diferentes mensajes según el estado:

- **Pago simulado + status = 'paid'**:
  - "Tu compra fue exitosa. Los libros ya están disponibles en tu biblioteca."
  - Botón: "Ir a mi biblioteca"

- **Pago manual + status = 'pending'**:
  - "Tu pedido ha sido creado. Falta que confirmemos tu pago manual."
  - "Cuando se confirme, verás los libros en tu biblioteca."
  - Instrucciones de pago y `orderId` como referencia

### 2.5. Mi Biblioteca (`/mi-biblioteca`)

- Muestra todos los libros otorgados al usuario desde `users/{userId}/library`
- Incluye datos completos del libro (hace join con `books` collection)
- Botón "Descargar" para cada libro (por ahora usa `downloadUrl` si existe)

---

## 3. Métodos de Pago

### 3.1. `online-simulated`

- **Propósito**: Para pruebas y desarrollo
- **Procesamiento**: Inmediato
- **Flujo**:
  1. Usuario selecciona este método
  2. Al confirmar, se marca la orden como pagada automáticamente
  3. Se otorgan los libros inmediatamente
  4. El usuario ve los libros en su biblioteca al instante

### 3.2. `manual`

- **Propósito**: Transferencia bancaria o pago en efectivo
- **Procesamiento**: Requiere confirmación manual del admin
- **Flujo**:
  1. Usuario selecciona este método
  2. Ve instrucciones de transferencia con `orderId` como referencia
  3. Realiza la transferencia y envía comprobante
  4. Admin marca la orden como pagada desde `/admin/pedidos`
  5. Se otorgan los libros automáticamente cuando el admin confirma

### 3.3. `stripe` y `wompi` (Futuro)

- Preparados en el modelo pero no implementados aún
- Se activarán cuando se integren las pasarelas de pago reales

---

## 4. Estados de Orden

### 4.1. `pending`

- Orden creada pero no pagada
- Puede cambiar a `paid` (pago simulado o confirmación admin) o `cancelled`

### 4.2. `paid`

- Orden pagada y confirmada
- Los libros ya fueron otorgados al usuario
- No puede cambiar de estado

### 4.3. `cancelled`

- Orden cancelada
- No se otorgan libros
- Estado final

---

## 5. Función `grantBooksToUser()`

### 5.1. Cuándo se llama

- **Automáticamente**:
  - Cuando se confirma un pago simulado en checkout
  - Cuando el admin marca una orden manual como pagada

- **Parámetros**:
  ```typescript
  grantBooksToUser(
    userId: string,        // UID del usuario
    bookIds: string[],     // Array de IDs de libros
    orderId?: string       // ID de la orden (opcional)
  )
  ```

### 5.2. Qué hace

1. Para cada `bookId`:
   - Crea o actualiza `users/{userId}/library/{bookId}`
   - Establece `grantedAt = now`
   - Establece `source = 'order'` (si hay `orderId`) o `'manual'`
   - Establece `orderId` si se proporciona

2. Si el libro ya existe en la biblioteca:
   - Solo actualiza si no tiene `orderId` (para no sobrescribir órdenes anteriores)

### 5.3. Notas importantes

- **Regalos**: Por ahora, incluso si `isGift = true`, los libros se otorgan al `buyerId`. La lógica de regalo se implementará más adelante.
- **Idempotencia**: Si se llama múltiples veces con el mismo `orderId`, no duplica libros (verifica existencia).

---

## 6. Admin: Marcar como Pagado

### 6.1. Acceso

- Ruta: `/admin/pedidos`
- Requiere: Usuario autenticado con `isAdmin = true`

### 6.2. Funcionalidad

- Muestra lista de todas las órdenes desde Firestore
- Filtros: Todos, Pagados, Pendientes, Cancelados
- Para órdenes con `paymentMethod = 'manual'` y `status = 'pending'`:
  - Botón "Marcar como pagado" visible
  - Al hacer clic:
    1. Confirma con el admin
    2. Llama `markOrderAsPaid(orderId)`
    3. Llama `grantBooksToUser(buyerId, bookIds, orderId)`
    4. Refresca la lista
    5. Muestra mensaje: "Libros activados en la biblioteca del usuario."

---

## 7. Flujo de Regalo (Preparado para Futuro)

### 7.1. Campos en Orden

- `isGift: boolean`: Indica si es un regalo
- `recipientEmail: string | null`: Email del destinatario

### 7.2. Estado Actual

- Los campos se guardan en la orden
- Los libros se otorgan al `buyerId` (comprador)
- La lógica para otorgar a `recipientEmail` se implementará más adelante

### 7.3. Implementación Futura

Cuando se implemente:
1. Si `isGift = true` y `recipientEmail` existe:
   - Buscar usuario por email
   - Otorgar libros al `recipientEmail` en lugar de `buyerId`
   - Opcionalmente, enviar email al destinatario

---

## 8. Funciones Principales

### 8.1. `lib/firebase/orders.ts`

- `createOrder(params)`: Crea orden y retorna `orderId`
- `getOrderById(orderId)`: Obtiene orden por ID
- `getAllOrders()`: Obtiene todas las órdenes (admin)
- `getUserOrders(buyerId)`: Obtiene órdenes de un usuario
- `markOrderAsPaid(orderId)`: Marca orden como pagada
- `updateOrder(orderId, updates)`: Actualiza campos de la orden

### 8.2. `lib/firebase/library.ts`

- `grantBooksToUser(userId, bookIds, orderId?)`: Otorga libros a un usuario
- `getUserLibrary(userId)`: Obtiene biblioteca (solo LibraryEntry)
- `getUserLibraryWithBooks(userId)`: Obtiene biblioteca con datos completos de libros

---

## 9. Diagrama de Flujo

```
Usuario selecciona libro
    ↓
Añade al carrito o Compra ahora
    ↓
Va a /carrito
    ↓
Procede al checkout
    ↓
Se crea orden (status: pending)
    ↓
Va a /checkout/[orderId]
    ↓
Selecciona método de pago
    ↓
┌─────────────────────┬─────────────────────┐
│ Pago Simulado       │ Pago Manual         │
│                     │                     │
│ markOrderAsPaid()   │ updateOrder()       │
│ grantBooksToUser()  │ (status: pending)   │
│ (status: paid)      │                     │
│                     │                     │
│ ↓                   │ ↓                   │
│ /checkout/success   │ /checkout/success   │
│ (Libros disponibles)│ (Esperando pago)    │
│                     │                     │
│                     │ Admin marca pagado  │
│                     │ markOrderAsPaid()   │
│                     │ grantBooksToUser()  │
│                     │ ↓                   │
│                     │ Libros disponibles  │
└─────────────────────┴─────────────────────┘
    ↓
Usuario ve libros en /mi-biblioteca
```

---

## 10. Notas de Implementación

- **Manejo de errores**: Todas las operaciones de Firestore tienen try-catch y muestran mensajes al usuario
- **Loading states**: Todas las páginas muestran estados de carga durante operaciones asíncronas
- **Validaciones**: Se valida autenticación antes de crear órdenes o acceder a biblioteca
- **Compatibilidad**: El modelo soporta tanto `buyerId` como `userId` (backward compatibility)
- **Seguridad**: Las reglas de Firestore deben validar que solo el comprador o admin puedan ver/modificar órdenes

---

**Última actualización**: $(date)
**Versión**: 1.0

