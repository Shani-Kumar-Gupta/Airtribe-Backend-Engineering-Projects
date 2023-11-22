const tasksData = require('../resource/tasks.json');

function getTasks(req, res, next) {
  return res.status(200).send(tasksData);
}

function getByTaskId(req, res, next) {
  let taskId = req.params.taskId;
  let result = tasksData.tasks.filter(task => task.taskId == taskId);
  if (result.length) {
    return res.status(200).send(result);
  } else {
    return res.status(404).send('Task not found');
  }
}

function createTask(req, res, next) { }

function updateTask(req, res, next) { }

function deleteTask(req, res, next) { }

module.exports = { getTasks, getByTaskId, createTask, updateTask, deleteTask };