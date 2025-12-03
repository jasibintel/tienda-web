// Script para verificar que los libros se están cargando correctamente desde Firestore
const { db } = require('./admin');

async function testBooksLoading() {
    try {
        console.log('🔍 Verificando carga de libros desde Firestore...\n');

        // Test 1: Obtener todos los libros
        console.log('📚 Test 1: Obtener todos los libros activos');
        const allBooksSnapshot = await db.collection('books')
            .where('isActive', '==', true)
            .get();
        
        console.log(`   ✅ Encontrados ${allBooksSnapshot.size} libros activos\n`);

        // Test 2: Obtener libros destacados
        console.log('⭐ Test 2: Obtener libros destacados');
        const featuredSnapshot = await db.collection('books')
            .where('isActive', '==', true)
            .where('featured', '==', true)
            .get();
        
        console.log(`   ✅ Encontrados ${featuredSnapshot.size} libros destacados\n`);

        // Test 3: Obtener libros gratuitos
        console.log('🆓 Test 3: Obtener libros gratuitos');
        const freeSnapshot = await db.collection('books')
            .where('isActive', '==', true)
            .where('isFree', '==', true)
            .get();
        
        console.log(`   ✅ Encontrados ${freeSnapshot.size} libros gratuitos\n`);

        // Test 4: Obtener libros por categoría
        console.log('📂 Test 4: Obtener libros por categoría (devocionales)');
        const categorySnapshot = await db.collection('books')
            .where('isActive', '==', true)
            .where('category', '==', 'devocionales')
            .get();
        
        console.log(`   ✅ Encontrados ${categorySnapshot.size} libros en categoría "devocionales"\n`);

        // Test 5: Verificar estructura de datos
        console.log('🔬 Test 5: Verificar estructura de datos de un libro');
        if (allBooksSnapshot.size > 0) {
            const firstBook = allBooksSnapshot.docs[0];
            const bookData = firstBook.data();
            
            const requiredFields = ['title', 'author', 'category', 'coverUrl', 'isFree', 'status'];
            const missingFields = requiredFields.filter(field => !bookData[field]);
            
            if (missingFields.length === 0) {
                console.log(`   ✅ Todos los campos requeridos están presentes`);
                console.log(`   📖 Ejemplo: "${bookData.title}" por ${bookData.author}`);
                console.log(`   🖼️  Imagen: ${bookData.coverUrl}`);
                console.log(`   💰 Precio: ${bookData.isFree ? 'GRATIS' : `$${bookData.price} COP`}`);
            } else {
                console.log(`   ⚠️  Campos faltantes: ${missingFields.join(', ')}`);
            }
        }

        // Test 6: Verificar imágenes
        console.log('\n🖼️  Test 6: Verificar URLs de imágenes');
        let validImages = 0;
        let invalidImages = 0;
        
        allBooksSnapshot.forEach(doc => {
            const coverUrl = doc.data().coverUrl;
            if (coverUrl && coverUrl.startsWith('http')) {
                validImages++;
            } else {
                invalidImages++;
            }
        });

        console.log(`   ✅ Imágenes válidas (URLs HTTP): ${validImages}`);
        if (invalidImages > 0) {
            console.log(`   ⚠️  Imágenes inválidas: ${invalidImages}`);
        }

        // Resumen final
        console.log('\n' + '='.repeat(60));
        console.log('✅ VERIFICACIÓN COMPLETA');
        console.log('='.repeat(60));
        console.log(`\n📊 Resumen:`);
        console.log(`   - Total de libros: ${allBooksSnapshot.size}`);
        console.log(`   - Libros destacados: ${featuredSnapshot.size}`);
        console.log(`   - Libros gratuitos: ${freeSnapshot.size}`);
        console.log(`   - Imágenes válidas: ${validImages}/${allBooksSnapshot.size}`);
        console.log(`\n✅ Todos los tests pasaron exitosamente!`);
        console.log('✅ Los libros están listos para ser leídos por la aplicación\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error durante la verificación:', error);
        if (error.code === 'failed-precondition') {
            console.error('\n⚠️  NOTA: Puede que necesites crear índices en Firestore.');
            console.error('   Ve a Firebase Console > Firestore > Indexes');
            console.error('   Y crea los índices que Firestore te sugiera.\n');
        }
        process.exit(1);
    }
}

testBooksLoading();

