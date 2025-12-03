#!/bin/bash
# Script para construir y preparar el proyecto para Firebase Hosting

echo "🔨 Construyendo proyecto para Firebase Hosting..."

# Limpiar builds anteriores
rm -rf .next out

# Construir el proyecto
echo "📦 Ejecutando build de Next.js..."
npm run build

# Crear directorio out si no existe
mkdir -p out

# Copiar archivos estáticos
echo "📋 Copiando archivos estáticos..."
cp -r public/* out/ 2>/dev/null || true

# Copiar archivos de Next.js
echo "📋 Copiando archivos de Next.js..."
cp -r .next/static out/_next/static 2>/dev/null || true

# Crear index.html básico que redirige a la app
cat > out/index.html << 'EOF'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>De Gloria en Gloria - Librería Cristiana Digital</title>
    <script>
        // Redirigir a la app principal
        window.location.href = '/';
    </script>
</head>
<body>
    <p>Cargando...</p>
</body>
</html>
EOF

echo "✅ Build completado. Listo para desplegar con: firebase deploy --only hosting"

