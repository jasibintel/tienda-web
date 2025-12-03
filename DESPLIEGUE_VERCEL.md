# 🚀 Despliegue en Vercel

## ✅ Vercel CLI Instalado

Vercel CLI está instalado y listo para usar.

## 🔐 Paso 1: Autenticarte con Vercel

Ejecuta en tu terminal:

```bash
vercel login
```

Sigue las instrucciones:
1. Se abrirá tu navegador
2. Inicia sesión con tu cuenta de Vercel (o créala si no tienes)
3. Autoriza la aplicación

## 📦 Paso 2: Conectar y Desplegar el Proyecto

Una vez autenticado, ejecuta:

```bash
vercel
```

Sigue las instrucciones:
1. **¿Set up and deploy?** → `Y` (Sí)
2. **Which scope?** → Selecciona tu cuenta/organización
3. **Link to existing project?** → `N` (No, crear nuevo)
4. **What's your project's name?** → `tienda-web` (o el que prefieras)
5. **In which directory is your code located?** → `./` (directorio actual)
6. **Want to override the settings?** → `N` (No, usar configuración automática)

Vercel detectará automáticamente que es un proyecto Next.js y lo configurará.

## 🔑 Paso 3: Configurar Variables de Entorno

Después del primer despliegue, configura las variables de entorno:

### Opción A: Desde la Web (Recomendado)

1. Ve a: https://vercel.com/dashboard
2. Selecciona tu proyecto `tienda-web`
3. Ve a **Settings** → **Environment Variables**
4. Agrega todas las variables de `.env.local`:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

### Opción B: Desde CLI

```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
# Pega el valor cuando te lo pida
# Repite para cada variable
```

## 🌐 Paso 4: Conectar tu Dominio

Si ya tienes un dominio configurado en Firebase:

1. Ve a: https://vercel.com/dashboard → Tu proyecto → **Settings** → **Domains**
2. Haz clic en **Add Domain**
3. Ingresa tu dominio (ej: `deglorialibros.com`)
4. Vercel te dará instrucciones para actualizar los DNS
5. Actualiza los registros DNS en tu proveedor de dominio
6. Espera la verificación (1-2 horas normalmente)
7. SSL se activará automáticamente

## 🔄 Paso 5: Redesplegar

Después de agregar las variables de entorno:

```bash
vercel --prod
```

O simplemente haz un push a GitHub (si conectaste el repo) y Vercel desplegará automáticamente.

## 📋 Comandos Útiles

```bash
# Ver información del proyecto
vercel inspect

# Ver logs
vercel logs

# Abrir dashboard
vercel dashboard

# Desplegar a producción
vercel --prod

# Desplegar preview
vercel
```

## 🔗 Conectar con GitHub (Opcional)

Para despliegues automáticos:

1. En Vercel Dashboard → **Settings** → **Git**
2. Conecta tu repositorio de GitHub
3. Cada push a `main` desplegará automáticamente

## ✅ Ventajas de Vercel

- ✅ **SSL automático** para tu dominio
- ✅ **Optimización automática** de Next.js
- ✅ **Preview deployments** para cada PR
- ✅ **Variables de entorno** fáciles de gestionar
- ✅ **Analytics** integrado
- ✅ **Edge Functions** si las necesitas

## 🎯 Próximos Pasos

1. Ejecuta `vercel login`
2. Ejecuta `vercel` para desplegar
3. Configura las variables de entorno
4. Conecta tu dominio
5. ¡Listo! Tu sitio estará en vivo

## 📝 Notas

- El archivo `vercel.json` ya está creado con la configuración básica
- Las variables de entorno deben configurarse en Vercel (no uses `.env.local` en producción)
- Vercel detecta automáticamente Next.js y lo optimiza

