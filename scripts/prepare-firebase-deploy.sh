#!/bin/bash
# Script para preparar el proyecto Next.js para Firebase Hosting
# Este script crea una versión estática que funciona con Firebase Hosting

set -e

echo "🔨 Preparando proyecto para Firebase Hosting..."

# Limpiar builds anteriores
echo "🧹 Limpiando builds anteriores..."
rm -rf .next out

# Construir el proyecto
echo "📦 Construyendo proyecto Next.js..."
npm run build

# Crear directorio out
echo "📁 Creando directorio de salida..."
mkdir -p out

# Copiar archivos públicos
echo "📋 Copiando archivos públicos..."
if [ -d "public" ]; then
    cp -r public/* out/
fi

# Copiar archivos estáticos de Next.js
echo "📋 Copiando archivos estáticos de Next.js..."
if [ -d ".next/static" ]; then
    mkdir -p out/_next/static
    cp -r .next/static/* out/_next/static/
fi

# Copiar páginas HTML generadas
echo "📋 Copiando páginas HTML..."
if [ -d ".next/server/app" ]; then
    # Next.js genera HTML en .next/server/app
    # Necesitamos copiar estos archivos
    find .next/server/app -name "*.html" -exec cp --parents {} out/ \;
fi

# Crear index.html principal si no existe
if [ ! -f "out/index.html" ]; then
    echo "📄 Creando index.html principal..."
    cat > out/index.html << 'EOF'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>De Gloria en Gloria - Librería Cristiana Digital</title>
    <script>
        // Cargar la aplicación Next.js
        if (typeof window !== 'undefined') {
            // La app se cargará automáticamente
        }
    </script>
</head>
<body>
    <div id="__next"></div>
    <script src="/_next/static/chunks/main.js" defer></script>
</body>
</html>
EOF
fi

echo "✅ Preparación completada!"
echo "📦 Directorio 'out' listo para desplegar"
echo "🚀 Ejecuta: firebase deploy --only hosting"

