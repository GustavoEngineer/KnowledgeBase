const LabelModel = require('../models/labelModel');

const labelController = {
    getAll: async (req, res) => {
        try {
            const labels = await LabelModel.getAllLabels();
            res.status(200).json(labels);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const label = await LabelModel.getLabelById(id);
            if (!label) return res.status(404).json({ message: 'Etiqueta no encontrada' });
            res.status(200).json(label);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const { name, importance_score } = req.body;
            
            // Validación estricta del Algoritmo OwlV1 (Pareto & Laborit)
            if (!name || !importance_score) {
                return res.status(400).json({ message: 'Nombre y Puntuación son obligatorios' });
            }
            if (importance_score < 1 || importance_score > 10) {
                return res.status(400).json({ message: 'El puntaje de importancia debe ser entre 1 y 10' });
            }

            const newLabel = await LabelModel.createLabel(req.body);
            res.status(201).json(newLabel);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { importance_score } = req.body;

            // Validación si se intenta actualizar el score
            if (importance_score && (importance_score < 1 || importance_score > 10)) {
                return res.status(400).json({ message: 'El puntaje de importancia debe ser entre 1 y 10' });
            }

            const updatedLabel = await LabelModel.updateLabel(id, req.body);
            if (!updatedLabel) return res.status(404).json({ message: 'Etiqueta no encontrada' });
            res.status(200).json(updatedLabel);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedLabel = await LabelModel.deleteLabel(id);
            if (!deletedLabel) return res.status(404).json({ message: 'Etiqueta no encontrada' });
            res.status(200).json({ message: 'Etiqueta eliminada', label: deletedLabel });
        } catch (error) {
            // Error común: intentar borrar una etiqueta que está siendo usada por tareas (Foreign Key constraint)
            if (error.code === '23503') { 
                return res.status(409).json({ message: 'No se puede borrar la etiqueta porque hay tareas asociadas a ella.' });
            }
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = labelController;