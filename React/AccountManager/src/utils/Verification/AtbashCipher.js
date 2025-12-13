/**
 * Cifra una cadena usando el cifrado Atbash.
 * Convierte caracteres de 'a' a 'z' en su opuesto ('a' -> 'Z', 'z' -> 'A').
 * Ignora cualquier caracter que no sea una letra minúscula.
 * 
 * @param {string} cadena - La cadena de entrada (se asume minúsculas).
 * @returns {string} - La cadena cifrada en mayúsculas.
 */
export function cifrarAtbash(cadena) {
    let resultado = '';

    for (let i = 0; i < cadena.length; i++) {
        const charCode = cadena.charCodeAt(i);

        // Verificar si es una letra minúscula ('a' = 97, 'z' = 122)
        if (charCode >= 97 && charCode <= 122) {
            // Calcular el desplazamiento desde 'a'
            const offset = charCode - 97;

            // Encontrar el carácter opuesto partiendo de 'Z' (90)
            // 'a' (offset 0) -> 'Z' (90)
            // 'z' (offset 25) -> 'A' (65)
            const nuevoChar = String.fromCharCode(90 - offset);

            resultado += nuevoChar;
        }
        // Si no es letra minúscula, se ignora
    }

    return resultado;
}
