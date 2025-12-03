# 🧪 Cómo Probar el Servidor

## ✅ Correcciones Aplicadas

He corregido los problemas que podían causar que el servidor se congele:

1. **Firebase Client**: Ahora solo se inicializa correctamente en el cliente
2. **Firebase Admin**: Maneja errores si las credenciales no están disponibles
3. **Analytics**: Solo se inicializa en el navegador

## 🚀 Iniciar el Servidor

```bash
npm run dev
```

El servidor debería iniciar sin problemas en `http://localhost:3000`

## 🔍 Verificar que Funciona

1. **Abre tu navegador** en `http://localhost:3000`
2. **Revisa la consola del navegador** (F12) para ver si hay errores
3. **Verifica que la página carga** correctamente

## ⚠️ Si Aún se Congela

### Opción 1: Verificar Variables de Entorno
```bash
# Verificar que .env.local existe y tiene las variables
cat .env.local | grep NEXT_PUBLIC_FIREBASE
```

### Opción 2: Limpiar y Reconstruir
```bash
# Detener todos los procesos
pkill -f "next dev"

# Limpiar caché
rm -rf .next

# Reinstalar dependencias (si es necesario)
npm install

# Iniciar de nuevo
npm run dev
```

### Opción 3: Verificar Puertos
```bash
# Ver qué está usando el puerto 3000
lsof -i :3000

# Si hay algo, detenerlo
kill -9 <PID>
```

## 📝 Notas

- El servidor puede tardar unos segundos en compilar la primera vez
- Si Firebase Admin no tiene credenciales, mostrará un warning pero no bloqueará
- El cliente de Firebase funcionará normalmente incluso sin Admin SDK

## ✅ Estado Esperado

Cuando el servidor funciona correctamente deberías ver:
```
▲ Next.js 16.0.6 (Turbopack)
- Local:        http://localhost:3000
✓ Ready in X seconds
```

