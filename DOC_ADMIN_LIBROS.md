# Documentación: Administración de Libros

## Estructura del Documento "book" en Firestore

Cada libro se almacena como un documento en la colección `books` de Firestore. A continuación se detalla la estructura completa recomendada.

## Campos Obligatorios

Estos campos **deben** estar presentes en todos los libros:

- `title: string` - Título del libro
- `author: string` - Nombre del autor
- `description: string` - Descripción corta (máx 200 caracteres)
- `descriptionLong: string` - Descripción completa
- `category: string` - ID de la categoría (debe existir en la colección `categories`)
- `audience: string` - Público objetivo: `'adultos' | 'jovenes' | 'ninos' | 'familias' | 'maestros' | 'todos'`
- `isFree: boolean` - Si el libro es gratuito
- `coverUrl: string` - URL de la imagen de portada
- `formats: string[]` - Formatos disponibles: `['PDF']`, `['EPUB']`, o `['PDF', 'EPUB']`
- `isActive: boolean` - Si el libro está activo y visible en la tienda

**Nota sobre precio**: Si `isFree === false`, entonces `price: number` es obligatorio.

## Campos Opcionales pero Importantes

### Información Básica

- `subtitle?: string` - Subtítulo del libro
- `slug?: string` - Slug personalizado para URL (si está vacío, se genera desde el título)
- `featured?: boolean` - Si el libro aparece destacado en la home
- `price?: number` - Precio en COP (requerido si `isFree === false`)

### SEO y Metadata

- `metaDescription?: string` - Meta descripción para SEO y OpenGraph (máx 160 caracteres)
- `tags?: string[]` - Array de etiquetas/palabras clave (máx 10 tags, cada uno máx 30 caracteres)

### Contenido

- `learningPoints?: string[]` - Array de puntos de aprendizaje del libro
- `targetAudience?: Array<{ icon: string; title: string; description: string }>` - Audiencias específicas con iconos

### Detalles Técnicos

- `pages?: number` - Número de páginas
- `language?: string` - Idioma del libro (por defecto: "Español")
- `publishedDate?: string` - Fecha de publicación (formato ISO o YYYY-MM-DD)
- `isbn?: string` - ISBN del libro
- `publisher?: string` - Nombre de la editorial
- `fileSize?: { pdf?: string; epub?: string }` - Tamaño de archivos en formato legible (ej: "2.5 MB")

### Archivos y Descargas

- `downloadUrls?: { pdf?: string; epub?: string }` - URLs de descarga directa
  - `pdf?: string` - URL del archivo PDF (debe ser URL válida con http:// o https://)
  - `epub?: string` - URL del archivo EPUB (opcional)
- `previewUrl?: string` - URL de vista previa (PDF con primeras páginas)
- `downloadUrl?: string` - URL de descarga genérica (legacy, usar `downloadUrls` preferiblemente)

### Colecciones

- `collectionIds?: string[]` - Array de IDs de colecciones a las que pertenece el libro
- `readingOrder?: number` - Orden de lectura dentro de una colección (opcional)

### Centro de Recursos

- `hasResources?: boolean` - Indica si el libro tiene contenido extra disponible
  - Si es `true`, debe existir un documento en la colección `bookResources` con el mismo ID del libro
  - Ver documentación en `DOC_CENTRO_RECURSOS.md` para más detalles

### Campos de Sistema

- `createdAt?: string` - Fecha de creación (ISO string)
- `updatedAt?: string` - Fecha de última actualización (ISO string)
- `createdBy?: string` - UID del usuario que creó el libro

## Ejemplo de Documento Completo

```json
{
  "title": "El Poder de la Oración Transformadora",
  "subtitle": "Descubre cómo la oración profunda puede cambiar tu vida",
  "author": "Dr. Samuel Martínez",
  "slug": "el-poder-de-la-oracion-transformadora",
  "description": "Una guía práctica para desarrollar una vida de oración profunda y transformadora.",
  "descriptionLong": "En este libro, el Dr. Samuel Martínez comparte principios bíblicos y prácticos para desarrollar una vida de oración que realmente transforme tu relación con Dios y con los demás...",
  "metaDescription": "Libro cristiano sobre oración transformadora. Guía práctica para desarrollar una vida de oración profunda.",
  "category": "devocionales",
  "audience": "adultos",
  "tags": ["oración", "devoción", "vida cristiana", "transformación"],
  "price": 35000,
  "isFree": false,
  "featured": true,
  "formats": ["PDF", "EPUB"],
  "downloadUrls": {
    "pdf": "https://storage.ejemplo.com/libros/oracion-transformadora.pdf",
    "epub": "https://storage.ejemplo.com/libros/oracion-transformadora.epub"
  },
  "previewUrl": "https://storage.ejemplo.com/libros/oracion-transformadora-preview.pdf",
  "coverUrl": "https://storage.ejemplo.com/portadas/oracion-transformadora.jpg",
  "learningPoints": [
    "Principios bíblicos de la oración",
    "Cómo desarrollar disciplina en la oración",
    "Oración intercesora efectiva"
  ],
  "pages": 248,
  "language": "Español",
  "publishedDate": "2024-01-15",
  "isbn": "978-3-16-148410-0",
  "publisher": "Editorial De Gloria en Gloria",
  "fileSize": {
    "pdf": "2.5 MB",
    "epub": "1.8 MB"
  },
  "collectionIds": ["coleccion-oracion-2024"],
  "readingOrder": 1,
  "hasResources": true,
  "isActive": true,
  "createdAt": "2024-01-10T10:00:00Z",
  "updatedAt": "2024-01-15T14:30:00Z",
  "createdBy": "user-uid-123"
}
```

## Validaciones

### Validaciones del Formulario

1. **Título**: Requerido, no puede estar vacío, máx 100 caracteres
2. **Autor**: Requerido, no puede estar vacío
3. **Categoría**: Requerido, debe ser un ID válido de la colección `categories`
4. **Audiencia**: Requerido, debe ser uno de los valores permitidos
5. **Precio**: Requerido solo si `isFree === false`
6. **Descripción corta**: Requerido, máx 200 caracteres
7. **Descripción larga**: Requerido
8. **Meta descripción**: Opcional, máx 160 caracteres
9. **URLs**: Si se proporcionan, deben ser URLs válidas (empezar con http:// o https://)
10. **Tags**: Máximo 10 tags, cada tag máximo 30 caracteres, sin duplicados
11. **Slug**: Si se proporciona, debe tener formato válido (solo letras minúsculas, números y guiones)

### Validaciones en Firestore

Las reglas de Firestore permiten:
- **Lectura**: Pública (cualquiera puede leer libros activos)
- **Escritura**: Solo administradores (usuarios con `admin: true` en custom claims)

## Cómo Funcionan las URLs de Descarga

### Estructura

Las URLs de descarga se almacenan en el campo `downloadUrls`:

```typescript
downloadUrls: {
  pdf?: string;  // URL del archivo PDF
  epub?: string; // URL del archivo EPUB
}
```

### Formatos Soportados

- **URLs absolutas**: `https://ejemplo.com/libro.pdf`
- **URLs relativas**: `/libros/libro.pdf` (se interpretan como relativas al dominio)
- **Firebase Storage**: `gs://bucket-name/path/to/file.pdf` (se convierte a URL pública)
- **Nextcloud**: `https://nextcloud.ejemplo.com/s/TOKEN/download/libro.pdf`

### Validación

- Las URLs deben empezar con `http://` o `https://`
- Se valida el formato básico en el formulario
- No se valida que la URL sea accesible (eso se verifica al intentar descargar)

## Cómo se Conecta con Colecciones

### Relación

Los libros pueden pertenecer a múltiples colecciones mediante el campo `collectionIds`:

```typescript
collectionIds: string[] // Array de IDs de colecciones
```

### Orden de Lectura

Si un libro pertenece a una colección con `hasReadingOrder: true`, se puede especificar el orden:

```typescript
readingOrder: number // Orden dentro de la colección (1, 2, 3, ...)
```

### Actualización Bidireccional

**Nota**: Actualmente, cuando se actualiza `collectionIds` en un libro, **no se actualiza automáticamente** el campo `books` en la colección. Esto debe hacerse manualmente o mediante una función Cloud Function en el futuro.

Para mantener consistencia:
1. Al agregar un libro a una colección, también agregar el `bookId` al array `books` de la colección
2. Al quitar un libro de una colección, también remover el `bookId` del array `books` de la colección

## Cómo se Conecta con Centro de Recursos

### Indicador

El campo `hasResources: boolean` indica si el libro tiene contenido extra disponible.

### Estructura de Recursos

Si `hasResources === true`, debe existir un documento en la colección `bookResources` con:
- **ID del documento**: Mismo ID que el libro
- **Estructura**: Ver `DOC_CENTRO_RECURSOS.md`

### Flujo

1. Usuario compra/obtiene libro → Se agrega a `users/{userId}/library/{bookId}`
2. Si `hasResources === true` → Se muestra botón "Ver contenido extra" en Mi Biblioteca
3. Al hacer clic → Se verifica acceso y se muestra contenido desde `bookResources/{bookId}`

## Valores Válidos por Campo

### `category`

Debe ser un ID válido de la colección `categories`. Valores comunes:
- `devocionales`
- `maestros`
- `familias`
- `jovenes`
- `ninos`
- `liderazgo`
- `predicaciones`

### `audience`

Valores permitidos:
- `adultos`
- `jovenes`
- `ninos`
- `familias`
- `maestros`
- `todos`

### `formats`

Array de strings, valores permitidos:
- `'PDF'`
- `'EPUB'`

### `language`

Valores comunes:
- `Español` (por defecto)
- `Inglés`
- `Portugués`

## Mejores Prácticas

1. **Slug**: Dejar que se genere automáticamente desde el título, a menos que necesites un slug específico
2. **Meta descripción**: Siempre incluir para mejor SEO (máx 160 caracteres)
3. **Tags**: Usar 3-5 tags relevantes, evitar duplicados
4. **URLs**: Usar URLs absolutas cuando sea posible para evitar problemas de dominio
5. **Portada**: Usar imágenes de al menos 400x600px, formato JPG o PNG
6. **Formatos**: Si el libro tiene ambos formatos, incluir ambos en `formats` y proporcionar ambas URLs
7. **Colecciones**: Agregar libros a colecciones relevantes para mejor organización
8. **Centro de Recursos**: Marcar `hasResources: true` solo si realmente hay contenido extra disponible

## Notas de Implementación

- El formulario admin genera automáticamente el slug si está vacío
- Las URLs se validan en tiempo real en el formulario
- Los tags se validan para evitar duplicados y límites de longitud
- Las categorías se cargan desde Firestore con fallback a valores hardcodeados
- Las colecciones se cargan dinámicamente desde Firestore
- El campo `hasResources` se puede actualizar desde el formulario, pero los recursos se gestionan en una página separada

