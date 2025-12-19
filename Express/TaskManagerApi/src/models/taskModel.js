const pool = require('../config/db');

const TaskModel = {
    getAllTasks: async () => {
        // Incluimos task_id explícitamente y datos de la etiqueta
        const query = `
            SELECT t.*, l.name as label_name, l.importance_score 
            FROM tasks t
            LEFT JOIN labels l ON t.label_id = l.label_id
            ORDER BY t.created_at DESC;
        `;
        const { rows } = await pool.query(query);
        return rows;
    },

    getTaskById: async (id) => {
        const query = 'SELECT * FROM tasks WHERE task_id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    createTask: async (taskData) => {
        const { title, description, due_date, estimated_time, label_id, is_synced } = taskData;
        
        const query = `
            INSERT INTO tasks (title, description, due_date, estimated_time, label_id, is_synced)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        // is_synced default false
        const syncedValue = is_synced !== undefined ? is_synced : false;
        
        const values = [title, description, due_date, estimated_time, label_id, syncedValue];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    updateTask: async (id, taskData) => {
        const { title, description, due_date, estimated_time, real_time, is_completed, label_id, is_synced } = taskData;
        
        // Construir query dinámico solo con campos proporcionados
        const updates = [];
        const values = [];
        let paramIndex = 1;
        
        if (title !== undefined) {
            updates.push(`title = $${paramIndex}`);
            values.push(title);
            paramIndex++;
        }
        if (description !== undefined) {
            updates.push(`description = $${paramIndex}`);
            values.push(description);
            paramIndex++;
        }
        if (due_date !== undefined) {
            updates.push(`due_date = $${paramIndex}`);
            values.push(due_date);
            paramIndex++;
        }
        if (estimated_time !== undefined) {
            updates.push(`estimated_time = $${paramIndex}`);
            values.push(estimated_time);
            paramIndex++;
        }
        if (real_time !== undefined) {
            updates.push(`real_time = $${paramIndex}`);
            values.push(real_time);
            paramIndex++;
        }
        if (is_completed !== undefined) {
            updates.push(`is_completed = $${paramIndex}`);
            values.push(is_completed);
            paramIndex++;
        }
        if (label_id !== undefined) {
            updates.push(`label_id = $${paramIndex}`);
            values.push(label_id);
            paramIndex++;
        }
        if (is_synced !== undefined) {
            updates.push(`is_synced = $${paramIndex}`);
            values.push(is_synced);
            paramIndex++;
        }
        
        if (updates.length === 0) {
            // No hay campos para actualizar
            return null;
        }
        
        const query = `
            UPDATE tasks 
            SET ${updates.join(', ')}
            WHERE task_id = $${paramIndex}
        `;
        values.push(id);
        
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            return null; // No se actualizó ninguna fila
        }
        
        // Obtener la fila actualizada después de triggers
        const selectQuery = 'SELECT * FROM tasks WHERE task_id = $1';
        const { rows } = await pool.query(selectQuery, [id]);
        return rows[0];
    },

    deleteTask: async (id) => {
        const query = 'DELETE FROM tasks WHERE task_id = $1 RETURNING *';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = TaskModel;