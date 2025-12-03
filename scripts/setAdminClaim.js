// Script para establecer el custom claim de admin en Firebase Auth
// Uso: node scripts/setAdminClaim.js <email-del-usuario>

const admin = require('firebase-admin');
const serviceAccount = require('../firebase-admin-key.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const email = process.argv[2];

if (!email) {
    console.error('❌ Error: Debes proporcionar el email del usuario');
    console.log('Uso: node scripts/setAdminClaim.js <email-del-usuario>');
    process.exit(1);
}

async function setAdminClaim() {
    try {
        console.log(`🔍 Buscando usuario con email: ${email}...`);
        
        // Buscar usuario por email
        const user = await admin.auth().getUserByEmail(email);
        
        if (!user) {
            console.error(`❌ No se encontró usuario con email: ${email}`);
            process.exit(1);
        }
        
        console.log(`✅ Usuario encontrado: ${user.uid}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Display Name: ${user.displayName || 'N/A'}`);
        
        // Establecer custom claim de admin
        console.log('\n🔧 Estableciendo custom claim de admin...');
        await admin.auth().setCustomUserClaims(user.uid, { admin: true });
        
        console.log('✅ Custom claim de admin establecido exitosamente!');
        console.log('\n📝 Nota: El usuario debe cerrar sesión y volver a iniciar sesión');
        console.log('   para que los cambios surtan efecto.');
        console.log('\n🔍 Para verificar, el usuario debe:');
        console.log('   1. Cerrar sesión');
        console.log('   2. Iniciar sesión de nuevo');
        console.log('   3. El token incluirá el claim admin: true');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.code === 'auth/user-not-found') {
            console.error(`   No se encontró usuario con email: ${email}`);
        }
        process.exit(1);
    }
}

setAdminClaim();

