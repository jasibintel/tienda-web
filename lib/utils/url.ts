/**
 * Utilidades para validar URLs
 */

/**
 * Valida el formato de una URL
 * @param url - URL a validar
 * @returns true si la URL es válida
 */
export function validateUrl(url: string): boolean {
    if (!url || url.trim() === '') return false;
    
    try {
        const urlObj = new URL(url);
        // Verificar que tenga un protocolo válido (http o https)
        return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
        return false;
    }
}

/**
 * Valida si una URL es relativa o absoluta
 * @param url - URL a validar
 * @returns 'absolute' | 'relative' | 'invalid'
 */
export function getUrlType(url: string): 'absolute' | 'relative' | 'invalid' {
    if (!url || url.trim() === '') return 'invalid';
    
    // URL relativa (empieza con /)
    if (url.startsWith('/')) return 'relative';
    
    // Intentar validar como URL absoluta
    if (validateUrl(url)) return 'absolute';
    
    return 'invalid';
}

/**
 * Normaliza una URL (agrega https:// si falta el protocolo)
 * @param url - URL a normalizar
 * @returns URL normalizada o null si no es válida
 */
export function normalizeUrl(url: string): string | null {
    if (!url || url.trim() === '') return null;
    
    const trimmed = url.trim();
    
    // Si ya es una URL válida, retornarla
    if (validateUrl(trimmed)) return trimmed;
    
    // Si es relativa, retornarla tal cual
    if (trimmed.startsWith('/')) return trimmed;
    
    // Intentar agregar https://
    try {
        const withProtocol = `https://${trimmed}`;
        if (validateUrl(withProtocol)) return withProtocol;
    } catch {
        // No hacer nada
    }
    
    return null;
}

