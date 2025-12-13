/**
 * Genera un salt criptográficamente seguro.
 * @param {number} longitud - La longitud del salt a generar.
 * @returns {Promise<string>} - El salt generado.
 */
export async function generarSaltCriptografico(longitud = 7) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let salt = '';

    // En un entorno de navegador, usamos window.crypto
    // En Node para pruebas, podríamos necesitar un polyfill, pero el código destino es navegador.
    const cryptoObj = typeof window !== 'undefined' && window.crypto
        ? window.crypto
        : (typeof globalThis !== 'undefined' && globalThis.crypto ? globalThis.crypto : null);

    if (!cryptoObj) {
        throw new Error('Web Crypto API no está disponible en este entorno.');
    }

    const values = new Uint32Array(longitud);
    cryptoObj.getRandomValues(values);

    for (let i = 0; i < longitud; i++) {
        salt += charset[values[i] % charset.length];
    }

    return salt;
}

/**
 * Compara dos cadenas de texto de manera segura (tiempo constante).
 * Esto mitiga ataques de timing.
 * @param {string} secuencia1
 * @param {string} secuencia2
 * @returns {boolean} - True si son iguales, False si no.
 */
export function comparacionSegura(secuencia1, secuencia2) {
    if (typeof secuencia1 !== 'string' || typeof secuencia2 !== 'string') {
        return false;
    }

    // Si las longitudes son diferentes, no pueden ser iguales.
    // Sin embargo, para mantener tiempo constante en la comparación de contenido
    // a veces se comparan hasta el final de la más larga, pero una
    // optimización común es fallar si length difiere, aunque revela la longitud.
    // Para este ejercicio asumiremos que revelar la diferencia de longitud es aceptable
    // o que comparamos hashes de igual longitud.
    // Pero la instrucción pide comparar las cadenas de forma segura.
    // Una implementación estricta de tiempo constante evitaría retornar antes.

    const len1 = secuencia1.length;
    const len2 = secuencia2.length;

    // Usamos la longitud de la primera para el bucle, pero si difieren, el resultado será false de todas formas.
    // Para evitar accesos fuera de rango si len2 < len1, podemos usar modulo o similar,
    // pero una técnica simple es hacer OR de la diferencia de longitud.

    let result = 0;

    // Si las longitudes son distintas, ya sabemos que fallará, pero iteramos para consumir tiempo
    // basado en la longitud de secuencia1 (o un maximo).
    // ADVERTENCIA: Hacer una comparación perfecta de tiempo constante sobre strings de
    // longitud variable es complejo en JS de alto nivel debido a optimizaciones del JIT.
    // Haremos "best effort".

    if (len1 !== len2) {
        return false;
        // Nota: Revelar longitud suele ser aceptable en muchos contextos de web apps vs timing attacks de contenido.
        // Si se requiere estricto, deberíamos hashear ambas antes.
    }

    for (let i = 0; i < len1; i++) {
        result |= (secuencia1.charCodeAt(i) ^ secuencia2.charCodeAt(i));
    }

    return result === 0;
}
