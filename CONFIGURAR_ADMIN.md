# 🔐 Configurar Sistema de Administración

## 📋 Pasos para Configurar el Admin

### Paso 1: Establecer Custom Claim de Admin

Para que un usuario pueda acceder al panel de administración, necesitas establecer el custom claim `admin: true` en Firebase Auth.

#### Opción A: Desde el Script (Recomendado)

1. Asegúrate de tener el archivo `firebase-admin-key.json` en la raíz del proyecto
2. Ejecuta el script con el email del usuario que será admin:

```bash
node scripts/setAdminClaim.js tu-email@ejemplo.com
```

El script:
- Buscará el usuario por email
- Establecerá el custom claim `admin: true`
- Mostrará confirmación

#### Opción B: Desde Firebase Console

1. Ve a: https://console.firebase.google.com/project/tufecrecelibros/authentication/users
2. Busca el usuario por email
3. Haz clic en los tres puntos (⋯) → "Edit user"
4. En "Custom claims", agrega:
   ```json
   {
     "admin": true
   }
   ```
5. Guarda

### Paso 2: El Usuario Debe Reiniciar Sesión

**IMPORTANTE**: Después de establecer el custom claim, el usuario debe:
1. Cerrar sesión completamente
2. Iniciar sesión de nuevo
3. El token incluirá el claim `admin: true`

### Paso 3: Verificar que Funciona

1. Inicia sesión con el usuario admin
2. Ve a: `/admin/libros`
3. Deberías ver la lista de libros desde Firestore
4. Puedes crear, editar y eliminar libros

## 🔧 Funcionalidades Implementadas

### ✅ Lista de Libros (`/admin/libros`)
- Ver todos los libros desde Firestore
- Buscar por título o autor
- Filtrar por: todos, gratuitos, de pago, destacados, activos, inactivos
- Editar libro
- Eliminar libro
- Activar/desactivar libro

### ✅ Crear Libro (`/admin/libros/crear`)
- Formulario completo para crear libros
- Validación de campos requeridos
- Guarda directamente en Firestore
- Asigna `createdBy` con el UID del admin

### ✅ Editar Libro (`/admin/libros/editar/[id]`)
- Cargar datos del libro desde Firestore
- Actualizar información
- Guardar cambios en Firestore

## 🔒 Seguridad

### Reglas de Firestore

Las reglas actuales requieren que el usuario tenga `request.auth.token.admin == true` para:
- Crear libros
- Actualizar libros
- Eliminar libros (soft delete: `isActive: false`)

### Protección de Rutas

Las páginas de admin verifican:
1. Que el usuario esté autenticado
2. Que tenga el custom claim `admin: true`
3. Si no cumple, redirige a la página principal

## 📝 Notas

- El custom claim se establece en Firebase Auth, no en Firestore
- Los cambios en custom claims requieren que el usuario reinicie sesión
- Solo usuarios con `admin: true` pueden acceder a `/admin/*`
- Las operaciones de admin están protegidas por las reglas de Firestore

## 🐛 Troubleshooting

### "No tienes permisos para acceder"
- Verifica que el custom claim esté establecido: `admin: true`
- El usuario debe cerrar sesión y volver a iniciar sesión
- Verifica en la consola del navegador (F12) el token del usuario

### "Permission denied" al crear/editar/eliminar
- Verifica que las reglas de Firestore estén desplegadas
- Verifica que el usuario tenga el custom claim `admin: true`
- Verifica que el usuario esté autenticado

### El script no encuentra el usuario
- Verifica que el email sea correcto
- Verifica que el usuario exista en Firebase Authentication
- Verifica que el archivo `firebase-admin-key.json` exista

