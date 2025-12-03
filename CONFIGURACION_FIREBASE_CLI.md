# Configuración de Firebase vía CLI - Resumen

## ✅ Lo que YA está configurado por CLI:

1. **Proyecto seleccionado**: `tufecrecelibros`
2. **Firebase CLI autenticado**: ✅
3. **Archivos de configuración creados**:
   - `firebase.json` - Configuración principal
   - `firestore.rules` - Reglas de seguridad de Firestore
   - `storage.rules` - Reglas de seguridad de Storage
   - `firestore.indexes.json` - Índices de Firestore

## 📋 Lo que puedes hacer por CLI:

### 1. Desplegar Reglas de Firestore
```bash
firebase deploy --only firestore:rules
```

### 2. Desplegar Reglas de Storage (cuando esté habilitado)
```bash
firebase deploy --only storage:rules
```

### 3. Ver el estado de Firestore
```bash
firebase firestore:databases:list
```

### 4. Exportar datos de Firestore
```bash
firebase firestore:export gs://tu-bucket/backup
```

### 5. Importar datos a Firestore
```bash
firebase firestore:import gs://tu-bucket/backup
```

## ⚠️ Lo que NO se puede hacer por CLI:

### 1. Obtener credenciales del Service Account
**Esto DEBE hacerse desde la consola web** por razones de seguridad:
- Ve a: https://console.firebase.google.com/project/tufecrecelibros/settings/serviceaccounts/adminsdk
- Haz clic en "Generate new private key"
- Descarga el JSON y extrae los valores para `.env.local`

### 2. Habilitar Storage (primera vez)
**Debe habilitarse desde la consola web**:
- Ve a: https://console.firebase.google.com/project/tufecrecelibros/storage
- Haz clic en "Get Started"
- Selecciona el modo de producción

### 3. Habilitar Authentication
**Debe configurarse desde la consola web**:
- Ve a: https://console.firebase.google.com/project/tufecrecelibros/authentication
- Habilita los métodos de autenticación (Email/Password, Google, etc.)

## 🚀 Comandos Útiles

### Verificar conexión
```bash
firebase projects:list
```

### Ver información del proyecto actual
```bash
firebase use
```

### Ver logs en tiempo real
```bash
firebase functions:log
```

### Listar todas las apps del proyecto
```bash
firebase apps:list
```

## 📝 Próximos Pasos

1. **Habilitar Storage** (si no está habilitado):
   - Ve a la consola web y habilítalo
   - Luego despliega las reglas: `firebase deploy --only storage:rules`

2. **Obtener credenciales del Service Account**:
   - Sigue las instrucciones en `OBTENER_CREDENCIALES_ADMIN.md`

3. **Desplegar reglas de Firestore**:
   ```bash
   firebase deploy --only firestore:rules
   ```

4. **Verificar que todo funciona**:
   ```bash
   npm run dev
   ```

## 🔍 Verificar Estado Actual

Para ver qué servicios están habilitados:
```bash
# Ver bases de datos de Firestore
firebase firestore:databases:list

# Ver información del proyecto
firebase projects:list
```

