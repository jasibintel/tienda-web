# Mapa de Páginas – deglorialibros.com

## 1. Resumen General

- **Framework**: Next.js 14+ (App Router)
- **Carpeta base de rutas**: `app/`
- **Número total de páginas detectadas**: 24 páginas
- **Grupos principales**:
  - Páginas públicas / marketing (7)
  - Librería / catálogo (2)
  - Recursos gratuitos (1)
  - Colecciones (2)
  - Cuenta de usuario / autenticación (3)
  - Carrito y checkout (4)
  - Administración (admin) (6)
  - Páginas de prueba (1)

---

## 2. Listado de Páginas por Ruta

### `/` (Home)

- **Archivo(s)**: `app/page.tsx`
- **Tipo**: Pública
- **Objetivo principal**: Página de inicio que presenta la plataforma, libros destacados, libros gratuitos, categorías y testimonios.
- **Contenido principal**:
  - Hero section (con CTA principal)
  - Social proof (estadísticas)
  - Libros destacados (FeaturedBooks)
  - Libros gratuitos (FreeBooks)
  - Categorías (Categories)
  - Testimonios (Testimonials)
- **Fuentes de datos**:
  - Firestore: `books` collection (libros destacados y gratuitos)
  - Componentes usan hooks: `useFeaturedBooks()`, `useFreeBooks()`
- **Estado actual**: ✅ Completada
- **TODO detectados**: Ninguno visible

---

### `/libreria`

- **Archivo(s)**: `app/libreria/page.tsx`
- **Tipo**: Pública
- **Objetivo principal**: Catálogo completo de libros con filtros por categoría, audiencia, tipo (gratis/pago) y búsqueda por texto.
- **Contenido principal**:
  - Hero del catálogo (CatalogHero)
  - Barra de filtros (FilterBar): categoría, audiencia, tipo, búsqueda
  - Grid de libros (BooksGrid) con paginación (24 libros por página)
  - Botón "Cargar más" para paginación infinita
- **Fuentes de datos**:
  - Firestore: `books` collection (todos los libros activos)
  - Hook: `useBooks()` para obtener todos los libros
  - Filtrado cliente-side con `filterBooks()` utility
- **Estado actual**: ✅ Completada
- **TODO detectados**: Ninguno visible

---

### `/libreria/[id]`

- **Archivo(s)**: `app/libreria/[id]/page.tsx`
- **Tipo**: Pública
- **Objetivo principal**: Página de detalle de un libro individual con toda la información, botones de compra/descarga y libros relacionados.
- **Contenido principal**:
  - Breadcrumbs (navegación)
  - ProductHero (portada, título, autor, precio, botones)
  - BookDescription (descripción larga)
  - LearningPoints (puntos de aprendizaje)
  - TechnicalDetails (páginas, formatos, ISBN, etc.)
  - TargetAudience (audiencia objetivo)
  - RelatedBooks (libros relacionados por categoría/autor)
- **Fuentes de datos**:
  - Firestore: `books` collection (libro por ID)
  - Hook: `useBook(bookId)` para obtener el libro
  - Hook: `useBooks()` para libros relacionados
- **Estado actual**: ⚠️ Parcialmente implementada
- **TODO detectados**:
  - `handlePurchase()`: Muestra alert "Funcionalidad de compra próximamente"
  - `handleDownload()`: Muestra alert "Funcionalidad de descarga próximamente"
  - Falta integración con carrito de compras
  - Falta integración con sistema de descarga para libros gratuitos

---

### `/gratis`

- **Archivo(s)**: `app/gratis/page.tsx`
- **Tipo**: Pública
- **Objetivo principal**: Página dedicada a mostrar todos los libros gratuitos disponibles para descarga.
- **Contenido principal**:
  - Header de página (título y subtítulo)
  - IntroSection (mensaje inspiracional)
  - FreeBooksGrid (grid de libros gratuitos)
  - CTA section (botones a librería completa y colecciones)
- **Fuentes de datos**:
  - Firestore: `books` collection filtrada por `isFree: true`
  - Hook: `useFreeBooks()`
- **Estado actual**: ✅ Completada
- **TODO detectados**: Ninguno visible

---

### `/colecciones`

- **Archivo(s)**: `app/colecciones/page.tsx`
- **Tipo**: Pública
- **Objetivo principal**: Listado de todas las colecciones temáticas activas.
- **Contenido principal**:
  - Header de página
  - CollectionsGrid (grid de tarjetas de colecciones)
  - CTAs (catálogo completo y libros gratuitos)
- **Fuentes de datos**:
  - Firestore: `collections` collection filtrada por `isActive: true`
  - Hook: `useCollections()`
- **Estado actual**: ✅ Completada
- **TODO detectados**: Ninguno visible

---

### `/colecciones/[slug]`

- **Archivo(s)**: `app/colecciones/[slug]/page.tsx`
- **Tipo**: Pública
- **Objetivo principal**: Página de detalle de una colección con su descripción, banner y listado de libros incluidos.
- **Contenido principal**:
  - Hero banner (imagen de banner de la colección)
  - Botón "Volver a colecciones"
  - Descripción larga de la colección
  - Nota de orden de lectura (si aplica)
  - Grid de libros de la colección (con numeración si tiene orden de lectura)
  - CTAs (explorar más colecciones, ver catálogo completo)
- **Fuentes de datos**:
  - Firestore: `collections` collection (por slug)
  - Firestore: `books` collection (libros incluidos en la colección)
  - Hook: `useCollectionBySlug(slug)`
  - Hook: `useBooks()` para filtrar libros de la colección
- **Estado actual**: ✅ Completada
- **TODO detectados**: Ninguno visible

---

### `/sobre-nosotros`

- **Archivo(s)**: `app/sobre-nosotros/page.tsx`
- **Tipo**: Pública / Informativa
- **Objetivo principal**: Página que presenta la historia, valores, propósito y fundador del ministerio.
- **Contenido principal**:
  - Hero section (título inspiracional)
  - Nuestra Historia (split 50/50 con imagen y texto narrativo)
  - Nuestros Valores (grid 3x2 con 6 valores: Fidelidad, Excelencia, Generosidad, Servicio, Integridad, Amor)
  - Nuestro Propósito (sección con lista de objetivos)
  - Conoce al Fundador (Jairo Sierra - foto circular, biografía)
  - Call to Action (únete a la visión)
- **Fuentes de datos**:
  - Contenido estático (hardcodeado en el componente)
  - Imágenes: `/images/about-us-history.jpg`, `/images/jairo-sierra-avatar.jpg` (placeholders)
- **Estado actual**: ✅ Completada (recientemente rediseñada)
- **TODO detectados**: 
  - Imágenes de placeholder necesitan ser reemplazadas por imágenes reales
  - Verificar que las imágenes existan en `/public/images/`

---

### `/contacto`

- **Archivo(s)**: `app/contacto/page.tsx`
- **Tipo**: Pública
- **Objetivo principal**: Página de contacto con formulario y información de contacto.
- **Contenido principal**:
  - ContactForm (formulario de contacto)
  - ContactInfoCard (información de contacto)
  - FAQAccordion (preguntas frecuentes)
- **Fuentes de datos**:
  - Formulario (sin backend implementado aún)
  - Contenido estático
- **Estado actual**: ⚠️ Parcialmente implementada
- **TODO detectados**:
  - Formulario de contacto no tiene backend (no envía emails)
  - Falta integración con servicio de email o base de datos

---

### `/auth/login`

- **Archivo(s)**: `app/auth/login/page.tsx`
- **Tipo**: Auth / Pública (acceso sin autenticación)
- **Objetivo principal**: Página de inicio de sesión con email/password y Google Sign-In.
- **Contenido principal**:
  - Formulario de login (email, contraseña)
  - Botón "Continuar con Google"
  - Link a registro
  - Link a recuperación de contraseña
- **Fuentes de datos**:
  - Firebase Authentication (email/password y Google)
  - Hook: `useAuth()` del AuthContext
- **Estado actual**: ✅ Completada
- **TODO detectados**: Ninguno visible

---

### `/registro`

- **Archivo(s)**: `app/registro/page.tsx`
- **Tipo**: Auth / Pública
- **Objetivo principal**: Página de registro de nuevos usuarios con email/password y Google Sign-In.
- **Contenido principal**:
  - Formulario de registro (email, contraseña, confirmar contraseña, nombre opcional)
  - Botón "Continuar con Google"
  - Link a login
- **Fuentes de datos**:
  - Firebase Authentication
  - Hook: `useAuth()` del AuthContext
- **Estado actual**: ✅ Completada
- **TODO detectados**: Ninguno visible

---

### `/mi-biblioteca`

- **Archivo(s)**: `app/mi-biblioteca/page.tsx`
- **Tipo**: Privada (requiere autenticación)
- **Objetivo principal**: Página donde el usuario ve todos los libros que ha adquirido o descargado.
- **Contenido principal**:
  - PageHeader (título y descripción)
  - LibraryFilters (filtros por categoría, tipo, búsqueda)
  - LibraryCard (tarjetas de libros en la biblioteca)
  - EmptyLibraryState (estado vacío si no hay libros)
  - NotAuthenticatedState (mensaje si no está autenticado)
- **Fuentes de datos**:
  - Firestore: `users/{userId}/library` subcollection
  - Hook: `useUserLibrary()` del AuthContext
- **Estado actual**: ⚠️ Parcialmente implementada
- **TODO detectados**:
  - Verificar que la subcollection `library` se esté creando correctamente al comprar/descargar
  - Falta funcionalidad de descarga directa desde esta página
  - Falta filtrado y búsqueda funcional

---

### `/carrito`

- **Archivo(s)**: `app/carrito/page.tsx`
- **Tipo**: Pública (pero requiere autenticación para checkout)
- **Objetivo principal**: Página del carrito de compras donde el usuario revisa los items antes de comprar.
- **Contenido principal**:
  - CartItem (items del carrito con cantidad, precio, eliminar)
  - CartSummary (resumen de totales)
  - EmptyCart (estado vacío)
  - Botón "Proceder al checkout"
- **Fuentes de datos**:
  - CartContext (estado local del carrito)
  - No persiste en Firestore (solo en memoria/localStorage)
- **Estado actual**: ⚠️ Parcialmente implementada
- **TODO detectados**:
  - Falta integración con checkout real
  - Falta persistencia del carrito en Firestore para usuarios autenticados
  - Falta cálculo de impuestos, envío (si aplica)

---

### `/checkout/[orderId]`

- **Archivo(s)**: `app/checkout/[orderId]/page.tsx`
- **Tipo**: Privada (requiere autenticación)
- **Objetivo principal**: Página de checkout donde el usuario completa la información de pago y confirma la compra.
- **Contenido principal**:
  - CheckoutHeader (pasos del proceso)
  - OrderItem (items de la orden)
  - OrderSummary (resumen de la orden)
  - PaymentMethod (métodos de pago)
  - TotalSection (totales)
  - CheckoutButton (botón de confirmar compra)
- **Fuentes de datos**:
  - CartContext (items del carrito)
  - Firestore: `orders` collection (para crear la orden)
- **Estado actual**: ⚠️ Parcialmente implementada
- **TODO detectados**:
  - Falta integración con pasarela de pago real (Stripe, PayPal, etc.)
  - Falta validación de formularios
  - Falta creación real de orden en Firestore

---

### `/checkout/success/[orderId]`

- **Archivo(s)**: `app/checkout/success/[orderId]/page.tsx`
- **Tipo**: Privada
- **Objetivo principal**: Página de confirmación después de una compra exitosa.
- **Contenido principal**:
  - Mensaje de éxito
  - Detalles de la orden
  - Botón para ir a "Mi Biblioteca"
- **Fuentes de datos**:
  - Firestore: `orders` collection (orden por ID)
- **Estado actual**: ⚠️ Parcialmente implementada
- **TODO detectados**:
  - Falta obtener orden real de Firestore
  - Falta agregar libros a la biblioteca del usuario automáticamente

---

### `/checkout/cancel/[orderId]`

- **Archivo(s)**: `app/checkout/cancel/[orderId]/page.tsx`
- **Tipo**: Privada
- **Objetivo principal**: Página mostrada cuando el usuario cancela el proceso de checkout.
- **Contenido principal**:
  - Mensaje de cancelación
  - Botón para volver al carrito
- **Fuentes de datos**:
  - Ninguna (página estática)
- **Estado actual**: ⚠️ Muy básica
- **TODO detectados**:
  - Falta información útil sobre por qué se canceló
  - Falta opción de reintentar el checkout

---

### `/admin`

- **Archivo(s)**: `app/admin/page.tsx`
- **Tipo**: Admin (requiere autenticación + rol admin)
- **Objetivo principal**: Dashboard principal del panel de administración con estadísticas y acceso rápido.
- **Contenido principal**:
  - AdminLayout (layout con sidebar)
  - StatCard (tarjetas de estadísticas: libros, usuarios, pedidos, etc.)
  - Accesos rápidos a secciones
- **Fuentes de datos**:
  - Firestore: `books`, `users`, `orders` collections (para estadísticas)
- **Estado actual**: ⚠️ Parcialmente implementada
- **TODO detectados**:
  - Falta obtener estadísticas reales de Firestore
  - Falta gráficos o visualizaciones
  - Falta protección de ruta (verificar `isAdmin`)

---

### `/admin/libros`

- **Archivo(s)**: `app/admin/libros/page.tsx`
- **Tipo**: Admin
- **Objetivo principal**: Listado de todos los libros con opciones de crear, editar, eliminar y activar/desactivar.
- **Contenido principal**:
  - AdminLayout
  - Barra de búsqueda
  - Filtros (todos, gratis, pagos, destacados, activos, inactivos)
  - Tabla/grid de libros con acciones (editar, eliminar, toggle activo)
  - Botón "Crear libro"
- **Fuentes de datos**:
  - Firestore: `books` collection
  - Hook: `useBooks()`
  - Funciones: `deleteBook()`, `updateBook()` de `lib/firebase/books.ts`
- **Estado actual**: ✅ Completada
- **TODO detectados**: Ninguno visible

---

### `/admin/libros/crear`

- **Archivo(s)**: `app/admin/libros/crear/page.tsx`
- **Tipo**: Admin
- **Objetivo principal**: Formulario para crear un nuevo libro con todos sus campos.
- **Contenido principal**:
  - AdminLayout
  - Formulario completo (título, subtítulo, autor, descripción, precio, categoría, etc.)
  - Campos para: coverUrl, formats, learningPoints, targetAudience, technical details
  - Botones: Guardar, Cancelar
- **Fuentes de datos**:
  - Firestore: `books` collection (crear documento)
  - Función: `createBook()` de `lib/firebase/books.ts`
- **Estado actual**: ✅ Completada
- **TODO detectados**: Ninguno visible

---

### `/admin/libros/editar/[id]`

- **Archivo(s)**: `app/admin/libros/editar/[id]/page.tsx`
- **Tipo**: Admin
- **Objetivo principal**: Formulario para editar un libro existente.
- **Contenido principal**:
  - AdminLayout
  - Formulario pre-poblado con datos del libro
  - Mismos campos que crear libro
  - Botones: Guardar cambios, Cancelar
- **Fuentes de datos**:
  - Firestore: `books` collection (obtener por ID y actualizar)
  - Función: `getBookById()`, `updateBook()` de `lib/firebase/books.ts`
- **Estado actual**: ✅ Completada
- **TODO detectados**: Ninguno visible

---

### `/admin/pedidos`

- **Archivo(s)**: `app/admin/pedidos/page.tsx`
- **Tipo**: Admin
- **Objetivo principal**: Listado de todas las órdenes/pedidos realizados por los usuarios.
- **Contenido principal**:
  - AdminLayout
  - Lista de pedidos con detalles (usuario, fecha, total, estado)
  - Filtros por estado
  - Acciones (ver detalle, cambiar estado)
- **Fuentes de datos**:
  - Firestore: `orders` collection
- **Estado actual**: ⚠️ Parcialmente implementada
- **TODO detectados**:
  - Falta obtener pedidos reales de Firestore
  - Falta funcionalidad de cambiar estado de pedidos
  - Falta página de detalle de pedido

---

### `/admin/usuarios`

- **Archivo(s)**: `app/admin/usuarios/page.tsx`
- **Tipo**: Admin
- **Objetivo principal**: Listado de usuarios registrados con opciones de gestión.
- **Contenido principal**:
  - AdminLayout
  - Lista de usuarios (email, nombre, fecha de registro, rol)
  - Acciones (ver perfil, cambiar rol, eliminar)
- **Fuentes de datos**:
  - Firestore: `users` collection
  - Firebase Auth (para roles)
- **Estado actual**: ⚠️ Parcialmente implementada
- **TODO detectados**:
  - Falta obtener usuarios reales de Firestore
  - Falta funcionalidad de cambiar roles
  - Falta página de detalle de usuario

---

### `/admin/categorias`

- **Archivo(s)**: `app/admin/categorias/page.tsx`
- **Tipo**: Admin
- **Objetivo principal**: Gestión de categorías de libros (crear, editar, eliminar).
- **Contenido principal**:
  - AdminLayout
  - Lista de categorías
  - Formulario para crear/editar categorías
- **Fuentes de datos**:
  - Firestore: `categories` collection (si existe)
- **Estado actual**: ⚠️ Parcialmente implementada
- **TODO detectados**:
  - Falta verificar si la colección `categories` existe en Firestore
  - Falta CRUD completo de categorías

---

### `/admin/testimonios`

- **Archivo(s)**: `app/admin/testimonios/page.tsx`
- **Tipo**: Admin
- **Objetivo principal**: Gestión de testimonios de usuarios (crear, editar, aprobar, eliminar).
- **Contenido principal**:
  - AdminLayout
  - Lista de testimonios
  - Formulario para crear/editar testimonios
- **Fuentes de datos**:
  - Firestore: `testimonials` collection
- **Estado actual**: ⚠️ Parcialmente implementada
- **TODO detectados**:
  - Falta obtener testimonios reales de Firestore
  - Falta CRUD completo de testimonios

---

### `/test-cart`

- **Archivo(s)**: `app/test-cart/page.tsx`
- **Tipo**: Desarrollo / Prueba
- **Objetivo principal**: Página de prueba para el carrito de compras (no debería estar en producción).
- **Contenido principal**:
  - Componentes de prueba del carrito
- **Fuentes de datos**:
  - CartContext (mock)
- **Estado actual**: ⚠️ Página de desarrollo
- **TODO detectados**:
  - **ELIMINAR antes de producción** o mover a ruta protegida solo en desarrollo

---

## 3. Páginas de Detalle de Libro

### Ruta: `/libreria/[id]`

**Datos del libro que muestra:**
- Título y subtítulo
- Autor
- Portada (coverUrl)
- Descripción corta y larga
- Precio (o indicador "GRATIS")
- Formatos disponibles (PDF, EPUB)
- Puntos de aprendizaje (learningPoints)
- Audiencia objetivo (targetAudience)
- Detalles técnicos (páginas, tamaño de archivo, idioma, fecha de publicación, ISBN, editorial)
- Categoría y audiencia
- Libros relacionados (misma categoría o mismo autor)

**Botones disponibles:**
- ✅ **Comprar**: Existe pero muestra alert "Funcionalidad de compra próximamente"
- ✅ **Descargar**: Existe pero muestra alert "Funcionalidad de descarga próximamente"
- ❌ **Añadir a biblioteca**: No existe (debería agregarse)
- ❌ **Añadir al carrito**: No existe (debería agregarse)

**Qué falta para página promocional completa:**
1. Integración real del botón "Comprar" con el flujo de checkout
2. Integración real del botón "Descargar" para libros gratuitos (descargar archivo PDF/EPUB)
3. Botón "Añadir al carrito" que agregue el libro al CartContext
4. Botón "Añadir a biblioteca" (para wishlist o favoritos)
5. Compartir en redes sociales
6. Reseñas/calificaciones de usuarios
7. Vista previa del libro (primeras páginas)
8. Contador de descargas/compras
9. Badge de "Nuevo" o "Más vendido"

---

## 4. Páginas de Cuenta y Biblioteca

### Flujo Esperado

1. **Login** (`/auth/login`): Usuario inicia sesión con email/password o Google
2. **Registro** (`/registro`): Usuario nuevo se registra
3. **Mi Biblioteca** (`/mi-biblioteca`): Usuario ve sus libros adquiridos/descargados
4. **Perfil** (no existe aún): Usuario gestiona su perfil, preferencias, métodos de pago

### Qué ya está implementado

- ✅ Login con email/password
- ✅ Login con Google (Google Sign-In)
- ✅ Registro con email/password
- ✅ Registro con Google
- ✅ Página "Mi Biblioteca" con estructura básica
- ✅ AuthContext con gestión de estado de autenticación
- ✅ Protección de rutas (redirección si no está autenticado)

### Qué falta

1. **Página de Perfil** (`/perfil` o `/mi-cuenta`):
   - Editar información personal (nombre, foto)
   - Cambiar contraseña
   - Gestionar métodos de pago
   - Preferencias de notificaciones
   - Historial de pedidos

2. **Recuperación de contraseña**:
   - Link existe en login pero falta página `/auth/reset-password` o `/auth/forgot-password`
   - Implementar `resetPassword()` del AuthContext

3. **Mi Biblioteca**:
   - Mostrar libros reales de `users/{userId}/library` subcollection
   - Funcionalidad de descarga directa desde la biblioteca
   - Filtros y búsqueda funcionales
   - Organización por carpetas/etiquetas

4. **Historial de pedidos** (`/mis-pedidos`):
   - Lista de todas las compras realizadas
   - Detalle de cada pedido
   - Facturas/recibos descargables

---

## 5. Páginas de Administración (Admin)

### Rutas encontradas

1. `/admin` - Dashboard principal
2. `/admin/libros` - Gestión de libros ✅
3. `/admin/libros/crear` - Crear libro ✅
4. `/admin/libros/editar/[id]` - Editar libro ✅
5. `/admin/pedidos` - Gestión de pedidos ⚠️
6. `/admin/usuarios` - Gestión de usuarios ⚠️
7. `/admin/categorias` - Gestión de categorías ⚠️
8. `/admin/testimonios` - Gestión de testimonios ⚠️

### Nivel de implementación

**✅ Completadas:**
- `/admin/libros` - CRUD completo conectado a Firestore
- `/admin/libros/crear` - Formulario completo y funcional
- `/admin/libros/editar/[id]` - Edición completa y funcional

**⚠️ Parcialmente implementadas:**
- `/admin` - UI completa pero falta obtener estadísticas reales
- `/admin/pedidos` - UI básica pero falta obtener pedidos de Firestore
- `/admin/usuarios` - UI básica pero falta obtener usuarios de Firestore
- `/admin/categorias` - UI básica pero falta verificar colección `categories`
- `/admin/testimonios` - UI básica pero falta obtener testimonios de Firestore

### Protección de rutas

- ✅ Todas las páginas de admin verifican `isAdmin` del AuthContext
- ✅ Redirección a login si no está autenticado
- ✅ Mensaje de "Acceso Denegado" si no es admin

### Acciones permitidas

**Libros:**
- ✅ Crear libro
- ✅ Editar libro
- ✅ Eliminar libro (soft delete: `isActive: false`)
- ✅ Activar/desactivar libro
- ✅ Buscar y filtrar libros

**Pedidos:**
- ❌ Ver lista de pedidos (falta obtener de Firestore)
- ❌ Ver detalle de pedido (falta página)
- ❌ Cambiar estado de pedido (falta funcionalidad)

**Usuarios:**
- ❌ Ver lista de usuarios (falta obtener de Firestore)
- ❌ Cambiar rol de usuario (falta funcionalidad)
- ❌ Ver perfil de usuario (falta página)

**Categorías:**
- ❌ CRUD completo (falta verificar si existe colección `categories`)

**Testimonios:**
- ❌ CRUD completo (falta obtener de Firestore)

---

## 6. Páginas Legales e Informativas

### Páginas que existen

- ✅ `/sobre-nosotros` - Completa y recientemente rediseñada
- ✅ `/contacto` - Parcialmente implementada (falta backend del formulario)

### Páginas que NO existen pero están enlaces en el Footer

- ❌ `/preguntas-frecuentes` - **Link en Footer pero página no existe** (404)
- ❌ `/politica-reembolso` - **Link en Footer pero página no existe** (404)

### Páginas legales faltantes (recomendadas)

- ❌ `/terminos-y-condiciones` - No existe
- ❌ `/politica-de-privacidad` - No existe
- ❌ `/aviso-legal` - No existe (opcional)

### Contenido actual

**`/contacto`:**
- Formulario de contacto (sin backend)
- Información de contacto (email)
- FAQ accordion (contenido estático)
- **Estado**: ⚠️ Funcional pero sin envío de emails

---

## 7. Vacíos y Oportunidades Detectadas

### 1. Páginas que NO existen pero son importantes

#### A. Páginas de usuario faltantes

1. **`/perfil` o `/mi-cuenta`**
   - Editar perfil (nombre, foto, email)
   - Cambiar contraseña
   - Gestionar métodos de pago
   - Preferencias de notificaciones
   - **Prioridad**: Alta

2. **`/mis-pedidos` o `/pedidos`**
   - Historial completo de compras
   - Detalle de cada pedido
   - Facturas/recibos descargables
   - Estado de envío (si aplica)
   - **Prioridad**: Alta

3. **`/auth/forgot-password` o `/auth/reset-password`**
   - Recuperación de contraseña
   - Link existe en login pero página no existe
   - **Prioridad**: Media

#### B. Páginas legales faltantes

1. **`/preguntas-frecuentes`**
   - Link en Footer pero página no existe (causa 404)
   - **Prioridad**: Alta (hay link roto)

2. **`/politica-reembolso`**
   - Link en Footer pero página no existe (causa 404)
   - **Prioridad**: Alta (hay link roto)

3. **`/terminos-y-condiciones`**
   - Necesaria para cumplimiento legal
   - **Prioridad**: Media

4. **`/politica-de-privacidad`**
   - Necesaria para cumplimiento legal (GDPR, etc.)
   - **Prioridad**: Media

#### C. Páginas de marketing/soporte faltantes

1. **`/como-funciona` o `/ayuda`**
   - Cómo comprar libros
   - Cómo descargar libros gratuitos
   - Cómo usar la plataforma
   - **Prioridad**: Media

2. **`/soporte`**
   - Centro de ayuda
   - Tickets de soporte
   - Chat en vivo (opcional)
   - **Prioridad**: Baja

3. **`/blog` o `/recursos`** (opcional)
   - Artículos, devocionales, recursos adicionales
   - **Prioridad**: Baja

### 2. Páginas que existen pero están incompletas

#### A. `/libreria/[id]` (Detalle de libro)

**Falta:**
- Integración real de botón "Comprar" con checkout
- Integración real de botón "Descargar" para libros gratuitos
- Botón "Añadir al carrito"
- Botón "Añadir a biblioteca" (wishlist)
- Compartir en redes sociales
- Reseñas/calificaciones
- Vista previa del libro
- **Prioridad**: Alta

#### B. `/mi-biblioteca`

**Falta:**
- Mostrar libros reales de Firestore (`users/{userId}/library`)
- Funcionalidad de descarga directa
- Filtros y búsqueda funcionales
- Organización por categorías/etiquetas
- **Prioridad**: Alta

#### C. `/carrito`

**Falta:**
- Integración real con checkout
- Persistencia en Firestore para usuarios autenticados
- Cálculo de impuestos (si aplica)
- Códigos de descuento
- **Prioridad**: Alta

#### D. `/checkout/[orderId]`

**Falta:**
- Integración con pasarela de pago (Stripe, PayPal, etc.)
- Validación de formularios
- Creación real de orden en Firestore
- **Prioridad**: Alta

#### E. `/checkout/success/[orderId]`

**Falta:**
- Obtener orden real de Firestore
- Agregar libros automáticamente a la biblioteca del usuario
- Enviar email de confirmación
- **Prioridad**: Alta

#### F. `/contacto`

**Falta:**
- Backend para envío de emails
- Integración con servicio de email (SendGrid, Mailgun, etc.)
- Confirmación de envío al usuario
- **Prioridad**: Media

#### G. Páginas de Admin

**`/admin`:**
- Obtener estadísticas reales de Firestore
- Gráficos o visualizaciones
- **Prioridad**: Media

**`/admin/pedidos`:**
- Obtener pedidos reales de Firestore
- Página de detalle de pedido
- Cambiar estado de pedidos
- **Prioridad**: Alta

**`/admin/usuarios`:**
- Obtener usuarios reales de Firestore
- Cambiar roles de usuarios
- Página de detalle de usuario
- **Prioridad**: Media

**`/admin/categorias`:**
- Verificar si existe colección `categories` en Firestore
- CRUD completo de categorías
- **Prioridad**: Baja

**`/admin/testimonios`:**
- Obtener testimonios reales de Firestore
- CRUD completo de testimonios
- **Prioridad**: Baja

### 3. Inconsistencias detectadas

#### A. Links rotos (404)

1. **Footer → `/preguntas-frecuentes`**
   - Link existe pero página no existe
   - **Solución**: Crear página o eliminar link

2. **Footer → `/politica-reembolso`**
   - Link existe pero página no existe
   - **Solución**: Crear página o eliminar link

#### B. Páginas de desarrollo en producción

1. **`/test-cart`**
   - Página de prueba que no debería estar en producción
   - **Solución**: Eliminar o proteger con variable de entorno

#### C. Rutas inconsistentes

1. **Footer tiene link a `/colecciones` dos veces** (líneas 68 y 70)
   - Una dice "Devocionales" y otra "Colecciones"
   - **Solución**: Corregir o eliminar duplicado

#### D. Componentes no usados

- Verificar si hay componentes en `/components` que no se usan en ninguna página
- **Solución**: Auditar componentes y eliminar los no usados

---

## 8. Resumen Ejecutivo

### Estadísticas

- **Total de páginas**: 24
- **Páginas completadas**: 8 (33%)
- **Páginas parcialmente implementadas**: 13 (54%)
- **Páginas muy básicas/placeholders**: 3 (13%)
- **Links rotos detectados**: 2 (en Footer)

### Prioridades de desarrollo

#### 🔴 Prioridad Alta (Crítico para funcionamiento)

1. Completar funcionalidad de compra/descarga en `/libreria/[id]`
2. Implementar checkout real con pasarela de pago
3. Completar `/mi-biblioteca` con libros reales de Firestore
4. Crear páginas legales faltantes (`/preguntas-frecuentes`, `/politica-reembolso`)
5. Completar `/admin/pedidos` con datos reales
6. Arreglar links rotos en Footer

#### 🟡 Prioridad Media (Importante para UX)

1. Crear página `/perfil` o `/mi-cuenta`
2. Crear página `/mis-pedidos`
3. Implementar recuperación de contraseña
4. Completar backend de formulario de contacto
5. Completar `/admin` con estadísticas reales
6. Completar `/admin/usuarios` con datos reales

#### 🟢 Prioridad Baja (Mejoras futuras)

1. Completar `/admin/categorias`
2. Completar `/admin/testimonios`
3. Agregar página `/como-funciona`
4. Eliminar o proteger `/test-cart`

### Recomendaciones

1. **Eliminar o completar páginas incompletas**: Es mejor tener menos páginas completas que muchas incompletas que generan frustración.

2. **Arreglar links rotos inmediatamente**: Los links en Footer que apuntan a páginas inexistentes generan errores 404 y mala experiencia.

3. **Priorizar flujo de compra**: El flujo completo de compra (carrito → checkout → pago → biblioteca) es crítico para el negocio.

4. **Implementar protección de rutas**: Asegurar que todas las rutas privadas y admin estén correctamente protegidas.

5. **Documentar APIs y hooks**: Documentar las funciones de Firestore y hooks personalizados para facilitar el desarrollo futuro.

---

**Documento generado el**: $(date)
**Última actualización del código analizado**: Commit más reciente del repositorio

