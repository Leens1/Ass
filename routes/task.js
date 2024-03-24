const express = require('express')

const router = express.Router();


const task_controller = require('../controllers/task')
router.get('/',task_controller.getAll)
router.get('/:id',task_controller.getById )
router.post('/',task_controller.create_ta)
router.put('/:id',task_controller.update_ta)
router.delete('/:id',task_controller.remove_ta)

module.exports = router