# Cómo Obtener las Credenciales de Firebase Admin SDK

Para completar la configuración de Firebase, necesitas obtener las credenciales del Service Account para el Admin SDK (server-side).

## 📋 Pasos para Obtener las Credenciales

### Paso 1: Acceder a Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona el proyecto: **tufecrecelibros**

### Paso 2: Ir a Service Accounts
1. Haz clic en el ícono de configuración (⚙️) en la parte superior izquierda
2. Selecciona **"Project settings"** (Configuración del proyecto)
3. Ve a la pestaña **"Service accounts"** (Cuentas de servicio)

### Paso 3: Generar Nueva Clave Privada
1. En la sección "Firebase Admin SDK", verás un código de ejemplo
2. Haz clic en el botón **"Generate new private key"** (Generar nueva clave privada)
3. Se abrirá un diálogo de confirmación
4. Haz clic en **"Generate key"** (Generar clave)
5. Se descargará automáticamente un archivo JSON (ej: `tufecrecelibros-firebase-adminsdk-xxxxx.json`)

### Paso 4: Extraer los Valores del JSON
Abre el archivo JSON descargado. Debería verse así:

```json
{
  "type": "service_account",
  "project_id": "tufecrecelibros",
  "private_key_id": "xxxxx",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@tufecrecelibros.iam.gserviceaccount.com",
  "client_id": "xxxxx",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40tufecrecelibros.iam.gserviceaccount.com"
}
```

### Paso 5: Actualizar .env.local
Abre el archivo `.env.local` en la raíz del proyecto y actualiza estas líneas:

```bash
FIREBASE_PROJECT_ID=tufecrecelibros
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@tufecrecelibros.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_CLAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=tufecrecelibros.firebasestorage.app
```

**Reemplaza:**
- `FIREBASE_CLIENT_EMAIL` con el valor de `client_email` del JSON
- `FIREBASE_PRIVATE_KEY` con el valor de `private_key` del JSON (mantén las comillas y los `\n`)

### ⚠️ Importante
- **NUNCA** subas el archivo JSON a Git
- **NUNCA** compartas estas credenciales públicamente
- El archivo `.env.local` ya está en `.gitignore`, así que está protegido

### Paso 6: Verificar la Configuración
Después de actualizar `.env.local`, reinicia el servidor de desarrollo:

```bash
npm run dev
```

Si todo está correcto, no deberías ver errores relacionados con Firebase en la consola.

## 🔍 Verificación Rápida

Para verificar que las credenciales están correctas, puedes crear un script de prueba temporal:

```typescript
// test-firebase-admin.ts (temporal, luego elimínalo)
import { adminDb } from './lib/firebase/admin';

async function testConnection() {
  try {
    const testDoc = await adminDb.collection('_test').limit(1).get();
    console.log('✅ Firebase Admin SDK conectado correctamente');
  } catch (error) {
    console.error('❌ Error al conectar con Firebase Admin SDK:', error);
  }
}

testConnection();
```

## 📞 ¿Necesitas Ayuda?

Si tienes problemas:
1. Verifica que el archivo `.env.local` existe en la raíz del proyecto
2. Asegúrate de que las variables no tengan espacios extra
3. Verifica que `FIREBASE_PRIVATE_KEY` tenga las comillas y los `\n` correctamente
4. Reinicia el servidor después de hacer cambios

