# 🔑 Agregar Variables de Entorno - Modo Interactivo

El CLI de Vercel requiere interacción. Ejecuta estos comandos **uno por uno** y pega el valor cuando te lo pida:

## 📝 Comandos a Ejecutar:

### 1. API Key
```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
```
Cuando te pregunte:
- **Environment:** Selecciona `production`, luego `preview`, luego `development` (puedes seleccionar múltiples con espacio)
- **Value:** Pega: `AIzaSyDLcUAeVdCeu3Wa_aIZ9as9pyTks5h2wik`

### 2. Auth Domain
```bash
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
```
- **Environment:** `production preview development`
- **Value:** `tufecrecelibros.firebaseapp.com`

### 3. Project ID
```bash
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
```
- **Environment:** `production preview development`
- **Value:** `tufecrecelibros`

### 4. Storage Bucket
```bash
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
```
- **Environment:** `production preview development`
- **Value:** `tufecrecelibros.firebasestorage.app`

### 5. Messaging Sender ID
```bash
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
```
- **Environment:** `production preview development`
- **Value:** `144930929084`

### 6. App ID
```bash
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
```
- **Environment:** `production preview development`
- **Value:** `1:144930929084:web:84c2fc0421b3375f23d3b9`

### 7. Measurement ID
```bash
vercel env add NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```
- **Environment:** `production preview development`
- **Value:** `G-HVFT74SC2T`

## ✅ Verificar

Después de agregar todas:
```bash
vercel env ls
```

## 🚀 Desplegar

Una vez agregadas todas las variables:
```bash
vercel --prod
```

