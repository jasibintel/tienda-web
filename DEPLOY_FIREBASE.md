# 🚀 Guía de Despliegue en Firebase Hosting

## 📋 Configuración Actual

- **Proyecto Firebase**: `tufecrecelibros`
- **Sitio de Hosting**: `tufecrecelibros`
- **URL por defecto**: `https://tufecrecelibros.web.app`
- **Dominio personalizado**: Por configurar

## 🔧 Configuración Preparada

### 1. Next.js Configurado
- ✅ `output: 'standalone'` para producción
- ✅ Build optimizado para Firebase

### 2. Firebase Hosting Configurado
- ✅ `firebase.json` configurado
- ✅ Rewrites para SPA
- ✅ Headers de caché optimizados

## 🚀 Pasos para Desplegar

### Opción 1: Despliegue Completo (Recomendado)

```bash
# Construir y desplegar todo (hosting + reglas)
npm run deploy:all
```

### Opción 2: Solo Hosting

```bash
# Construir el proyecto
npm run build:firebase

# Desplegar solo hosting
npm run firebase:deploy:hosting
```

### Opción 3: Despliegue Manual

```bash
# 1. Construir el proyecto
npm run build

# 2. Exportar para producción (si usas export estático)
# npm run export

# 3. Desplegar
firebase deploy --only hosting
```

## 🌐 Configurar Dominio Personalizado

### Paso 1: Agregar Dominio en Firebase Console

1. Ve a [Firebase Console - Hosting](https://console.firebase.google.com/project/tufecrecelibros/hosting)
2. Haz clic en "Agregar dominio personalizado"
3. Ingresa tu dominio (ej: `deglorialibros.com`)
4. Sigue las instrucciones para verificar el dominio

### Paso 2: Configurar DNS

Firebase te dará registros DNS que debes agregar en tu proveedor de dominio:

**Tipo A:**
```
@ -> 151.101.1.195
@ -> 151.101.65.195
```

**Tipo CNAME:**
```
www -> tufecrecelibros.web.app
```

### Paso 3: Verificar Dominio

1. Espera a que los DNS se propaguen (puede tardar hasta 48 horas, normalmente 1-2 horas)
2. Firebase verificará automáticamente el dominio
3. Una vez verificado, se activará el SSL automáticamente

### Paso 4: Configurar Dominio desde CLI (Opcional)

```bash
# Ver dominios configurados
firebase hosting:sites:list

# Agregar dominio (si es necesario)
firebase hosting:channel:deploy production --only hosting
```

## 📝 Variables de Entorno en Producción

Para producción, necesitas configurar las variables de entorno en Firebase:

### Opción 1: Firebase Functions (si usas server-side)
```bash
firebase functions:config:set firebase.api_key="tu_api_key"
```

### Opción 2: Variables en Build Time
Las variables `NEXT_PUBLIC_*` se incluyen en el build, así que están listas.

### Opción 3: Firebase Hosting Environment Variables
En Firebase Console → Hosting → Configuración → Variables de entorno

## 🔍 Verificar Despliegue

### Verificar que el sitio está activo:
```bash
# Ver estado del sitio
firebase hosting:sites:get tufecrecelibros

# Ver canales de despliegue
firebase hosting:channel:list
```

### URLs de Acceso:
- **Firebase URL**: `https://tufecrecelibros.web.app`
- **Dominio personalizado**: `https://tu-dominio.com` (después de configurar)

## 🛠️ Comandos Útiles

### Ver logs de despliegue
```bash
firebase hosting:channel:list
```

### Revertir a versión anterior
```bash
firebase hosting:rollback
```

### Ver historial de despliegues
En Firebase Console → Hosting → Historial

## ⚠️ Notas Importantes

1. **Build Time**: El build puede tardar varios minutos
2. **Cache**: Los cambios pueden tardar unos minutos en aparecer
3. **SSL**: Se activa automáticamente después de verificar el dominio
4. **Variables de Entorno**: Las variables `NEXT_PUBLIC_*` se incluyen en el build

## 🔄 Flujo de Despliegue Recomendado

1. **Desarrollo Local**:
   ```bash
   npm run dev
   ```

2. **Probar Build**:
   ```bash
   npm run build
   npm run start
   ```

3. **Desplegar a Producción**:
   ```bash
   npm run deploy:all
   ```

4. **Verificar**:
   - Revisar `https://tufecrecelibros.web.app`
   - Revisar dominio personalizado (si está configurado)

## 📞 Troubleshooting

### Error: "Build failed"
- Verifica que todas las dependencias estén instaladas: `npm install`
- Revisa errores de TypeScript: `npm run build`

### Error: "Deploy failed"
- Verifica que estés autenticado: `firebase login`
- Verifica que el proyecto esté seleccionado: `firebase use tufecrecelibros`

### El sitio no carga
- Espera unos minutos para que se propague
- Verifica los logs en Firebase Console
- Revisa la configuración de rewrites en `firebase.json`

## 🎯 Próximos Pasos

1. ✅ Ejecutar `npm run deploy:all` para desplegar
2. ⏳ Configurar dominio personalizado en Firebase Console
3. ⏳ Agregar registros DNS en tu proveedor de dominio
4. ⏳ Esperar verificación y activación de SSL

