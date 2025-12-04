# Scripts de Despliegue

Este proyecto incluye scripts automatizados para desplegar cambios tanto a GitHub como a Vercel.

## Opción 1: Script Node.js (Recomendado)

### Uso básico:
```bash
npm run deploy:all
```

### Con mensaje de commit personalizado:
```bash
npm run deploy:all "feat: Agregar nueva funcionalidad"
```

### O directamente con Node:
```bash
node scripts/deploy.js "feat: Agregar nueva funcionalidad"
```

## Opción 2: Script Bash

### Uso básico:
```bash
./scripts/deploy.sh
```

### Con mensaje de commit:
```bash
./scripts/deploy.sh "feat: Agregar nueva funcionalidad"
```

## Opción 3: Scripts individuales

### Solo GitHub:
```bash
npm run deploy:github
```

### Solo Vercel:
```bash
npm run deploy:vercel
```

## ¿Qué hace el script?

1. **Verifica cambios**: Revisa si hay cambios sin commitear
2. **Hace commit**: Si hay cambios, los commitea (puedes proporcionar un mensaje)
3. **Push a GitHub**: Sube los cambios al repositorio remoto
4. **Verifica Vercel CLI**: Comprueba si está instalado, si no, lo instala
5. **Vincula proyecto**: Si no está vinculado a Vercel, ejecuta `vercel link`
6. **Despliega a Vercel**: Ejecuta `vercel --prod` para desplegar a producción

## Requisitos

- Git configurado y repositorio remoto configurado
- Cuenta de Vercel (se vinculará automáticamente la primera vez)
- Node.js y npm instalados

## Notas

- Si no proporcionas un mensaje de commit, se usará uno por defecto
- Si no hay cambios para commitear, el script solo hará push y despliegue
- El script verifica automáticamente si Vercel CLI está instalado
- La primera vez que uses Vercel, te pedirá autenticarte

