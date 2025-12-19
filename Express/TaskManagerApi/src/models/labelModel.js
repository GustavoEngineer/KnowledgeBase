const pool = require('../config/db');

const LabelModel = {
    // 1. Ver todas las etiquetas
    getAllLabels: async () => {
        const query = 'SELECT * FROM labels ORDER BY importance_score DESC'; // Ordenado por prioridad
        const { rows } = await pool.query(query);
        return rows;
    },

    // 2. Buscar por ID
    getLabelById: async (id) => {
        const query = 'SELECT * FROM labels WHERE label_id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    // 3. Crear Etiqueta
    createLabel: async (labelData) => {
        const { name, importance_score, is_synced } = labelData;
        
        // is_synced por defecto es false si no se envía
        const query = `
            INSERT INTO labels (name, importance_score, is_synced)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        // Aseguramos un booleano para is_synced
        const syncedValue = is_synced !== undefined ? is_synced : false;
        
        const { rows } = await pool.query(query, [name, importance_score, syncedValue]);
        return rows[0];
    },

    // 4. Actualizar Etiqueta
    updateLabel: async (id, labelData) => {
        const { name, importance_score, is_synced } = labelData;
        
        // Construir query dinámico solo con campos proporcionados
        const updates = [];
        const values = [];
        let paramIndex = 1;
        
        if (name !== undefined) {
            updates.push(`name = $${paramIndex}`);
            values.push(name);
            paramIndex++;
        }
        if (importance_score !== undefined) {
            updates.push(`importance_score = $${paramIndex}`);
            values.push(importance_score);
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
            UPDATE labels 
            SET ${updates.join(', ')}
            WHERE label_id = $${paramIndex}
        `;
        values.push(id);
        
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            return null; // No se actualizó ninguna fila
        }
        
        // Obtener la fila actualizada después de triggers
        const selectQuery = 'SELECT * FROM labels WHERE label_id = $1';
        const { rows } = await pool.query(selectQuery, [id]);
        return rows[0];
    },

    // 5. Borrar Etiqueta
    deleteLabel: async (id) => {
        const query = 'DELETE FROM labels WHERE label_id = $1 RETURNING *';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = LabelModel;