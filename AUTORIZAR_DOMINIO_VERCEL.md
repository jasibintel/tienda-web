# 🔧 Autorizar Dominio de Vercel en Firebase

## ⚠️ Problema Identificado

El dominio `deglorialibros.com` está autorizado en Firebase, pero el sitio está desplegado en Vercel con un dominio diferente (`*.vercel.app`). Esto causa que las queries de Firestore desde el cliente fallen con timeout.

## ✅ Solución: Agregar Dominio de Vercel

### Paso 1: Ir a Firebase Console

1. Ve a: https://console.firebase.google.com/project/tufecrecelibros/settings/general
2. Desplázate hasta la sección **"Authorized domains"**

### Paso 2: Agregar Dominio de Vercel

1. Haz clic en **"Add domain"**
2. Agrega: `*.vercel.app`
   - Esto autorizará todos los subdominios de Vercel
   - Incluye: `tienda-xxxxx-jasibnos-projects.vercel.app`
3. Haz clic en **"Add"**
4. Espera a que se guarde

### Paso 3: Verificar Dominios Autorizados

Deberías ver en la lista:
- `localhost` (para desarrollo local)
- `deglorialibros.com` (tu dominio personalizado)
- `*.vercel.app` (nuevo - para Vercel)

### Paso 4: Redesplegar

Después de agregar el dominio, no es necesario redesplegar, pero puedes hacerlo para asegurarte:

```bash
vercel --prod
```

## 🔍 Verificar que Funciona

1. Abre tu sitio en Vercel: https://tienda-35039wic2-jasibnos-projects.vercel.app/libreria
2. Abre la consola del navegador (F12)
3. Deberías ver:
   - "✅ getAllBooks: Query completada" (sin timeout)
   - "📊 getAllBooks: Total de documentos en colección: 21"
   - Los libros cargando correctamente

## 📝 Nota

Si más adelante conectas tu dominio personalizado (`deglorialibros.com`) a Vercel, ese dominio ya estará autorizado y funcionará automáticamente.

