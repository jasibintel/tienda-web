// Script para probar la configuración de Firebase en local
// Next.js carga automáticamente .env.local, pero este script necesita leerlo manualmente
const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de Firebase en local...\n');

// Leer .env.local manualmente
const envPath = path.join(__dirname, '..', '.env.local');
let envVars = {};

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            const [key, ...valueParts] = trimmed.split('=');
            if (key && valueParts.length > 0) {
                envVars[key.trim()] = valueParts.join('=').trim();
            }
        }
    });
    console.log('✅ Archivo .env.local encontrado\n');
} else {
    console.log('❌ Archivo .env.local NO encontrado\n');
}

const requiredVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
    'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'
];

console.log('📋 Variables de entorno requeridas:\n');
let allPresent = true;

requiredVars.forEach(varName => {
    // Intentar desde process.env primero (si se ejecuta con dotenv), luego desde archivo
    const value = process.env[varName] || envVars[varName];
    if (value) {
        // Mostrar solo los primeros y últimos caracteres por seguridad
        const masked = value.length > 10 
            ? `${value.substring(0, 4)}...${value.substring(value.length - 4)}`
            : '***';
        console.log(`✅ ${varName}: ${masked}`);
    } else {
        console.log(`❌ ${varName}: NO CONFIGURADA`);
        allPresent = false;
    }
});

if (!allPresent) {
    console.log('\n⚠️  Faltan variables de entorno.');
    console.log('📝 Crea un archivo .env.local con las siguientes variables:\n');
    console.log('# Firebase Configuration');
    console.log('NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key');
    console.log('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com');
    console.log('NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id');
    console.log('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com');
    console.log('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id');
    console.log('NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id');
    console.log('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=tu_measurement_id');
    console.log('\n💡 Puedes obtener estos valores desde:');
    console.log('   https://console.firebase.google.com/project/tufecrecelibros/settings/general');
    process.exit(1);
}

console.log('\n✅ Todas las variables están configuradas');
console.log('\n📝 Para probar la conexión con Firestore, ejecuta:');
console.log('   node scripts/testFirestoreConnection.js');
console.log('\n🚀 Para iniciar el servidor de desarrollo:');
console.log('   npm run dev');

