# TaskManager API - Endpoints para Postman

Esta documentación contiene todos los endpoints disponibles en la API de TaskManager para pruebas en Postman.

**Base URL:** `http://localhost:3000/api/`

## Tasks (Tareas)

### 1. Obtener todas las tareas
- **Método:** GET
- **Endpoint:** `/tasks`
- **Descripción:** Devuelve una lista de todas las tareas con información de sus etiquetas asociadas.
- **Ejemplo de respuesta:**
  ```json
  [
    {
      "task_id": 1,
      "title": "Completar proyecto",
      "description": "Finalizar el desarrollo del módulo de autenticación",
      "due_date": "2025-12-31",
      "estimated_time": 120,
      "real_time": null,
      "is_completed": false,
      "label_id": 1,
      "is_synced": false,
      "created_at": "2025-12-19T10:00:00.000Z",
      "label_name": "Trabajo",
      "importance_score": 8
    }
  ]
  ```

### 2. Obtener tarea por ID
- **Método:** GET
- **Endpoint:** `/tasks/:id`
- **Descripción:** Devuelve una tarea específica por su ID.
- **Parámetros:** `id` (número) - ID de la tarea
- **Ejemplo:** `/tasks/1`

### 3. Crear nueva tarea
- **Método:** POST
- **Endpoint:** `/tasks`
- **Descripción:** Crea una nueva tarea.
- **Campos obligatorios:** `title`, `estimated_time`
- **Ejemplo de body (JSON):**
  ```json
  {
    "title": "Nueva tarea",
    "description": "Descripción de la tarea",
    "due_date": "2025-12-31",
    "estimated_time": 60,
    "label_id": 1,
    "is_synced": false
  }
  ```

### 4. Actualizar tarea
- **Método:** PUT
- **Endpoint:** `/tasks/:id`
- **Descripción:** Actualiza una tarea existente. **Soporta actualizaciones parciales** - solo envía los campos que quieres modificar.
- **Parámetros:** `id` (número) - ID de la tarea
- **Ejemplo de body (JSON) - Actualización parcial:**
  ```json
  {
    "real_time": 85,
    "is_completed": true,
    "is_synced": true
  }
  ```
- **Ejemplo de body (JSON) - Actualización completa:**
  ```json
  {
    "title": "Tarea actualizada",
    "description": "Descripción actualizada",
    "due_date": "2025-12-31",
    "estimated_time": 90,
    "real_time": 85,
    "is_completed": true,
    "label_id": 2,
    "is_synced": true
  }
  ```

### 5. Eliminar tarea
- **Método:** DELETE
- **Endpoint:** `/tasks/:id`
- **Descripción:** Elimina una tarea por su ID.
- **Parámetros:** `id` (número) - ID de la tarea

## Labels (Etiquetas)

### 1. Obtener todas las etiquetas
- **Método:** GET
- **Endpoint:** `/labels`
- **Descripción:** Devuelve una lista de todas las etiquetas ordenadas por importancia.
- **Ejemplo de respuesta:**
  ```json
  [
    {
      "label_id": 1,
      "name": "Trabajo",
      "importance_score": 8,
      "is_synced": false,
      "created_at": "2025-12-19T10:00:00.000Z"
    }
  ]
  ```

### 2. Obtener etiqueta por ID
- **Método:** GET
- **Endpoint:** `/labels/:id`
- **Descripción:** Devuelve una etiqueta específica por su ID.
- **Parámetros:** `id` (número) - ID de la etiqueta
- **Ejemplo:** `/labels/1`

### 3. Crear nueva etiqueta
- **Método:** POST
- **Endpoint:** `/labels`
- **Descripción:** Crea una nueva etiqueta.
- **Campos obligatorios:** `name`, `importance_score` (1-10)
- **Ejemplo de body (JSON):**
  ```json
  {
    "name": "Personal",
    "importance_score": 5,
    "is_synced": false
  }
  ```

### 4. Actualizar etiqueta
- **Método:** PUT
- **Endpoint:** `/labels/:id`
- **Descripción:** Actualiza una etiqueta existente. **Soporta actualizaciones parciales** - solo envía los campos que quieres modificar.
- **Parámetros:** `id` (número) - ID de la etiqueta
- **Ejemplo de body (JSON) - Actualización parcial:**
  ```json
  {
    "importance_score": 7,
    "is_synced": true
  }
  ```
- **Ejemplo de body (JSON) - Actualización completa:**
  ```json
  {
    "name": "Personal Actualizado",
    "importance_score": 7,
    "is_synced": true
  }
  ```

### 5. Eliminar etiqueta
- **Método:** DELETE
- **Endpoint:** `/labels/:id`
- **Descripción:** Elimina una etiqueta por su ID. No se puede eliminar si hay tareas asociadas.
- **Parámetros:** `id` (número) - ID de la etiqueta

## Notas para Postman

1. **Headers:** Para requests POST y PUT, incluir `Content-Type: application/json`
2. **Base URL:** Asegurarse de que la aplicación esté corriendo en `http://localhost:3000`
3. **Validaciones:**
   - Tasks: `title` y `estimated_time` son obligatorios para crear
   - Labels: `name` e `importance_score` (1-10) son obligatorios para crear
   - No se pueden eliminar labels que tengan tasks asociadas

## Ejemplos de uso en Postman

1. Crear una colección llamada "TaskManager API"
2. Crear requests para cada endpoint
3. Configurar variables de entorno si es necesario (ej: base_url = http://localhost:3000/api)
4. Probar primero los GET para ver datos existentes, luego crear nuevos registros