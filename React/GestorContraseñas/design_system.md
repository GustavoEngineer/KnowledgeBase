# Sistema de Diseño - Gestor de Contraseñas (Kiora Layout)

Este documento define la guía de estilos visuales para mantener la consistencia en toda la aplicación.

## 1. Tipografía

La aplicación utiliza un esquema de fuentes "Cyberpunk/Sci-Fi".

*   **Fuente Principal (UI):** `Rajdhani` (Google Fonts)
    *   Uso: Títulos, etiquetas, botones, texto general.
    *   Variable CSS: `--hud-font-main`
    *   Pesos: 400, 600, 700
*   **Fuente Monoespaciada (Datos):** `Share Tech Mono` (Google Fonts)
    *   Uso: Valores numéricos, códigos, datos técnicos, IDs.
    *   Variable CSS: `--hud-font-mono`

## 2. Paleta de Colores

El tema es oscuro con acentos de neón violeta.

| Variable CSS | Valor Hex/RGBA | Descripción |
| :--- | :--- | :--- |
| `--hud-primary` | `#b366ff` | Color principal (Violeta Neón). Bordes, texto, iconos. |
| `--hud-dark` | `#0a0a0a` | Fondo principal (Casi negro). |
| `--hud-grid` | `rgba(179, 102, 255, 0.05)` | Líneas de la cuadrícula de fondo. |
| `--hud-glow` | `0 0 10px rgba(179, 102, 255, 0.2)` | Efecto de resplandor suave. |

### Otros Colores (Derivados)
*   **Danger/Alerta**: `#b366ff` con text-shadow agresivo.
*   **Scrollbar Track**: `#111`
*   **Hover Background**: `rgba(255, 255, 255, 0.1)`

## 3. Elementos Visuales y UI

### Fondo (Grid)
El fondo tiene un patrón de cuadrícula generado por CSS:
```css
background-image:
    linear-gradient(var(--hud-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--hud-grid) 1px, transparent 1px);
background-size: 40px 40px;
```

### Botones (`.hud-button`)
Estilo "wireframe" que se llena al pasar el mouse.
*   **Normal**: Fondo transparente, borde sólido color primario, texto color primario.
*   **Hover**: Fondo color primario, texto negro, sombra (glow) intensa.
*   **Transición**: `all 0.2s`

### Paneles (`.hud-header`, `.detail-panel`)
*   **Bordes**: `1px` o `2px` sólido color primario.
*   **Fondos**: Semitransparentes (`rgba(0,0,0,0.5)` o `rgba(0,0,0,0.3)`).
*   **Z-Index**: Los paneles flotantes usan `z-index: 10`.

### Textos y Títulos
*   **Headings (h1-h6)**: Transformación `uppercase`, `letter-spacing: 2px`.
*   **Valores Hud**: Fuente monoespaciada, mayor tamaño, negrita.

## 4. Animaciones

Se utilizan animaciones CSS para dar vida a la interfaz.

*   `spin`: Rotación infinita (usado en `.hud-gauge-circle`).
*   `pulse`: Variación de opacidad (usado en placeholders).
*   `slideInLeft`: Entrada desde la izquierda (usado en paneles laterales).
*   `fadeIn`: Aparición suave con escala (usado en contenido de detalles).

## 5. Snippets Comunes

### Contenedor Principal (HUD)
```css
.lockbox-container {
    background-color: transparent; /* Permite ver el grid global */
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
```

### Efecto de Resplandor (Texto)
```css
text-shadow: 0 0 10px var(--hud-primary);
```

### Scrollbar Personalizado
Barra de 8px con "thumb" del color primario.
