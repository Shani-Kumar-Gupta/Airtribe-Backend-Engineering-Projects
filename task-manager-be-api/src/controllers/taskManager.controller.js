const tasksData = require('../resource/tasks.json');

function getTasks(req, res, next) {
  return res.status(200).send(tasksData);
}

function getByTaskId(req, res, next) { }

function createTask(req, res, next) { }

function updateTask(req, res, next) { }

function deleteTask(req, res, next) { }

module.exports = { getTasks, getByTaskId, createTask, updateTask, deleteTask };