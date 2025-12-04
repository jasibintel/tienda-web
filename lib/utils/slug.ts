/**
 * Utilidades para generar y validar slugs
 */

/**
 * Genera un slug desde un texto
 * @param text - Texto a convertir en slug
 * @returns Slug generado
 */
export function generateSlug(text: string): string {
    if (!text) return '';
    
    return text
        .toLowerCase()
        .trim()
        // Reemplazar espacios y caracteres especiales con guiones
        .replace(/[^\w\s-]/g, '') // Eliminar caracteres especiales
        .replace(/[\s_-]+/g, '-') // Reemplazar espacios, guiones bajos y múltiples guiones con un solo guion
        .replace(/^-+|-+$/g, ''); // Eliminar guiones al inicio y final
}

/**
 * Valida el formato de un slug
 * @param slug - Slug a validar
 * @returns true si el slug es válido
 */
export function validateSlug(slug: string): boolean {
    if (!slug) return false;
    
    // Un slug válido debe:
    // - Tener al menos 1 carácter
    // - Contener solo letras minúsculas, números y guiones
    // - No empezar ni terminar con guión
    // - No tener guiones consecutivos
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return slugRegex.test(slug) && slug.length >= 1 && slug.length <= 100;
}

/**
 * Normaliza un slug (limpia y valida)
 * @param slug - Slug a normalizar
 * @returns Slug normalizado o null si no es válido
 */
export function normalizeSlug(slug: string): string | null {
    const normalized = generateSlug(slug);
    return validateSlug(normalized) ? normalized : null;
}

