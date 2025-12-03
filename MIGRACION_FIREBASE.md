# Guía de Migración de Firebase

Esta guía te ayudará a migrar tu proyecto anterior con Firebase a este nuevo proyecto.

## 📋 Estrategia de Migración

### Opción 1: Usar el mismo proyecto de Firebase (Recomendado)
**Ventajas:**
- Mantienes todos los datos existentes (usuarios, libros, pedidos)
- No necesitas migrar datos
- Los usuarios existentes pueden seguir usando la aplicación

**Pasos:**
1. Usa las mismas credenciales de Firebase del proyecto anterior
2. Copia el archivo `.env.local` del proyecto anterior
3. Verifica que las colecciones de Firestore sean compatibles

### Opción 2: Crear un nuevo proyecto de Firebase
**Ventajas:**
- Empiezas desde cero sin datos antiguos
- Estructura de datos más limpia

**Desventajas:**
- Perderás todos los datos del proyecto anterior
- Los usuarios tendrán que registrarse nuevamente

## 🚀 Pasos para la Migración (Opción 1 - Recomendada)

### Paso 1: Obtener las credenciales del proyecto anterior

1. **Client-side (Frontend):**
   - Ve a Firebase Console → Tu proyecto anterior
   - Project Settings → Your apps → Web app
   - Copia el objeto `firebaseConfig`

2. **Server-side (Backend):**
   - Project Settings → Service Accounts
   - Si ya tienes una cuenta de servicio, descarga la clave JSON
   - O genera una nueva si es necesario

### Paso 2: Configurar variables de entorno

Crea el archivo `.env.local` en la raíz de `tienda-web`:

```bash
# Client-side Firebase Config (del proyecto anterior)
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=tu_measurement_id

# Server-side Firebase Admin Config (del proyecto anterior)
FIREBASE_PROJECT_ID=tu_proyecto_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@tu_proyecto.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTu clave privada aquí\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
```

### Paso 3: Verificar estructura de Firestore

Compara las colecciones de tu proyecto anterior con las que necesita este proyecto:

**Colecciones necesarias en este proyecto:**
- `books` - Libros de la tienda
- `users` - Información de usuarios
- `orders` - Pedidos realizados
- `testimonials` - Testimonios
- `collections` - Colecciones de libros
- `userLibrary` - Biblioteca de usuarios (subcolección de users)

**Verifica:**
- ¿Tus colecciones tienen la misma estructura?
- ¿Los campos coinciden con los tipos TypeScript definidos en `lib/types.ts`?

### Paso 4: Migrar datos (si es necesario)

Si la estructura es diferente, necesitarás:

1. **Exportar datos del proyecto anterior:**
   ```bash
   # Usa Firebase CLI o la consola web
   firebase firestore:export gs://tu-bucket/backup
   ```

2. **Transformar datos al nuevo formato:**
   - Crea un script de migración
   - Mapea los campos antiguos a los nuevos
   - Valida que todos los campos requeridos estén presentes

3. **Importar datos al nuevo formato:**
   ```bash
   firebase firestore:import gs://tu-bucket/backup
   ```

### Paso 5: Verificar Security Rules

Asegúrate de que las reglas de seguridad de Firestore y Storage sean compatibles:

**Firestore Rules** (debe estar en Firebase Console):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Books collection - public read, admin write
    match /books/{bookId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Users collection - authenticated users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Orders collection - users can read their own orders
    match /orders/{orderId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null;
    }
    
    // Testimonials - public read, admin write
    match /testimonials/{testimonialId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Collections - public read, admin write
    match /collections/{collectionId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### Paso 6: Probar la conexión

1. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Verifica que no haya errores en la consola del navegador

3. Prueba las funcionalidades:
   - Login/Registro
   - Cargar libros desde Firestore
   - Crear pedidos
   - Acceder a la biblioteca del usuario

## 🔄 Migración de Funcionalidades

### Autenticación
- [ ] Reemplazar `useMockAuth` con Firebase Auth
- [ ] Implementar login con email/password
- [ ] Implementar registro
- [ ] Implementar logout
- [ ] Manejar estados de autenticación

### Libros
- [ ] Reemplazar `mockData.ts` con consultas a Firestore
- [ ] Implementar carga de libros desde Firestore
- [ ] Implementar búsqueda y filtros con Firestore queries

### Carrito y Pedidos
- [ ] Guardar carrito en Firestore (opcional, puede seguir en localStorage)
- [ ] Crear pedidos en Firestore
- [ ] Cargar historial de pedidos desde Firestore

### Biblioteca de Usuario
- [ ] Reemplazar `mockUserLibrary.ts` con Firestore
- [ ] Guardar libros adquiridos en Firestore
- [ ] Cargar biblioteca desde Firestore

### Panel de Administración
- [ ] Reemplazar `mockAdminData.ts` con Firestore
- [ ] CRUD de libros desde Firestore
- [ ] CRUD de categorías
- [ ] CRUD de testimonios
- [ ] Gestión de usuarios

## 📝 Checklist de Migración

- [ ] Credenciales de Firebase configuradas en `.env.local`
- [ ] Variables de entorno cargadas correctamente
- [ ] Firestore conectado y funcionando
- [ ] Authentication funcionando
- [ ] Storage configurado (si usas archivos)
- [ ] Security Rules actualizadas
- [ ] Datos migrados (si aplica)
- [ ] Autenticación implementada
- [ ] CRUD de libros funcionando
- [ ] Carrito y pedidos funcionando
- [ ] Biblioteca de usuario funcionando
- [ ] Panel de admin funcionando
- [ ] Tests realizados

## ⚠️ Consideraciones Importantes

1. **Backup:** Haz un backup completo de tu proyecto anterior antes de migrar
2. **Pruebas:** Prueba en un entorno de desarrollo antes de producción
3. **Downtime:** Planifica un tiempo de mantenimiento si migras datos
4. **Notificación:** Informa a los usuarios sobre la migración si es necesario

## 🆘 Troubleshooting

### Error: "Firebase: Error (auth/configuration-not-found)"
- Verifica que `.env.local` existe y tiene las variables correctas
- Reinicia el servidor después de crear `.env.local`

### Error: "Permission denied" en Firestore
- Verifica las Security Rules
- Asegúrate de que el usuario esté autenticado cuando sea necesario

### Datos no aparecen
- Verifica que las colecciones existan en Firestore
- Verifica que los nombres de las colecciones coincidan
- Revisa la consola del navegador para errores

## 📞 Siguiente Paso

Una vez que tengas las credenciales del proyecto anterior, puedo ayudarte a:
1. Crear el archivo `.env.local` con las credenciales
2. Implementar las funciones de Firebase para reemplazar los mocks
3. Crear scripts de migración de datos si es necesario

¿Tienes acceso a las credenciales del proyecto anterior? Si es así, puedo ayudarte a configurarlas ahora.

