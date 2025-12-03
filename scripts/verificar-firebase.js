// Script para verificar la configuración de Firebase (versión JavaScript)
// Ejecutar con: node scripts/verificar-firebase.js

const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const { getStorage } = require('firebase/storage');
require('dotenv').config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

async function verificarFirebase() {
  console.log('🔍 Verificando configuración de Firebase...\n');

  // Verificar variables de entorno
  console.log('📋 Variables de entorno:');
  console.log('  ✅ API Key:', firebaseConfig.apiKey ? 'Configurada' : '❌ Faltante');
  console.log('  ✅ Project ID:', firebaseConfig.projectId || '❌ Faltante');
  console.log('  ✅ Auth Domain:', firebaseConfig.authDomain || '❌ Faltante');
  console.log('  ✅ Storage Bucket:', firebaseConfig.storageBucket || '❌ Faltante');
  console.log('');

  // Inicializar Firebase
  try {
    const app = initializeApp(firebaseConfig);
    console.log('✅ Firebase inicializado correctamente\n');

    // Verificar Auth
    try {
      const auth = getAuth(app);
      console.log('✅ Firebase Authentication configurado');
      console.log('  - Auth Domain:', auth.config.authDomain);
    } catch (error) {
      console.log('❌ Error al configurar Authentication:', error.message);
    }

    // Verificar Firestore
    try {
      const db = getFirestore(app);
      console.log('✅ Firestore configurado');
      
      // Intentar leer una colección para verificar conexión
      try {
        const testCollection = collection(db, '_test');
        await getDocs(testCollection);
        console.log('  ✅ Conexión a Firestore exitosa');
      } catch (error) {
        if (error.code === 'permission-denied') {
          console.log('  ⚠️  Firestore conectado pero sin permisos (normal si no hay datos de prueba)');
        } else {
          console.log('  ⚠️  Firestore conectado pero:', error.message);
        }
      }
    } catch (error) {
      console.log('❌ Error al configurar Firestore:', error.message);
    }

    // Verificar Storage
    try {
      const storage = getStorage(app);
      console.log('✅ Firebase Storage configurado');
      console.log('  - Bucket:', storage.app.options.storageBucket);
    } catch (error) {
      console.log('❌ Error al configurar Storage:', error.message);
    }

    console.log('\n✅ Verificación completada');
    console.log('\n📝 Próximos pasos:');
    console.log('  1. Verifica que Authentication esté habilitado en Firebase Console');
    console.log('  2. Obtén las credenciales del Service Account para Admin SDK');
    console.log('  3. Habilita Storage si aún no está habilitado');
    console.log('  4. Verifica las reglas de seguridad en Firebase Console');

  } catch (error) {
    console.error('❌ Error al inicializar Firebase:', error.message);
    console.error('\n💡 Asegúrate de que:');
    console.error('  - El archivo .env.local existe');
    console.error('  - Todas las variables NEXT_PUBLIC_FIREBASE_* están configuradas');
    console.error('  - Has reiniciado el servidor después de crear .env.local');
  }
}

verificarFirebase().catch(console.error);

