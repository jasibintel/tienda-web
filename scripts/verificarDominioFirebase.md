# 🔍 Verificar Dominio en Firebase

## Problema: Libros cargan en local pero no en producción

Si los libros cargan en local pero no en producción (Vercel), puede ser que el dominio de Vercel no esté autorizado en Firebase.

## ✅ Solución: Autorizar Dominio en Firebase

1. Ve a Firebase Console:
   https://console.firebase.google.com/project/tufecrecelibros/settings/general

2. Desplázate hasta la sección **"Authorized domains"**

3. Haz clic en **"Add domain"**

4. Agrega el dominio de Vercel:
   - `*.vercel.app` (para todos los subdominios de Vercel)
   - O el dominio específico de tu deployment

5. Guarda los cambios

## 🔍 Verificar Variables de Entorno en Vercel

1. Ve a: https://vercel.com/jasibnos-projects/tienda-web/settings/environment-variables

2. Verifica que TODAS estas variables estén configuradas para **Production**:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

3. Si alguna falta, agrégalas y **redespliega** el proyecto

## 🔄 Redesplegar Después de Cambios

Después de agregar variables o autorizar dominios:

```bash
vercel --prod
```

## 🐛 Debug en Producción

1. Abre tu sitio en producción
2. Abre la consola del navegador (F12)
3. Busca mensajes que empiecen con:
   - ❌ = Error
   - ⚠️ = Advertencia
   - 🔄 = Proceso en curso

4. Si ves "Missing variables", las variables de entorno no están configuradas correctamente
5. Si ves "Permission denied", el dominio no está autorizado o las reglas de Firestore están bloqueando

