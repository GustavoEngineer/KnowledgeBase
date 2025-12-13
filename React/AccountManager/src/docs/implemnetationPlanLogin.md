# Plan de Implementación: Esquema Atbash/Intercalado con Antigravity

Este documento detalla el mecanismo de seguridad y autenticación diseñado para el **AccountManager**. El sistema utiliza un esquema de cifrado personalizado (Atbash + Salt Intercalado) protegido por una capa de verificación de bots ("Antigravity").

> [!IMPORTANT]
> A efectos de este proyecto (React Frontend), las funciones de "Backend" descritas aquí se implementarán en `src/utils/security.js` o simuladas localmente hasta que exista un servidor real.

---

## Fase 1: Fundamentos Criptográficos y de Datos

El objetivo es establecer cómo se procesa y almacena la "Llave Maestra" (Master Key) para evitar guardar texto plano.

### 1. Definición del Estándar de Salt Intercalado
- **Función `generarSalt()`**:
    - Debe crear una cadena aleatoria de **7 caracteres** (A-Z, a-z, 0-9).
    - Uso de `crypto.getRandomValues()` (Web Crypto API) para seguridad criptográfica en el navegador.
- **Longitud de Bloque**: 
    - 1 Carácter de la Llave (Cifrado) + 7 Caracteres de Salt = **8 Caracteres por Bloque**.

### 2. Función de Cifrado Atbash
- **Función `cifrarAtbash(caracter)`**:
    - Toma un carácter de la contraseña original.
    - Devuelve su opuesto en el alfabeto (A ↔ Z, B ↔ Y, etc.).
    - *Nota*: Se debe definir un alfabeto fijo soportado.

### 3. Implementación del Esquema de Registro (Generación del Token)
La función clave `generarVC(password)` ejecutará el siguiente flujo:
1. **Cifrado Base**: Convierte la `password` a su versión "Llave de Verificación Oculta" (KV) usando Atbash.
2. **Obfuscación (Intercalado)**:
    - Recorre cada letra de la KV.
    - Genera un nuevo SALT (7 chars) para cada letra.
    - Concatena `[LetraKV] + [Salt]` para formar un bloque.
3. **Resultado**: Devuelve el **Código de Verificación (VC)** completo (una cadena larga).

### 4. Modelo de Datos
En la base de datos (o almacenamiento local para la demo), solo se guarda:
- `userID`
- `username`
- `VC_Almacenado` (El string largo generado en el paso 3).
> [!WARNING]
> NUNCA almacenar la contraseña original ni la KV simple.

---

## Fase 2: Integración de Antigravity y Autenticación

Integración de la capa de seguridad en el flujo de inicio de sesión (`LandingPage.jsx`).

### 5. Integración del Componente Antigravity (Frontend)
- **Objetivo**: Evitar ataques de fuerza bruta automatizados.
- **Flujo**:
    1. Usuario ingresa su Llave Maestra.
    2. Antes de procesar, se invoca `Antigravity` (ej. lógica de detección de comportamiento humano o CAPTCHA invisible).
    3. Si pasa, se genera un `token_antigravity`.

### 6. Verificación de Inicio de Sesión
La función de validación `login(password_ingresada)` sigue estos pasos:

1. **Paso A (Antigravity)**: Validar que el usuario no es un bot.
2. **Paso B (Recuperación)**: Obtener el `VC_Almacenado` del usuario.
3. **Paso C (Verificación de Estructura - `validarVC`)**:
    - Generar `KV_Attempt` (Atbash de la `password_ingresada`).
    - Recorrer el `VC_Almacenado` leyendo bloques de 8 caracteres.
    - **Validación Posicional**: Extraer el **primer carácter** de cada bloque (el real) y compararlo con el carácter correspondiente de `KV_Attempt`.
    - Ignorar los 7 caracteres de Salt de cada bloque.
4. **Resultado**:
    - Si todos los caracteres coinciden secuencialmente → **Acceso Concedido**.
    - Si falla → **Acceso Denegado**.

---

## Fase 3: Robustez y Seguridad

### 7. Protección contra Ataques de Timing
Al comparar la contraseña ingresada con el hash almacenado:
- No detenerse en el primer error.
- Usar una comparación de tiempo constate si es posible, o simular un retraso uniforme para evitar que un atacante adivine letra por letra basándose en el tiempo de respuesta.

### 8. Gestión de Errores
- Mensajes genéricos: "Credenciales inválidas". No especificar si falló el usuario, la llave o el token.

### 9. Pruebas Unitarias
- Crear tests para `generarVC` y `validarVC` asegurando que:
    - `generarVC` siempre produce cadenas de longitud `(len(pass) * 8)`.
    - `validarVC` acepta la contraseña correcta y rechaza incorrectas.