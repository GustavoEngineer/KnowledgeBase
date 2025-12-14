/**
 * Decrypts text using a Caesar cipher with a left shift.
 * @param {string} text - The text to decrypt.
 * @param {number} shift - The number of positions to shift left.
 * @returns {string} - The decrypted text.
 */
export const decryptCaesar = (text, shift) => {
    if (!text) return '';
    const s = shift % 26;
    let result = '';

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char.match(/[a-z]/i)) {
            const code = text.charCodeAt(i);

            // Uppercase letters
            if (code >= 65 && code <= 90) {
                let shiftedCode = code - s;
                if (shiftedCode < 65) {
                    shiftedCode += 26;
                }
                char = String.fromCharCode(shiftedCode);
            }
            // Lowercase letters
            else if (code >= 97 && code <= 122) {
                let shiftedCode = code - s;
                if (shiftedCode < 97) {
                    shiftedCode += 26;
                }
                char = String.fromCharCode(shiftedCode);
            }
        }
        result += char;
    }
    return result;
};
