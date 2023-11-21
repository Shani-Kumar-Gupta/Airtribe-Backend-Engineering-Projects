const express = require('express');
const { taskManagerController } = require('../controllers');
const taskManagerRouter = express.Router();

/* GET all tasks */
taskManagerRouter.get('/tasks', taskManagerController.get);

module.exports = taskManagerRouter;