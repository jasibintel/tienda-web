# 🔧 Configurar Variables de Entorno en Vercel

## ⚠️ Problema Actual

Vercel está intentando usar "Secrets" que no existen. Necesitas agregar las variables de entorno manualmente.

## ✅ Solución: Agregar Variables de Entorno

### Opción 1: Desde el Dashboard (Recomendado)

1. Ve a: https://vercel.com/jasibnos-projects/tienda-web/settings/environment-variables

2. Agrega cada una de estas variables (cópialas de tu `.env.local`):

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDLcUAeVdCeu3Wa_aIZ9as9pyTks5h2wik
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tufecrecelibros.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tufecrecelibros
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tufecrecelibros.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=144930929084
NEXT_PUBLIC_FIREBASE_APP_ID=1:144930929084:web:84c2fc0421b3375f23d3b9
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-HVFT74SC2T
```

3. Para cada variable:
   - Haz clic en "Add New"
   - Ingresa el nombre de la variable
   - Ingresa el valor
   - Selecciona los ambientes: **Production**, **Preview**, y **Development**
   - Guarda

### Opción 2: Desde CLI

```bash
# Agregar cada variable
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production preview development
# Pega el valor cuando te lo pida: AIzaSyDLcUAeVdCeu3Wa_aIZ9as9pyTks5h2wik

vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production preview development
# Valor: tufecrecelibros.firebaseapp.com

vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production preview development
# Valor: tufecrecelibros

vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production preview development
# Valor: tufecrecelibros.firebasestorage.app

vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production preview development
# Valor: 144930929084

vercel env add NEXT_PUBLIC_FIREBASE_APP_ID production preview development
# Valor: 1:144930929084:web:84c2fc0421b3375f23d3b9

vercel env add NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID production preview development
# Valor: G-HVFT74SC2T
```

## 🔗 Conectar Repositorio de GitHub

El error de conexión puede ser porque Vercel necesita permisos. Hazlo manualmente:

1. Ve a: https://vercel.com/jasibnos-projects/tienda-web/settings/git
2. Haz clic en "Connect Git Repository"
3. Selecciona "GitHub"
4. Autoriza Vercel si es necesario
5. Selecciona el repositorio: `jasibintel/tienda-web`
6. Conecta

## 🚀 Después de Configurar

Una vez que agregues las variables de entorno:

```bash
# Redesplegar
vercel --prod
```

O simplemente haz un push a GitHub y Vercel desplegará automáticamente:

```bash
git push
```

## ✅ Verificar

Después del despliegue, verifica que todo funcione:
- Ve a tu URL de Vercel (algo como: `tienda-web-xxx.vercel.app`)
- Verifica que la aplicación cargue correctamente
- Revisa los logs si hay errores: `vercel logs`

