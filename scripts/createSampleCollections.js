// Script para crear colecciones de ejemplo en Firestore
// Uso: node scripts/createSampleCollections.js

const { db } = require('./admin');

async function createSampleCollections() {
    try {
        console.log('📚 Creando colecciones de ejemplo...\n');
        
        // Primero, obtener algunos libros existentes para asignarlos a las colecciones
        const booksRef = db.collection('books');
        const booksSnapshot = await booksRef.where('isActive', '==', true).limit(10).get();
        const bookIds = booksSnapshot.docs.map(doc => doc.id);
        
        console.log(`📖 Encontrados ${bookIds.length} libros para asignar a colecciones\n`);
        
        const sampleCollections = [
            {
                name: 'Devocionales Diarios',
                slug: 'devocionales-diarios',
                descriptionShort: 'Una colección de devocionales diseñados para tu crecimiento espiritual diario',
                descriptionLong: 'Esta colección reúne los mejores devocionales creados para fortalecer tu relación con Dios día a día. Cada libro está diseñado para acompañarte en tu caminar espiritual, ofreciendo reflexiones profundas, versículos bíblicos y aplicaciones prácticas para tu vida cotidiana.',
                bannerUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=400&fit=crop&q=80',
                books: bookIds.slice(0, 3), // Primeros 3 libros
                order: 1,
                isActive: true,
                hasReadingOrder: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Fundamentos de la Fe',
                slug: 'fundamentos-fe',
                descriptionShort: 'Libros esenciales para entender y profundizar en los fundamentos de la fe cristiana',
                descriptionLong: 'Una colección cuidadosamente seleccionada de libros que cubren los fundamentos esenciales de la fe cristiana. Ideal para nuevos creyentes o para aquellos que desean refrescar y profundizar en las bases de su fe. Incluye temas como la salvación, la oración, el estudio bíblico y la vida cristiana.',
                bannerUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=400&fit=crop&q=80',
                books: bookIds.slice(3, 6), // Siguientes 3 libros
                order: 2,
                isActive: true,
                hasReadingOrder: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Para Familias',
                slug: 'para-familias',
                descriptionShort: 'Recursos diseñados para fortalecer y edificar a las familias cristianas',
                descriptionLong: 'Una colección especial para familias que buscan crecer juntas en la fe. Estos libros abordan temas como la crianza de hijos, el matrimonio cristiano, la comunicación familiar y cómo construir un hogar centrado en Dios. Perfectos para leer en familia o para padres que desean equiparse mejor.',
                bannerUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=400&fit=crop&q=80',
                books: bookIds.slice(6, 9), // Siguientes 3 libros
                order: 3,
                isActive: true,
                hasReadingOrder: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Liderazgo y Ministerio',
                slug: 'liderazgo-ministerio',
                descriptionShort: 'Herramientas y recursos para líderes y ministros que buscan servir con excelencia',
                descriptionLong: 'Una colección completa para líderes, pastores y ministros que desean desarrollar su liderazgo y servir con excelencia. Incluye temas sobre predicación, enseñanza, administración de iglesias, discipulado y desarrollo de ministerios efectivos.',
                bannerUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop&q=80',
                books: bookIds.slice(0, 2), // Primeros 2 libros
                order: 4,
                isActive: true,
                hasReadingOrder: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
        
        // Verificar si ya existen colecciones
        const existingCollections = await db.collection('collections').get();
        if (!existingCollections.empty) {
            console.log(`⚠️  Ya existen ${existingCollections.docs.length} colecciones en Firestore.`);
            console.log('   Si deseas crear estas colecciones de ejemplo, primero elimina las existentes o modifica este script.\n');
            return;
        }
        
        // Crear las colecciones
        for (const [index, collection] of sampleCollections.entries()) {
            const docRef = await db.collection('collections').add(collection);
            console.log(`✅ [${index + 1}/${sampleCollections.length}] "${collection.name}" creada`);
            console.log(`   Slug: ${collection.slug}`);
            console.log(`   Libros asignados: ${collection.books.length}`);
            console.log('');
        }
        
        console.log('✅ Colecciones de ejemplo creadas exitosamente!');
        console.log('\n📝 Nota: Las colecciones usan IDs de libros existentes.');
        console.log('   Si no hay suficientes libros, algunas colecciones pueden tener menos libros asignados.');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
        process.exit(1);
    }
}

createSampleCollections();

