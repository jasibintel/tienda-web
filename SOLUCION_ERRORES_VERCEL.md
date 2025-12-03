# 🔧 Solución a los Errores de Vercel

## ✅ Lo que ya está hecho:
- ✅ Proyecto subido a GitHub: https://github.com/jasibintel/tienda-web
- ✅ Autenticado con Vercel
- ✅ Proyecto creado en Vercel
- ✅ `vercel.json` corregido (sin referencias a secrets)

## ❌ Errores encontrados:

### Error 1: Variables de entorno faltantes
```
Error: Environment Variable "NEXT_PUBLIC_FIREBASE_API_KEY" references Secret "firebase_api_key", which does not exist.
```

**Solución:** Ya corregido el `vercel.json`. Ahora necesitas agregar las variables.

### Error 2: No se pudo conectar GitHub
```
Error: Failed to connect jasibintel/tienda-web to project
```

**Solución:** Conectar manualmente desde el dashboard.

## 🚀 Pasos para Completar:

### Paso 1: Agregar Variables de Entorno

**Opción A: Desde el Dashboard (Más fácil)**

1. Ve a: https://vercel.com/jasibnos-projects/tienda-web/settings/environment-variables
2. Agrega estas 7 variables (una por una):

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyDLcUAeVdCeu3Wa_aIZ9as9pyTks5h2wik` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `tufecrecelibros.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `tufecrecelibros` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `tufecrecelibros.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `144930929084` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:144930929084:web:84c2fc0421b3375f23d3b9` |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | `G-HVFT74SC2T` |

Para cada variable:
- Haz clic en "Add New"
- Ingresa el nombre
- Ingresa el valor
- Selecciona: ✅ Production, ✅ Preview, ✅ Development
- Guarda

**Opción B: Desde CLI (Interactivo)**

Ejecuta cada comando y pega el valor cuando te lo pida:

```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production preview development
# Valor: AIzaSyDLcUAeVdCeu3Wa_aIZ9as9pyTks5h2wik

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

### Paso 2: Conectar Repositorio de GitHub

1. Ve a: https://vercel.com/jasibnos-projects/tienda-web/settings/git
2. Haz clic en "Connect Git Repository"
3. Selecciona "GitHub"
4. Si te pide autorizar, hazlo
5. Selecciona: `jasibintel/tienda-web`
6. Conecta

### Paso 3: Desplegar

Una vez que agregues las variables de entorno:

```bash
# Desplegar a producción
vercel --prod
```

O simplemente haz un push a GitHub y Vercel desplegará automáticamente:

```bash
git push
```

## ✅ Verificar

Después del despliegue:
1. Ve a tu dashboard: https://vercel.com/jasibnos-projects/tienda-web
2. Verás la URL de tu sitio (algo como: `tienda-web-xxx.vercel.app`)
3. Haz clic para ver tu sitio en vivo

## 📝 Notas

- El error de conexión de GitHub no es crítico, puedes conectarlo después
- Las variables de entorno son **obligatorias** para que Firebase funcione
- Una vez conectado GitHub, cada push desplegará automáticamente

