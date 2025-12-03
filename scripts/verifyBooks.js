// Script para verificar los libros importados
const { db } = require('./admin');

async function verifyBooks() {
    try {
        console.log('🔍 Verificando libros en Firestore...\n');

        // Obtener todos los libros
        const snapshot = await db.collection('books').get();
        
        console.log(`✅ Total de libros encontrados: ${snapshot.size}\n`);
        
        if (snapshot.size === 0) {
            console.log('⚠️ No se encontraron libros en la colección');
            return;
        }

        // Mostrar resumen
        const books = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            books.push({
                id: doc.id,
                title: data.title,
                category: data.category,
                isFree: data.isFree,
                price: data.price || 0,
                featured: data.featured || false,
                status: data.status
            });
        });

        console.log('📋 RESUMEN DE LIBROS EN FIRESTORE:\n');
        books.forEach((book, index) => {
            const precio = book.isFree ? 'GRATIS' : `$${book.price.toLocaleString('es-CO')} COP`;
            const destacado = book.featured ? ' ⭐' : '';
            console.log(`${index + 1}. [${book.id}] ${book.title}`);
            console.log(`   Categoría: ${book.category} | Precio: ${precio}${destacado} | Estado: ${book.status}`);
        });

        // Estadísticas
        const gratis = books.filter(b => b.isFree).length;
        const pagos = books.filter(b => !b.isFree).length;
        const destacados = books.filter(b => b.featured).length;
        const publicados = books.filter(b => b.status === 'published').length;

        console.log('\n📊 ESTADÍSTICAS:');
        console.log(`   - Total de libros: ${books.length}`);
        console.log(`   - Libros gratuitos: ${gratis}`);
        console.log(`   - Libros de pago: ${pagos}`);
        console.log(`   - Libros destacados: ${destacados}`);
        console.log(`   - Libros publicados: ${publicados}`);

        // Verificar categorías
        const categorias = [...new Set(books.map(b => b.category))];
        console.log(`\n📚 Categorías únicas: ${categorias.length}`);
        categorias.forEach(cat => {
            const count = books.filter(b => b.category === cat).length;
            console.log(`   - ${cat}: ${count} libro(s)`);
        });

        console.log('\n✅ Verificación completada exitosamente!');
        console.log('✅ La página /libreria puede leer estos libros desde Firestore\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error durante la verificación:', error);
        process.exit(1);
    }
}

verifyBooks();

