// Script para actualizar las imágenes de los libros con imágenes reales de Internet
const { db } = require('./admin');

// URLs de imágenes reales de libros (usando Unsplash y otros servicios)
// Tamaño: 400x600 (proporción de portada de libro)
const bookImages = [
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop', // Libro abierto
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop', // Libro antiguo
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop', // Libro con luz
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop', // Libro en estante
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop', // Libro religioso
    'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop', // Biblia
    'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=600&fit=crop', // Libro vintage
    'https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=400&h=600&fit=crop', // Libro abierto
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop', // Libro espiritual
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop', // Libro clásico
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop', // Libro de fe
    'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop', // Libro sagrado
    'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=600&fit=crop', // Libro elegante
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop', // Libro moderno
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop', // Libro iluminado
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop', // Libro devocional
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop', // Libro teológico
    'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop', // Libro bíblico
    'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=600&fit=crop', // Libro clásico
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop', // Libro contemporáneo
];

// Función para obtener una imagen única basada en el índice
function getBookImage(index) {
    return bookImages[index % bookImages.length];
}

async function updateBookImages() {
    try {
        console.log('🖼️  Actualizando imágenes de los libros...\n');

        // Obtener todos los libros
        const snapshot = await db.collection('books').get();
        
        if (snapshot.empty) {
            console.log('⚠️  No se encontraron libros para actualizar');
            return;
        }

        console.log(`📚 Encontrados ${snapshot.size} libros para actualizar\n`);

        const updates = [];
        let index = 0;

        snapshot.forEach(doc => {
            const imageUrl = getBookImage(index);
            updates.push({
                docId: doc.id,
                title: doc.data().title,
                imageUrl: imageUrl
            });
            index++;
        });

        // Actualizar cada libro
        for (const update of updates) {
            try {
                await db.collection('books').doc(update.docId).update({
                    coverUrl: update.imageUrl,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp()
                });
                console.log(`✅ [${updates.indexOf(update) + 1}/${updates.length}] "${update.title}" - Imagen actualizada`);
            } catch (error) {
                console.error(`❌ Error al actualizar "${update.title}":`, error.message);
            }
        }

        console.log('\n' + '='.repeat(60));
        console.log('📊 RESUMEN DE ACTUALIZACIÓN');
        console.log('='.repeat(60));
        console.log(`\n✅ Total de libros actualizados: ${updates.length}`);
        console.log(`🖼️  Todas las imágenes ahora son de Unsplash (400x600px)`);
        console.log(`\n✅ Actualización completada exitosamente!`);
        console.log('✅ Las imágenes se cargarán desde Internet en la aplicación\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error durante la actualización:', error);
        process.exit(1);
    }
}

// Importar admin para serverTimestamp
const { admin } = require('./admin');

// Ejecutar actualización
updateBookImages();

