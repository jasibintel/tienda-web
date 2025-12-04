// Script para verificar colecciones en Firestore
// Uso: node scripts/verifyCollections.js

const { db } = require('./admin');

async function verifyCollections() {
    try {
        console.log('🔍 Verificando colecciones en Firestore...\n');
        
        const collectionsRef = db.collection('collections');
        const snapshot = await collectionsRef.get();
        
        if (snapshot.empty) {
            console.log('❌ No se encontraron colecciones en Firestore.');
            console.log('\n💡 Para crear colecciones de ejemplo, ejecuta:');
            console.log('   node scripts/createSampleCollections.js');
            return;
        }
        
        console.log(`✅ Encontradas ${snapshot.docs.length} colecciones:\n`);
        
        snapshot.docs.forEach((doc, index) => {
            const data = doc.data();
            console.log(`${index + 1}. ${data.name || 'Sin nombre'}`);
            console.log(`   ID: ${doc.id}`);
            console.log(`   Slug: ${data.slug || 'N/A'}`);
            console.log(`   Activa: ${data.isActive !== false ? '✅ Sí' : '❌ No'}`);
            console.log(`   Libros: ${data.books?.length || 0}`);
            console.log(`   Orden: ${data.order || 0}`);
            console.log('');
        });
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

verifyCollections();

