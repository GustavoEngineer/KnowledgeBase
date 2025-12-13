# Guía Maestra de React para Desarrollo Asistido por IA

Este documento establece el marco de referencia esencial para el desarrollo de aplicaciones React. Su propósito es definir los principios, la estructura y las prácticas que la IA debe seguir para producir código de alta calidad, escalable y mantenible.

## I. Principios Fundamentales y Paradigma

### 1. React y su Enfoque Declarativo

- **Definición:** React es una biblioteca (Library) de JavaScript, no un framework, dedicada a construir interfaces de usuario (UI).
- **Paradigma Declarativo:** Es la base de nuestro trabajo. En lugar de escribir instrucciones paso a paso (Imperativo) para modificar la UI, definimos cómo debe verse la UI en función de los datos (el estado) actuales. React se encarga de realizar los cambios eficientemente.
- **Estructura de Componentes:** Toda la UI se construye a partir de pequeñas piezas independientes y reutilizables llamadas Componentes.

### 2. El Flujo de Trabajo de Rendimiento

Para garantizar la velocidad y la eficiencia, es fundamental entender el flujo de trabajo de renderizado de React:

- **DOM Virtual (VDOM):** Es una representación ligera, en memoria, del DOM real del navegador. Las actualizaciones iniciales siempre ocurren aquí.
- **Diffing:** Cuando el estado de un componente cambia, React:
    1. Genera un nuevo Árbol del DOM Virtual.
    2. Compara (hace diff) el nuevo árbol con el anterior.
    3. Identifica los nodos exactos que han cambiado.
- **Actualización del DOM Real:** React solo aplica los cambios mínimos y necesarios al DOM real del navegador, lo que optimiza drásticamente el rendimiento y evita manipulaciones directas lentas.

## II. Sintaxis y Convenciones de Codificación (JSX)

### 3. JSX: El Lenguaje de la Vista

JSX (JavaScript XML) es una extensión de sintaxis que permite incrustar HTML dentro de JavaScript. Es la manera en que describimos la apariencia de un componente.

- **Reglas de Incrustación:** Las expresiones de JavaScript (variables, funciones, cálculos) deben estar envueltas en llaves `{}`.

### 4. Convenciones de Nombres y Atributos

React utiliza convenciones de JavaScript para los atributos, lo cual es la principal diferencia con HTML puro.

- **Clases CSS:** Usar `className` en lugar de `class`.
- **Eventos y Propiedades:** Todos los atributos y handlers de eventos (ej. `onclick`, `onchange`) deben escribirse en camelCase (ej. `onClick`, `onChange`).
- **Etiquetas en Formularios:** Usar `htmlFor` en lugar de `for` para asociar etiquetas con entradas.
- **Nombres de Componentes:** Siempre utilizar PascalCase (ej. `MiBotonPrimario`).

## III. Flujo de Datos y El Estado de la Aplicación

### 5. Props (Propiedades)

- **Propósito:** La única manera de pasar datos del componente Padre al Hijo.
- **Inmutabilidad:** Las props son objetos de solo lectura. El hijo no puede, bajo ninguna circunstancia, modificar las props que recibe. Si necesita un dato variable, debe usar su propio estado.
- **Tipos:** Se pueden pasar cadenas, números, objetos, arrays y hasta funciones (para comunicación Hijo -> Padre) como props.

### 6. Estado (State) y el Hook useState

- **Propósito:** Administrar datos que son internos al componente y que cambiarán con el tiempo (haciendo interactiva la UI).
- **Hook:** El principal mecanismo para agregar estado a un componente funcional es el Hook `useState`.
- **Estructura:** `const [nombreVariable, setNombreVariable] = useState(valorInicial);`
- **Inmutabilidad del Estado:** Es una práctica fundamental de calidad. Cuando se actualiza el estado:
    - **NO se muta:** Nunca se modifica el objeto de estado directamente (ej. `estado.propiedad = nuevoValor`).
    - **SE reemplaza:** Siempre se utiliza la función setter (ej. `setNombreVariable`) con un objeto o array completamente nuevo que contenga los cambios.

## IV. Estructura de Proyecto Simplificada (Base)

Para proyectos que no requieren conexión inmediata a API o bases de datos externas, adoptaremos una arquitectura enfocada en la lógica de UI y la reutilización.

### Árbol de Directorios Base

El código debe estar organizado en módulos para garantizar la separación de preocupaciones:

```plaintext
/src
├── components/           # Componentes de Presentación (UI)
│   ├── common/           # - Elementos atómicos: Button, Input, Icon.
│   └── layout/           # - Estructura de la página: Header, Footer, Sidebar.
├── hooks/                # Lógica Reutilizable (Custom Hooks)
│   └── useValidation.js  # - Ejemplo: Lógica de validación de formularios.
├── pages/                # Componentes Contenedores (Lógica de Vista/Rutas)
│   ├── Dashboard.jsx
│   └── UserProfile.jsx
├── utils/                # Funciones auxiliares genéricas
│   └── formatter.js      # - Ejemplo: Formato de fechas o monedas.
└── App.jsx               # Punto de entrada y enrutamiento
```

### Flujo de Responsabilidad

- **`pages/` (Contenedor):** Contiene la lógica del negocio de la vista. Utiliza `useState` y llama a `hooks/` para gestionar el estado de la página. Pasa los datos a sus hijos.
- **`components/` (Presentación):** Se enfoca puramente en el diseño. Solo recibe datos mediante props y no debe tener estado que no sea puramente visual (ej. si un tooltip está visible).
- **`hooks/`:** Abstrae lógica compleja que puede ser usada por múltiples contenedores en `pages/`.

## V. Calidad del Software y Optimización

### 7. Buenas Prácticas y Escalabilidad

- **Single Responsibility Principle (SRP):** Cada componente (o Hook) debe hacer una sola cosa y hacerla bien. Si un componente es demasiado complejo, divídelo.
- **Listas con `key`:** Siempre se debe proporcionar la prop `key` única y estable a los elementos al renderizar listas (`map`). Esto permite al algoritmo de Diffing identificar correctamente los elementos.
- **Código Limpio:** Documentar funciones complejas, pero mantener el código lo suficientemente legible para que la documentación sea mínima.

### 8. Optimización (Evitar Re-renders Innecesarios)

Para optimizar el rendimiento y evitar que los componentes se vuelvan a dibujar cuando sus props o su estado no han cambiado, se deben usar los siguientes Hooks de memorización:

- **`React.memo`:** Se usa para envolver un componente funcional. React solo lo volverá a renderizar si sus props han cambiado superficialmente.
- **`useCallback`:** Se usa para memorizar funciones que se pasan a componentes hijos. Esto asegura que el componente hijo (que usa `React.memo`) no se vuelva a renderizar solo porque la función se recreó en el padre.
- **`useMemo`:** Se usa para memorizar valores de cómputo costosos. Solo se recalculará si una de sus dependencias cambia.

### 9. Seguridad (XSS)

- **Defensa por Defecto:** Gracias a la sanitización automática de JSX, el riesgo de inyección XSS es bajo.
- **Mejora de Seguridad:** La seguridad real reside en la validación estricta de datos en el backend. En el frontend, se debe evitar a toda costa usar la propiedad `dangerouslySetInnerHTML`. Si el uso es inevitable, el contenido debe ser previamente sanitizado con una librería probada.
