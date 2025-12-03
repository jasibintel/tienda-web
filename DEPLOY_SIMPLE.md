# 🚀 Despliegue Simple en Firebase Hosting

## ⚠️ Nota Importante

Next.js 16 con App Router no es completamente compatible con Firebase Hosting estático debido a las rutas dinámicas y client components.

## ✅ Solución Recomendada: Usar Vercel

Para Next.js, **Vercel** es la plataforma recomendada y más fácil:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Conectar dominio
vercel domains add tu-dominio.com
```

## 🔄 Alternativa: Firebase Hosting con Configuración Manual

Si prefieres usar Firebase Hosting, puedes:

### Opción 1: Usar Firebase Functions (Recomendado para Next.js)

1. Instalar Firebase Functions:
```bash
firebase init functions
```

2. Configurar Next.js en Functions (requiere configuración adicional)

### Opción 2: Build Manual y Copiar Archivos

```bash
# 1. Build del proyecto
npm run build

# 2. Crear directorio out manualmente
mkdir -p out

# 3. Copiar archivos necesarios
cp -r .next/static out/_next/static
cp -r public out/

# 4. Crear index.html que cargue la app
# (Esto requiere configuración adicional)

# 5. Desplegar
firebase deploy --only hosting
```

## 🌐 Configurar Dominio en Firebase

Una vez desplegado, puedes configurar tu dominio:

1. Ve a [Firebase Console - Hosting](https://console.firebase.google.com/project/tufecrecelibros/hosting)
2. Haz clic en "Agregar dominio personalizado"
3. Ingresa tu dominio
4. Sigue las instrucciones para agregar los registros DNS

## 💡 Recomendación

Para Next.js, **Vercel** es la mejor opción porque:
- ✅ Configuración automática
- ✅ Optimización automática
- ✅ SSL automático
- ✅ Deploy previews
- ✅ Integración perfecta con Next.js

¿Quieres que te ayude a configurar Vercel en su lugar?

