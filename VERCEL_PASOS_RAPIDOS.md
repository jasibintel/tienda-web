# ⚡ Pasos Rápidos para Conectar con Vercel

## ✅ Lo que YA está listo:
- ✅ Vercel CLI instalado
- ✅ Proyecto configurado
- ✅ `vercel.json` creado
- ✅ Next.js optimizado para Vercel

## 🔐 Solo falta: Autenticarte

Ejecuta este comando en tu terminal:

```bash
vercel login
```

**Qué pasará:**
1. Se abrirá tu navegador automáticamente
2. Inicia sesión con tu cuenta de Vercel (o créala si no tienes - es gratis)
3. Autoriza la aplicación
4. ¡Listo! Ya estarás autenticado

## 🚀 Después de autenticarte

Ejecuta:

```bash
vercel
```

Sigue las instrucciones (presiona Enter para aceptar los valores por defecto):
- ¿Set up and deploy? → **Y** (Sí)
- ¿Link to existing project? → **N** (No)
- ¿What's your project's name? → **tienda-web** (o Enter para aceptar)
- ¿In which directory? → **./** (Enter)
- ¿Override settings? → **N** (No)

## 🔑 Configurar Variables de Entorno

Después del despliegue, ve a:
https://vercel.com/dashboard → Tu proyecto → Settings → Environment Variables

Agrega estas variables (cópialas de tu `.env.local`):
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

Luego redespiega:
```bash
vercel --prod
```

## 🌐 Conectar tu Dominio

1. Ve a Vercel Dashboard → Tu proyecto → Settings → Domains
2. Agrega tu dominio
3. Sigue las instrucciones para actualizar DNS
4. ¡Listo!

## 📝 Resumen de Comandos

```bash
# 1. Autenticarte
vercel login

# 2. Desplegar
vercel

# 3. Desplegar a producción (después de configurar variables)
vercel --prod
```

¡Es muy simple! Solo necesitas autenticarte primero.

