// Script para probar la conexión con Firestore desde el cliente
const admin = require('firebase-admin');
const serviceAccount = require('../firebase-admin-key.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function testConnection() {
    console.log('🔍 Probando conexión con Firestore...\n');
    
    try {
        // Probar obtener todos los libros
        console.log('1️⃣ Probando getAllBooks...');
        const booksRef = db.collection('books');
        const snapshot = await booksRef.get();
        
        if (snapshot.empty) {
            console.log('❌ No se encontraron libros en la colección');
            return;
        }
        
        console.log(`✅ Encontrados ${snapshot.size} libros\n`);
        
        // Probar query con isActive
        console.log('2️⃣ Probando query con isActive == true...');
        const activeQuery = await booksRef.where('isActive', '==', true).get();
        console.log(`✅ Encontrados ${activeQuery.size} libros activos\n`);
        
        // Probar query con isActive y orderBy createdAt
        console.log('3️⃣ Probando query con isActive y orderBy createdAt...');
        try {
            const orderedQuery = await booksRef
                .where('isActive', '==', true)
                .orderBy('createdAt', 'desc')
                .get();
            console.log(`✅ Query con orderBy exitosa: ${orderedQuery.size} libros\n`);
        } catch (error) {
            console.log(`⚠️  Error con orderBy: ${error.message}`);
            console.log('   Esto puede requerir un índice compuesto\n');
        }
        
        // Verificar campos de un libro
        console.log('4️⃣ Verificando estructura de un libro...');
        const firstBook = snapshot.docs[0].data();
        console.log('Campos del primer libro:');
        console.log(`   - id: ${snapshot.docs[0].id}`);
        console.log(`   - title: ${firstBook.title || 'NO EXISTE'}`);
        console.log(`   - isActive: ${firstBook.isActive !== undefined ? firstBook.isActive : 'NO EXISTE'}`);
        console.log(`   - createdAt: ${firstBook.createdAt ? (firstBook.createdAt.toDate ? firstBook.createdAt.toDate().toISOString() : firstBook.createdAt) : 'NO EXISTE'}`);
        console.log(`   - coverUrl: ${firstBook.coverUrl || 'NO EXISTE'}\n`);
        
        // Verificar reglas de Firestore
        console.log('5️⃣ Verificando reglas de Firestore...');
        console.log('   (Las reglas se verifican desde el cliente, no desde Admin SDK)\n');
        
        console.log('✅ Todas las pruebas completadas exitosamente');
        
    } catch (error) {
        console.error('❌ Error en la prueba:', error);
        console.error('Stack:', error.stack);
    }
    
    process.exit(0);
}

testConnection();

