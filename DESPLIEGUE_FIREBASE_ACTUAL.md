# 🚀 Desplegar Nuevo Proyecto en Firebase Hosting

## 📋 Situación Actual

- ✅ Firebase Hosting ya está configurado
- ✅ Dominio personalizado ya está conectado
- ⚠️ Hay una página provisional desplegada
- 🎯 Necesitamos desplegar el nuevo proyecto Next.js

## ⚠️ Limitación de Next.js con Firebase Hosting

Next.js 16 con App Router y rutas dinámicas **no es completamente compatible** con hosting estático puro. Sin embargo, podemos usar una solución práctica.

## ✅ Solución Recomendada: Usar Vercel (Más Fácil)

**Vercel** es la plataforma oficial de Next.js y la más simple:

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Desplegar
vercel

# 3. Conectar tu dominio existente
vercel domains add tu-dominio.com
```

Vercel puede usar el mismo dominio que tienes en Firebase, solo necesitas cambiar los DNS.

## 🔄 Alternativa: Mantener Firebase Hosting

Si prefieres mantener Firebase Hosting, tenemos dos opciones:

### Opción 1: Firebase Functions + Next.js (Recomendado)

Requiere configurar Firebase Functions para servir Next.js:

```bash
# 1. Inicializar Functions
firebase init functions

# 2. Configurar Next.js en Functions
# (Requiere código adicional)
```

### Opción 2: Build Híbrido (Funcional pero limitado)

Para desplegar ahora mismo con lo que tenemos:

```bash
# 1. Construir el proyecto
npm run build

# 2. El build genera archivos en .next
# Necesitarías configurar Firebase Functions o usar otra estrategia
```

## 🌐 Configurar Dominio

Tu dominio ya está configurado en Firebase. Para verificar:

1. Ve a [Firebase Console - Hosting](https://console.firebase.google.com/project/tufecrecelibros/hosting)
2. Verás tu dominio personalizado listado
3. Los DNS ya deberían estar configurados

## 💡 Recomendación Inmediata

Para desplegar **rápidamente** y reemplazar la página provisional:

### Usar Vercel (5 minutos):

```bash
npm i -g vercel
vercel
# Sigue las instrucciones
# Conecta tu dominio cuando te lo pida
```

### O mantener Firebase pero con Functions (más complejo):

Requiere configurar Firebase Functions para servir Next.js correctamente.

## 🎯 ¿Qué prefieres?

1. **Vercel** - Rápido, fácil, optimizado para Next.js
2. **Firebase Functions** - Mantener todo en Firebase, pero requiere más configuración

¿Cuál prefieres? Puedo ayudarte con cualquiera de las dos opciones.

