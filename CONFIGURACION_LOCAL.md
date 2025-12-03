# 🔧 Configuración Local

## ✅ Problema Resuelto

El archivo `.env.local` ahora tiene todas las variables de Firebase necesarias para desarrollo local.

## 🚀 Cómo Probar Localmente

### 1. Verificar Configuración

```bash
node scripts/testLocalFirebase.js
```

Este comando verifica que todas las variables de entorno estén configuradas.

### 2. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

### 3. Abrir en el Navegador

1. Ve a: http://localhost:3000/libreria
2. Abre la consola del navegador (F12)
3. Busca los mensajes de depuración:
   - 🔄 = Query iniciando
   - ✅ = Query exitosa
   - ❌ = Error (copia el mensaje)

## 📋 Variables Configuradas

Todas estas variables están en `.env.local`:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

## ⚠️ Importante

1. **Reiniciar el servidor**: Si cambias `.env.local`, debes reiniciar `npm run dev`
2. **No commitear**: El archivo `.env.local` está en `.gitignore` y no se sube a GitHub
3. **Variables públicas**: Estas variables son públicas (NEXT_PUBLIC_*) y se incluyen en el bundle del cliente

## 🔍 Si No Funciona

1. **Verifica que el servidor esté reiniciado** después de cambiar `.env.local`
2. **Abre la consola del navegador** (F12) y busca errores
3. **Verifica las reglas de Firestore**:
   ```bash
   firebase deploy --only firestore:rules
   ```
4. **Prueba la conexión desde el servidor**:
   ```bash
   node scripts/testFirestoreConnection.js
   ```

## 📝 Scripts Disponibles

- `node scripts/testLocalFirebase.js` - Verificar variables de entorno
- `node scripts/testFirestoreConnection.js` - Probar conexión con Firestore
- `node scripts/setupLocalEnv.js` - Reconfigurar .env.local si es necesario

