#!/usr/bin/env node

/**
 * Script para desplegar cambios a GitHub y Vercel
 * Uso: node scripts/deploy.js [mensaje de commit]
 * O: npm run deploy:all [mensaje de commit]
 */

const { execSync } = require('child_process');
const readline = require('readline');

const GREEN = '\x1b[32m';
const BLUE = '\x1b[34m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

function log(message, color = RESET) {
    console.log(`${color}${message}${RESET}`);
}

function exec(command, options = {}) {
    try {
        return execSync(command, { 
            stdio: 'inherit',
            encoding: 'utf8',
            ...options 
        });
    } catch (error) {
        log(`❌ Error ejecutando: ${command}`, RED);
        process.exit(1);
    }
}

function question(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => {
        rl.question(query, answer => {
            rl.close();
            resolve(answer);
        });
    });
}

async function main() {
    log('🚀 Iniciando despliegue a GitHub y Vercel...\n', BLUE);

    // Verificar que estamos en el directorio correcto
    try {
        execSync('test -f package.json', { stdio: 'ignore' });
    } catch {
        log('❌ Error: No se encontró package.json. Asegúrate de estar en la raíz del proyecto.', RED);
        process.exit(1);
    }

    // Verificar estado de git
    log('📋 Verificando estado de Git...', YELLOW);
    try {
        execSync('git status --short', { stdio: 'inherit' });
    } catch {
        // No hay cambios o no es un repo git
    }

    // Verificar si hay cambios sin commit
    let hasChanges = false;
    try {
        const status = execSync('git status --porcelain', { encoding: 'utf8' });
        hasChanges = status.trim().length > 0;
    } catch {
        log('⚠️  No se pudo verificar el estado de Git', YELLOW);
    }

    let commitMessage = process.argv[2];

    if (hasChanges) {
        if (!commitMessage) {
            commitMessage = await question('💬 Ingresa el mensaje de commit (o presiona Enter para usar mensaje por defecto): ');
            if (!commitMessage.trim()) {
                commitMessage = 'chore: Actualizar proyecto';
            }
        }

        // Agregar todos los cambios
        log('📦 Agregando cambios a Git...', BLUE);
        exec('git add -A');

        // Hacer commit
        log('💾 Haciendo commit...', BLUE);
        try {
            exec(`git commit -m "${commitMessage}"`);
            log(`✅ Commit realizado: ${commitMessage}`, GREEN);
        } catch (error) {
            log('⚠️  No se pudo hacer commit. ¿Ya hay cambios commitados?', YELLOW);
        }
    } else {
        log('⚠️  No hay cambios para commitear.', YELLOW);
    }

    // Push a GitHub
    log('\n📤 Subiendo cambios a GitHub...', BLUE);
    try {
        exec('git push');
        log('✅ Cambios subidos a GitHub exitosamente', GREEN);
    } catch (error) {
        log('❌ Error al subir cambios a GitHub', RED);
        process.exit(1);
    }

    // Verificar si Vercel CLI está instalado
    let vercelInstalled = false;
    try {
        execSync('vercel --version', { stdio: 'ignore' });
        vercelInstalled = true;
    } catch {
        log('\n⚠️  Vercel CLI no está instalado.', YELLOW);
        log('   Instalando Vercel CLI globalmente...', YELLOW);
        try {
            exec('npm install -g vercel');
            vercelInstalled = true;
        } catch {
            log('❌ Error al instalar Vercel CLI. Instálalo manualmente con: npm install -g vercel', RED);
            process.exit(1);
        }
    }

    // Verificar si el proyecto está vinculado a Vercel
    try {
        execSync('test -f .vercel/project.json', { stdio: 'ignore' });
    } catch {
        log('\n⚠️  El proyecto no está vinculado a Vercel.', YELLOW);
        log('   Ejecutando: vercel link', YELLOW);
        try {
            exec('vercel link');
        } catch {
            log('❌ Error al vincular proyecto con Vercel', RED);
            process.exit(1);
        }
    }

    // Desplegar a Vercel
    log('\n🌐 Desplegando a Vercel...', BLUE);
    try {
        exec('vercel --prod');
        log('✅ Despliegue a Vercel completado exitosamente', GREEN);
    } catch (error) {
        log('❌ Error al desplegar a Vercel', RED);
        process.exit(1);
    }

    log('\n🎉 ¡Despliegue completado!', GREEN);
    log('   ✓ Cambios en GitHub', GREEN);
    log('   ✓ Desplegado en Vercel', GREEN);
    log('');
}

main().catch(error => {
    log(`\n❌ Error inesperado: ${error.message}`, RED);
    process.exit(1);
});

