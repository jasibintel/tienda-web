// Firebase Admin SDK Configuration
// Script para inicializar Firebase Admin usando el archivo de credenciales

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Ruta al archivo de credenciales
const serviceAccountPath = path.join(__dirname, '..', 'firebase-admin-key.json');

// Verificar que el archivo existe
if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(`❌ No se encontró el archivo firebase-admin-key.json en la raíz del proyecto`);
}

// Leer el archivo de credenciales
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Inicializar Firebase Admin solo si no está ya inicializado
if (admin.apps.length === 0) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            projectId: serviceAccount.project_id,
            storageBucket: `${serviceAccount.project_id}.appspot.com`
        });
        console.log('✅ Firebase Admin inicializado correctamente');
    } catch (error) {
        console.error('❌ Error al inicializar Firebase Admin:', error);
        throw error;
    }
}

// Exportar Firestore
const db = admin.firestore();

// Configurar timestamps
db.settings({ ignoreUndefinedProperties: true });

module.exports = { db, admin };

