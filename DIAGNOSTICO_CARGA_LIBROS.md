# 🔍 Diagnóstico: Libros No Cargan

## Pasos para Diagnosticar

### 1. Abrir la Consola del Navegador

1. Abre tu sitio en el navegador
2. Presiona `F12` o `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
3. Ve a la pestaña **Console**

### 2. Buscar Errores

Busca mensajes que empiecen con:
- ❌ (errores)
- ⚠️ (advertencias)
- 🔄 (proceso en curso)

### 3. Errores Comunes y Soluciones

#### Error: "Firestore no está inicializado"
**Causa**: Variables de entorno de Firebase no configuradas en Vercel

**Solución**:
1. Ve a: https://vercel.com/jasibnos-projects/tienda-web/settings/environment-variables
2. Verifica que estas variables estén configuradas:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

#### Error: "Missing or insufficient permissions"
**Causa**: Las reglas de Firestore están bloqueando la lectura

**Solución**:
1. Verifica que las reglas de Firestore permitan lectura pública:
   ```javascript
   match /books/{bookId} {
     allow read: if true;
   }
   ```
2. Despliega las reglas:
   ```bash
   firebase deploy --only firestore:rules
   ```

#### Error: "Index not found"
**Causa**: Faltan índices compuestos en Firestore

**Solución**:
1. Los índices ya están desplegados, pero pueden tardar unos minutos en crearse
2. Verifica en: https://console.firebase.google.com/project/tufecrecelibros/firestore/indexes
3. Si faltan, despliega de nuevo:
   ```bash
   firebase deploy --only firestore:indexes
   ```

#### Error: "Network request failed"
**Causa**: Problema de conectividad o CORS

**Solución**:
1. Verifica que tu dominio esté autorizado en Firebase Console
2. Ve a: https://console.firebase.google.com/project/tufecrecelibros/settings/general
3. En "Authorized domains", asegúrate de que tu dominio de Vercel esté listado

### 4. Verificar en Firebase Console

1. Ve a: https://console.firebase.google.com/project/tufecrecelibros/firestore/data
2. Verifica que la colección `books` exista
3. Verifica que haya documentos con `isActive: true`

### 5. Probar Conexión desde el Servidor

Ejecuta este comando para verificar que los libros existen:

```bash
node scripts/testFirestoreConnection.js
```

Si este script funciona pero el navegador no, el problema está en:
- Variables de entorno del cliente
- Reglas de Firestore
- CORS o autorización de dominios

### 6. Logs de Vercel

Revisa los logs de Vercel para ver errores del servidor:

```bash
vercel logs --follow
```

O desde el dashboard:
https://vercel.com/jasibnos-projects/tienda-web/logs

## Información de Depuración

Los logs en la consola del navegador mostrarán:
- 🔄 Cuando inicia una query
- ✅ Cuando se completan exitosamente
- ❌ Cuando hay errores (con código y mensaje)
- ⚠️ Cuando se usan fallbacks

## Contacto

Si el problema persiste, comparte:
1. Los mensajes de error de la consola del navegador
2. Los logs de Vercel
3. Una captura de pantalla de la página de error

