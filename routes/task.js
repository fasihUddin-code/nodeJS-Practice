const express = require("express");

const taskController = require('../controller/task');
const router = express.Router();

router
    .post('/',taskController.createTask)
    .get('/',taskController.getAllTasks)
    .get('/:name',taskController.getTask)
    .put('/:name',taskController.replaceTask)
    .patch('/:name',taskController.updateTask)
    .delete('/:name',taskController.deleteTask)

exports.router= router    