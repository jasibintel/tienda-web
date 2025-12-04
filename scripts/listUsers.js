// Script para listar usuarios en Firebase Auth
// Uso: node scripts/listUsers.js

const admin = require('firebase-admin');
const serviceAccount = require('../firebase-admin-key.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

async function listUsers() {
    try {
        console.log('🔍 Listando usuarios en Firebase Auth...\n');
        
        const listUsersResult = await admin.auth().listUsers(10);
        
        if (listUsersResult.users.length === 0) {
            console.log('No se encontraron usuarios.');
            return;
        }
        
        console.log(`✅ Encontrados ${listUsersResult.users.length} usuarios:\n`);
        
        listUsersResult.users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.email || 'Sin email'}`);
            console.log(`   UID: ${user.uid}`);
            console.log(`   Display Name: ${user.displayName || 'N/A'}`);
            console.log(`   Provider: ${user.providerData[0]?.providerId || 'N/A'}`);
            
            // Verificar custom claims
            if (user.customClaims && user.customClaims.admin) {
                console.log(`   ✅ Admin: true`);
            } else {
                console.log(`   ❌ Admin: false (no tiene custom claim)`);
            }
            
            console.log('');
        });
        
        console.log('\n💡 Para establecer admin, ejecuta:');
        console.log('   node scripts/setAdminClaim.js <email-del-usuario>');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

listUsers();

