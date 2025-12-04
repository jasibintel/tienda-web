# Centro de Recursos para Libros

## ¿Qué es el Centro de Recursos?

El Centro de Recursos es un sistema que permite agregar contenido extra (videos, materiales adicionales) a libros específicos. Este contenido solo es accesible para usuarios que han adquirido el libro correspondiente y lo tienen en su biblioteca.

## Estructura de Datos en Firestore

### Colección `bookResources`

Cada documento en esta colección representa los recursos extra de un libro. El ID del documento es el mismo `bookId` del libro en la colección `books`.

**Campos del documento:**

- `bookId: string` - ID del libro (debe coincidir con el ID del documento)
- `introTitle: string` - Título de introducción del contenido extra
- `introText: string` - Texto introductorio (puede contener HTML básico)
- `sections: ResourceSection[]` - Array de secciones de contenido
- `isActive: boolean` - Si los recursos están activos y disponibles
- `createdAt: Timestamp` - Fecha de creación
- `updatedAt: Timestamp` - Fecha de última actualización

### Estructura de `ResourceSection`

Cada sección contiene:

- `id: string` - ID único de la sección
- `title: string` - Título de la sección
- `description?: string` - Descripción opcional de la sección
- `order: number` - Orden de visualización (menor número = aparece primero)
- `videos: ResourceVideo[]` - Array de videos en esta sección

### Estructura de `ResourceVideo`

Cada video contiene:

- `id: string` - ID único del video
- `title: string` - Título del video
- `url: string` - URL del video (YouTube, Vimeo, Nextcloud, etc.)
- `description?: string` - Nota o descripción opcional del video
- `duration?: string` - Duración opcional (ej: "15:30")
- `order: number` - Orden dentro de la sección (menor número = aparece primero)

## Verificación de Acceso

El acceso al Centro de Recursos se verifica en dos niveles:

1. **Autenticación**: El usuario debe estar autenticado (iniciado sesión).
2. **Propiedad del libro**: El usuario debe tener el libro en su biblioteca (`users/{userId}/library/{bookId}`).

La verificación se realiza en el frontend mediante la función `checkUserHasBook(userId, bookId)`, que consulta la subcolección `library` del usuario.

**Nota**: Actualmente la verificación es solo en el frontend. Las reglas de Firestore permiten lectura pública de `bookResources` para verificar si existe, pero se puede agregar seguridad adicional en el futuro.

## Integración con Mi Biblioteca

En la página "Mi Biblioteca" (`/mi-biblioteca`):

1. Para cada libro en la biblioteca del usuario, se verifica si tiene recursos disponibles usando `checkBookHasResources(bookId)`.
2. Si el libro tiene recursos, se muestra un botón "Ver contenido extra" en la tarjeta del libro.
3. Al hacer clic en este botón, el usuario es redirigido a `/mi-biblioteca/[bookId]/recursos`.

## Ruta de la Página de Recursos

La página de recursos está disponible en:

```
/mi-biblioteca/[bookId]/recursos
```

Donde `[bookId]` es el ID del libro.

## Cómo Agregar Recursos Manualmente desde Firebase Console

### Paso 1: Crear el documento

1. Ve a Firebase Console > Firestore Database
2. Crea una nueva colección llamada `bookResources` (si no existe)
3. Crea un nuevo documento con el ID igual al `bookId` del libro

### Paso 2: Estructura del documento

Ejemplo de estructura JSON para el documento:

```json
{
  "bookId": "libro-001",
  "introTitle": "Bienvenido al Centro de Recursos",
  "introText": "Este contenido adicional te ayudará a profundizar en los temas del libro...",
  "isActive": true,
  "sections": [
    {
      "id": "seccion-1",
      "title": "Videos de Introducción",
      "description": "Videos que te ayudarán a entender mejor los conceptos básicos",
      "order": 1,
      "videos": [
        {
          "id": "video-1",
          "title": "Introducción al libro",
          "url": "https://www.youtube.com/watch?v=VIDEO_ID",
          "description": "Una introducción general a los temas principales",
          "duration": "10:30",
          "order": 1
        },
        {
          "id": "video-2",
          "title": "Cómo usar este material",
          "url": "https://www.youtube.com/watch?v=VIDEO_ID_2",
          "description": "Guía rápida para aprovechar al máximo el contenido",
          "duration": "5:15",
          "order": 2
        }
      ]
    },
    {
      "id": "seccion-2",
      "title": "Estudios Bíblicos",
      "description": "Videos de estudio bíblico complementarios",
      "order": 2,
      "videos": [
        {
          "id": "video-3",
          "title": "Estudio bíblico - Capítulo 1",
          "url": "https://vimeo.com/VIDEO_ID",
          "description": "Análisis detallado del primer capítulo",
          "duration": "25:00",
          "order": 1
        }
      ]
    }
  ],
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

### Paso 3: Campos importantes

- **`bookId`**: Debe coincidir exactamente con el ID del libro en la colección `books`
- **`isActive`**: Debe ser `true` para que los recursos sean visibles
- **`order`** en secciones y videos: Controla el orden de visualización (menor = primero)
- **`url`** de videos: Puede ser:
  - YouTube: `https://www.youtube.com/watch?v=VIDEO_ID` o `https://youtu.be/VIDEO_ID`
  - Vimeo: `https://vimeo.com/VIDEO_ID`
  - Otras plataformas: Se mostrará como enlace directo

## Soporte de Videos

El sistema soporta automáticamente:

- **YouTube**: Se detecta y muestra como embed
- **Vimeo**: Se detecta y muestra como embed
- **Otras plataformas**: Se muestran como enlace directo que abre en nueva pestaña

## Campo `hasResources` en Book

Opcionalmente, se puede agregar el campo `hasResources: boolean` al documento del libro en la colección `books` para indicar explícitamente que tiene contenido extra. Sin embargo, el sistema también verifica automáticamente si existe un documento en `bookResources` con ese `bookId`.

## Reglas de Firestore

Las reglas actuales para `bookResources`:

- **Lectura**: Pública (cualquiera puede leer para verificar si existe)
- **Escritura**: Solo administradores (usuarios con `admin: true` en sus custom claims)

Esto permite que el frontend verifique si un libro tiene recursos sin necesidad de autenticación, pero solo los administradores pueden crear o modificar recursos.

## Flujo Completo

1. Usuario compra un libro → Se agrega a `users/{userId}/library/{bookId}`
2. Usuario va a "Mi Biblioteca" → Se verifica si cada libro tiene recursos
3. Si tiene recursos → Se muestra botón "Ver contenido extra"
4. Usuario hace clic → Se redirige a `/mi-biblioteca/[bookId]/recursos`
5. La página verifica:
   - ¿Está autenticado? → Si no, muestra mensaje de acceso denegado
   - ¿Tiene el libro? → Si no, muestra mensaje de acceso denegado
   - Si tiene acceso → Muestra el contenido completo

## Notas de Implementación

- La verificación de acceso es principalmente en el frontend por ahora
- Los videos se ordenan automáticamente por el campo `order`
- El diseño es responsive y se adapta a móvil y escritorio
- Se reutilizan componentes y estilos existentes del proyecto para mantener consistencia visual

