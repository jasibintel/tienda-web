#!/bin/bash

# Script para desplegar cambios a GitHub y Vercel
# Uso: ./scripts/deploy.sh [mensaje de commit]

set -e  # Salir si hay algún error

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Iniciando despliegue a GitHub y Vercel...${NC}\n"

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: No se encontró package.json. Asegúrate de estar en la raíz del proyecto.${NC}"
    exit 1
fi

# Verificar estado de git
echo -e "${YELLOW}📋 Verificando estado de Git...${NC}"
git status --short

# Verificar si hay cambios sin commit
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  No hay cambios para commitear.${NC}"
    SKIP_COMMIT=true
else
    SKIP_COMMIT=false
    
    # Obtener mensaje de commit
    if [ -z "$1" ]; then
        echo -e "${YELLOW}💬 Ingresa el mensaje de commit (o presiona Enter para usar mensaje por defecto):${NC}"
        read -r COMMIT_MESSAGE
        if [ -z "$COMMIT_MESSAGE" ]; then
            COMMIT_MESSAGE="chore: Actualizar proyecto"
        fi
    else
        COMMIT_MESSAGE="$1"
    fi
    
    # Agregar todos los cambios
    echo -e "${BLUE}📦 Agregando cambios a Git...${NC}"
    git add -A
    
    # Hacer commit
    echo -e "${BLUE}💾 Haciendo commit...${NC}"
    git commit -m "$COMMIT_MESSAGE" || {
        echo -e "${RED}❌ Error al hacer commit. ¿Ya hay cambios commitados?${NC}"
        exit 1
    }
    
    echo -e "${GREEN}✅ Commit realizado: $COMMIT_MESSAGE${NC}\n"
fi

# Push a GitHub
echo -e "${BLUE}📤 Subiendo cambios a GitHub...${NC}"
if git push; then
    echo -e "${GREEN}✅ Cambios subidos a GitHub exitosamente${NC}\n"
else
    echo -e "${RED}❌ Error al subir cambios a GitHub${NC}"
    exit 1
fi

# Verificar si Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI no está instalado.${NC}"
    echo -e "${YELLOW}   Instalando Vercel CLI globalmente...${NC}"
    npm install -g vercel || {
        echo -e "${RED}❌ Error al instalar Vercel CLI. Instálalo manualmente con: npm install -g vercel${NC}"
        exit 1
    }
fi

# Verificar si el proyecto está vinculado a Vercel
if [ ! -f ".vercel/project.json" ]; then
    echo -e "${YELLOW}⚠️  El proyecto no está vinculado a Vercel.${NC}"
    echo -e "${YELLOW}   Ejecutando: vercel link${NC}"
    vercel link || {
        echo -e "${RED}❌ Error al vincular proyecto con Vercel${NC}"
        exit 1
    }
fi

# Desplegar a Vercel
echo -e "${BLUE}🌐 Desplegando a Vercel...${NC}"
if vercel --prod; then
    echo -e "${GREEN}✅ Despliegue a Vercel completado exitosamente${NC}\n"
else
    echo -e "${RED}❌ Error al desplegar a Vercel${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 ¡Despliegue completado!${NC}"
echo -e "${GREEN}   ✓ Cambios en GitHub${NC}"
echo -e "${GREEN}   ✓ Desplegado en Vercel${NC}\n"

