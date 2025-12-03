# 🔐 Configurar Google Sign-In en Firebase

## 📋 Pasos para Habilitar Google como Proveedor de Autenticación

### Paso 1: Ir a Firebase Console

1. Ve a: https://console.firebase.google.com/project/tufecrecelibros/authentication/providers
2. O navega: **Firebase Console** → **Authentication** → **Sign-in method**

### Paso 2: Habilitar Google

1. En la lista de proveedores, busca **"Google"**
2. Haz clic en **"Google"**
3. Activa el toggle **"Enable"**
4. Ingresa el **Email de soporte del proyecto** (puede ser tu email)
5. Haz clic en **"Save"**

### Paso 3: Configurar OAuth Consent Screen (Si es necesario)

Si es la primera vez que usas Google Sign-In, Google puede pedirte configurar la pantalla de consentimiento:

1. Ve a: https://console.cloud.google.com/apis/credentials/consent
2. Selecciona tu proyecto: **tufecrecelibros**
3. Completa la información:
   - **Tipo de usuario**: Externo (si quieres que cualquiera pueda registrarse)
   - **Nombre de la app**: "De Gloria en Gloria"
   - **Email de soporte**: Tu email
   - **Dominio autorizado**: `tufecrecelibros.firebaseapp.com` y tu dominio personalizado si lo tienes
4. Guarda y continúa

### Paso 4: Verificar Dominios Autorizados

1. En Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. Asegúrate de que estos dominios estén listados:
   - `localhost` (para desarrollo)
   - `tufecrecelibros.firebaseapp.com`
   - `tufecrecelibros.web.app`
   - Tu dominio personalizado (si lo tienes)
   - Tu dominio de Vercel (si usas Vercel)

### Paso 5: Agregar Dominio de Vercel (Si usas Vercel)

Si tu sitio está en Vercel, necesitas agregar el dominio:

1. Ve a: **Authentication** → **Settings** → **Authorized domains**
2. Haz clic en **"Add domain"**
3. Ingresa tu dominio de Vercel (ej: `tienda-web-xxx.vercel.app`)
4. Guarda

## ✅ Verificación

Una vez configurado:

1. Ve a tu sitio
2. Haz clic en "Iniciar sesión" o "Registrarse"
3. Haz clic en "Continuar con Google"
4. Deberías ver la ventana de Google para seleccionar tu cuenta
5. Después de autorizar, deberías estar autenticado

## 🔧 Solución de Problemas

### Error: "popup_closed_by_user"
- El usuario cerró la ventana de Google. No es un error, simplemente reintenta.

### Error: "auth/unauthorized-domain"
- El dominio no está autorizado. Agrega el dominio en **Authorized domains**.

### Error: "auth/operation-not-allowed"
- Google Sign-In no está habilitado. Ve a Firebase Console y habilítalo.

### Error: "auth/configuration-not-found"
- La configuración de Google no está completa. Verifica que hayas guardado los cambios.

## 📝 Notas Importantes

- **No necesitas crear credenciales OAuth manualmente** - Firebase lo hace automáticamente
- **El email de soporte** puede ser cualquier email válido
- **Los dominios autorizados** deben incluir todos los dominios donde se usará la autenticación
- **Para producción**, asegúrate de tener tu dominio personalizado en la lista

## 🎯 Estado Actual del Código

El código ya está listo:
- ✅ `AuthContext` tiene `loginWithGoogle()` implementado
- ✅ Página de login tiene botón de Google
- ✅ Página de registro tiene botón de Google
- ✅ Manejo de errores implementado
- ✅ Redirección después del login implementada

**Solo falta habilitar Google en Firebase Console** (pasos arriba).

## 🚀 Después de Configurar

Una vez que habilites Google en Firebase Console, el botón de Google funcionará inmediatamente. No necesitas cambiar nada en el código.

