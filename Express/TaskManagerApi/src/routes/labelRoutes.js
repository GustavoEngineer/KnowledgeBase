const express = require('express');
const router = express.Router();
const labelController = require('../controllers/labelController');

router.get('/', labelController.getAll);
router.get('/:id', labelController.getById);
router.post('/', labelController.create);
router.put('/:id', labelController.update);
router.delete('/:id', labelController.delete);

module.exports = router;