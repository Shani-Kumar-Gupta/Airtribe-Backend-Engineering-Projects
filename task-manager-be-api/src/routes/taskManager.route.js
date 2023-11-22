const express = require('express');
const { taskManagerController } = require('../controllers');
const taskManagerRouter = express.Router();

/* GET all tasks */
taskManagerRouter.get('/tasks', taskManagerController.getTasks);

/* GET Task by Task ID */
taskManagerRouter.get('/tasks/:taskId', taskManagerController.getByTaskId);

/* Create Task */
taskManagerRouter.post('/tasks', taskManagerController.createTask);

/* Update Task by Task ID */
taskManagerRouter.put('/tasks/:taskId', taskManagerController.updateTask);

/* Delete Task by Task Id */
taskManagerRouter.delete('/tasks/:taskId', taskManagerController.deleteTask);

module.exports = taskManagerRouter;
