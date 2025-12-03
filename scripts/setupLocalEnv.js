// Script para configurar .env.local con las variables de Firebase
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');

// Valores de Firebase desde firebase_options.dart
const firebaseConfig = `# Firebase Configuration
# Configuración extraída del proyecto Flutter (tufecrecelibros)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDLcUAeVdCeu3Wa_aIZ9as9pyTks5h2wik
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tufecrecelibros.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tufecrecelibros
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tufecrecelibros.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=144930929084
NEXT_PUBLIC_FIREBASE_APP_ID=1:144930929084:web:84c2fc0421b3375f23d3b9
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-HVFT74SC2T

`;

// Leer contenido actual si existe
let currentContent = '';
if (fs.existsSync(envPath)) {
    currentContent = fs.readFileSync(envPath, 'utf8');
    console.log('📄 Archivo .env.local encontrado');
    
    // Verificar si ya tiene las variables de Firebase
    if (currentContent.includes('NEXT_PUBLIC_FIREBASE_API_KEY')) {
        console.log('✅ Las variables de Firebase ya están configuradas');
        console.log('\n💡 Si aún no funciona, verifica que:');
        console.log('   1. El servidor de desarrollo esté reiniciado (Ctrl+C y luego npm run dev)');
        console.log('   2. No haya errores en la consola del navegador (F12)');
        process.exit(0);
    }
    
    // Si tiene contenido pero no las variables de Firebase, agregarlas
    if (currentContent.trim()) {
        console.log('📝 Agregando variables de Firebase al archivo existente...');
        const newContent = currentContent + '\n' + firebaseConfig;
        fs.writeFileSync(envPath, newContent, 'utf8');
        console.log('✅ Variables de Firebase agregadas');
    } else {
        fs.writeFileSync(envPath, firebaseConfig, 'utf8');
        console.log('✅ Archivo .env.local creado con las variables de Firebase');
    }
} else {
    // Crear nuevo archivo
    fs.writeFileSync(envPath, firebaseConfig, 'utf8');
    console.log('✅ Archivo .env.local creado con las variables de Firebase');
}

console.log('\n📋 Variables configuradas:');
console.log('   ✅ NEXT_PUBLIC_FIREBASE_API_KEY');
console.log('   ✅ NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
console.log('   ✅ NEXT_PUBLIC_FIREBASE_PROJECT_ID');
console.log('   ✅ NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET');
console.log('   ✅ NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID');
console.log('   ✅ NEXT_PUBLIC_FIREBASE_APP_ID');
console.log('   ✅ NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID');

console.log('\n🚀 Próximos pasos:');
console.log('   1. Si tienes el servidor corriendo, deténlo (Ctrl+C)');
console.log('   2. Reinicia el servidor: npm run dev');
console.log('   3. Abre http://localhost:3000/libreria');
console.log('   4. Abre la consola del navegador (F12) para ver los logs');

