const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Definición de rutas para Tareas (Tasks)

// GET /api/tasks -> Obtener todas las tareas
router.get('/', taskController.getAll);

// GET /api/tasks/:id -> Obtener una tarea por ID
router.get('/:id', taskController.getById);

// POST /api/tasks -> Crear una nueva tarea
router.post('/', taskController.create);

// PUT /api/tasks/:id -> Actualizar una tarea existente
router.put('/:id', taskController.update);

// DELETE /api/tasks/:id -> Eliminar una tarea
router.delete('/:id', taskController.delete);

module.exports = router;