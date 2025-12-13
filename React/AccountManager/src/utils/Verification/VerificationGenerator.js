import { cifrarAtbash } from './AtbashCipher.js';
import { generarSaltCriptografico, comparacionSegura } from './CryptoUtils.js';
import masterKey from './masterKey.json' with { type: "json" };

const LONGITUD_BLOQUE = 8;
const VC_ALMACENADO_JSON = masterKey.StoredVerificationCode;

/**
 * 1. Pre-Verificación (Capa de Seguridad Externa)
 * Simula la validación de token de solicitud anti-bot.
 * @returns {boolean}
 */
export function validarAntigravity() {
    // Simulación: Devuelve true si la validación pasa.
    // En un sistema real, validaría headers, tokens de sesión, etc.
    return true;
}

/**
 * Extrae la secuencia de cabeceras de un código VC.
 * @param {string} codigoVC 
 * @returns {string} 
 */
export function extraerSecuenciaKV(codigoVC) {
    let secuencia = '';
    for (let i = 0; i < codigoVC.length; i += LONGITUD_BLOQUE) {
        if (i < codigoVC.length) {
            secuencia += codigoVC[i];
        }
    }
    return secuencia;
}

/**
 * 6. Generación de Token
 * @returns {string} Mock JWT
 */
function generarTokenAcceso() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock.token.sign";
}

/**
 * Función Principal: Autenticar Usuario
 * Orquesta todo el flujo de inicio de sesión.
 * @param {string} password 
 * @returns {Promise<{success: boolean, token?: string, error?: string}>}
 */
export async function autenticarUsuario(password) {
    console.group("🔐 INICIANDO PROCESO DE AUTENTICACIÓN");
    console.log(`1. Entrada de Usuario: "${password}"`);

    try {
        // 1. Pre-Verificación
        console.log("2. Verificando Antigravity...");
        if (!validarAntigravity()) {
            console.error("❌ Antigravity: BLOQUEADO (Bot detectado)");
            console.groupEnd();
            return { success: false, error: "Error de seguridad: Solicitud rechazada por Antigravity (Bot detectado)" };
        }
        console.log("✅ Antigravity: APROBADO");

        // 2. Preparación de la Clave Maestra (KV')
        const keyTentativa = cifrarAtbash(password);
        console.log(`3. Llave Tentativa (KV') [Atbash]: "${keyTentativa}"`);

        // 3. Generación del Código en Vivo (VC-LIVE)
        console.log("4. Generando Código en Vivo (VC-LIVE)...");
        let vcLive = '';
        for (let i = 0; i < keyTentativa.length; i++) {
            const char = keyTentativa[i];
            const salt = await generarSaltCriptografico(LONGITUD_BLOQUE - 1);
            // Opcional: Log por caracter si se desea mucho detalle, mejor solo el final.
            vcLive += char + salt;
        }
        console.log(`   -> VC-LIVE Generado: "${vcLive}"`);

        // 4. Extracción de Códigos
        console.log("5. Extrayendo Cabeceras para Comparación...");
        const headerStored = extraerSecuenciaKV(VC_ALMACENADO_JSON);
        const headerLive = extraerSecuenciaKV(vcLive);

        console.log(`   -> Cabecera Almacenada (DB): "${headerStored}"`);
        console.log(`   -> Cabecera en Vivo (Input): "${headerLive}"`);

        // 5. Verificación Final (Comparación de Tiempo Constante)
        console.log("6. Comparación Segura de Tiempo Constante...");
        const coinciden = comparacionSegura(headerStored, headerLive);

        // 6. Post-Verificación
        if (coinciden) {
            console.log("✅ RESULTADO: AUTENTICACIÓN EXITOSA");
            const token = generarTokenAcceso();
            console.log(`   -> Token Generado: ${token}`);
            console.groupEnd();
            return {
                success: true,
                token: token
            };
        } else {
            console.warn("❌ RESULTADO: FALLO DE AUTENTICACIÓN");
            console.groupEnd();
            return {
                success: false,
                error: "Credenciales inválidas"
            };
        }

    } catch (error) {
        console.error("⛔ Error crítico en autenticación:", error);
        console.groupEnd();
        return { success: false, error: "Error interno del servidor" };
    }
}

export const verificarContrasena = autenticarUsuario;
