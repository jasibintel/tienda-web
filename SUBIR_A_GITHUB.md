# 🚀 Guía para Subir el Proyecto a GitHub

## ✅ Estado Actual

- ✅ Git inicializado
- ✅ Cambios commiteados
- ✅ GitHub CLI instalado
- ⏳ Falta autenticación con GitHub

## 🔐 Paso 1: Autenticarte con GitHub

Tienes dos opciones:

### Opción A: Autenticación Web (Recomendado)

```bash
gh auth login
```

Sigue las instrucciones:
1. Selecciona "GitHub.com"
2. Selecciona "HTTPS" o "SSH" (recomiendo HTTPS)
3. Selecciona "Login with a web browser"
4. Copia el código que te muestre
5. Se abrirá tu navegador, pega el código
6. Autoriza la aplicación

### Opción B: Con Token Personal

1. Ve a: https://github.com/settings/tokens
2. Haz clic en "Generate new token (classic)"
3. Dale un nombre (ej: "tienda-web")
4. Selecciona los scopes: `repo` (todos los permisos de repositorio)
5. Genera el token y cópialo
6. Ejecuta:
```bash
gh auth login --with-token < token.txt
# O simplemente:
echo "TU_TOKEN_AQUI" | gh auth login --with-token
```

## 📦 Paso 2: Crear el Repositorio en GitHub

Una vez autenticado, ejecuta:

```bash
# Crear repositorio y subir código
gh repo create tienda-web --public --source=. --remote=origin --push
```

O si prefieres hacerlo paso a paso:

```bash
# 1. Crear repositorio (sin subir aún)
gh repo create tienda-web --public

# 2. Agregar remote (si no existe)
git remote add origin https://github.com/TU_USUARIO/tienda-web.git

# 3. Subir código
git push -u origin main
```

## 🔄 Paso 3: Verificar

```bash
# Ver el repositorio
gh repo view

# Abrir en el navegador
gh repo view --web
```

## 📝 Notas Importantes

1. **Archivos protegidos**: El `.gitignore` ya está configurado para NO subir:
   - `.env.local` (tus credenciales)
   - `node_modules/`
   - `.next/`
   - Archivos sensibles

2. **Credenciales**: Asegúrate de que `.env.local` NO esté en el repositorio

3. **README**: Puedes actualizar el README.md con información del proyecto

## 🎯 Comandos Rápidos

```bash
# Autenticarse
gh auth login

# Crear y subir repositorio
gh repo create tienda-web --public --source=. --remote=origin --push

# Ver repositorio
gh repo view --web
```

## 🔗 Después de Subir

Una vez subido, puedes:
- Ver el código en: `https://github.com/TU_USUARIO/tienda-web`
- Configurar GitHub Actions para CI/CD
- Conectar con Vercel para despliegue automático
- Colaborar con otros desarrolladores

## ⚠️ Si hay problemas

Si el remote ya existe:
```bash
# Ver remotes actuales
git remote -v

# Si necesitas cambiar el remote
git remote set-url origin https://github.com/TU_USUARIO/tienda-web.git

# Luego subir
git push -u origin main
```

