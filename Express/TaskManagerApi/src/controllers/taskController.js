const TaskModel = require('../models/taskModel');

const taskController = {
    // GET /api/tasks
    getAll: async (req, res) => {
        try {
            const tasks = await TaskModel.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // GET /api/tasks/:id
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const task = await TaskModel.getTaskById(id);
            
            if (!task) {
                return res.status(404).json({ message: 'Tarea no encontrada' });
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // POST /api/tasks
    create: async (req, res) => {
        try {
            const { title, estimated_time, label_id } = req.body;

            // Validación: Ley de Parkinson requiere Título y Tiempo Estimado (Bloque de Foco)
            if (!title || !estimated_time) {
                return res.status(400).json({ 
                    message: 'El título y el tiempo estimado son obligatorios.' 
                });
            }

            // Nota: is_synced se maneja en el modelo (default false si no se envía)
            const newTask = await TaskModel.createTask(req.body);
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // PUT /api/tasks/:id
    update: async (req, res) => {
        try {
            const { id } = req.params;
            // Extraemos campos permitidos para actualización
            const { 
                title, description, due_date, estimated_time, 
                real_time, is_completed, label_id, is_synced 
            } = req.body;

            // Verificamos si la tarea existe antes de intentar actualizar
            // (Opcional, pero buena práctica si el update no retorna error en caso de 0 filas)
            const updatedTask = await TaskModel.updateTask(id, req.body);

            if (!updatedTask) {
                return res.status(404).json({ message: 'Tarea no encontrada para actualizar' });
            }

            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // DELETE /api/tasks/:id
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedTask = await TaskModel.deleteTask(id);
            
            if (!deletedTask) {
                return res.status(404).json({ message: 'Tarea no encontrada para eliminar' });
            }

            res.status(200).json({ 
                message: 'Tarea eliminada correctamente', 
                task: deletedTask 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = taskController;