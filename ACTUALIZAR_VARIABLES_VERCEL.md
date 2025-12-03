# 🔧 Actualizar Variables de Entorno en Vercel

## ✅ Estado Actual

Todas las variables de entorno están configuradas en Vercel, pero para asegurarnos de que tengan los valores correctos, puedes verificarlas y actualizarlas desde el Dashboard.

## 📋 Valores Correctos

Estos son los valores que deben tener las variables (desde `firebase_options.dart`):

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyDLcUAeVdCeu3Wa_aIZ9as9pyTks5h2wik` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `tufecrecelibros.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `tufecrecelibros` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `tufecrecelibros.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `144930929084` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:144930929084:web:84c2fc0421b3375f23d3b9` |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | `G-HVFT74SC2T` |

## 🔧 Pasos para Actualizar desde el Dashboard

### 1. Ir a Variables de Entorno

Ve a: https://vercel.com/jasibnos-projects/tienda-web/settings/environment-variables

### 2. Para cada variable:

1. **Busca la variable** en la lista
2. **Haz clic en los tres puntos** (⋯) a la derecha
3. **Selecciona "Edit"** o "Delete" si quieres recrearla
4. **Si editas:**
   - Verifica que el valor sea correcto (comparar con la tabla arriba)
   - Asegúrate de que esté marcada para: ✅ Production, ✅ Preview, ✅ Development
   - Guarda
5. **Si eliminas y recreas:**
   - Elimina la variable
   - Haz clic en "Add New"
   - Nombre: (el de la tabla)
   - Valor: (el de la tabla)
   - Ambientes: ✅ Production, ✅ Preview, ✅ Development
   - Guarda

### 3. Redesplegar

Después de actualizar las variables, necesitas redesplegar:

```bash
vercel --prod
```

O desde el Dashboard:
1. Ve a "Deployments"
2. Haz clic en los tres puntos del último deployment
3. Selecciona "Redeploy"

## 🔍 Verificar Variables Actuales

Para ver las variables actuales (aunque estén encriptadas):

```bash
vercel env ls
```

## ⚠️ Nota Importante

- Las variables están encriptadas en Vercel por seguridad
- No puedes ver los valores directamente desde la CLI
- Si las variables están mal, el sitio no funcionará correctamente
- Después de cambiar variables, SIEMPRE redespliega

## 🚀 Después de Actualizar

1. Redespliega el proyecto
2. Espera a que termine el build
3. Prueba el sitio: https://tienda-ki1s0u76d-jasibnos-projects.vercel.app/libreria
4. Abre la consola del navegador (F12) y verifica que no haya errores de Firebase

