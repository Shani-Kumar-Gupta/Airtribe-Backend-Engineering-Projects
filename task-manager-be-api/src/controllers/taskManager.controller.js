const { checkPriorityLevel } = require('../helpers');
const tasksData = require('../resource/tasks.json');
const { TaskManagerValidator } = require('../services');
const fs = require('fs');

function getTasks(req, res, next) {
  return res.status(200).send(tasksData);
}

function getByTaskId(req, res, next) {
  let taskId = req.params.taskId;
  let result = tasksData.tasks.filter((task) => task.taskId == taskId);
  if (result.length) {
    return res.status(200).send(result);
  } else {
    return res.status(404).send('Task not found');
  }
}

function createTask(req, res, next) {
  let body = req.body;
  let validationResult = TaskManagerValidator.validateTaskRequestBody(body);
  if (validationResult.status) {
    let task = {
      taskId: body.taskId,
      title: body.title,
      description: body.description,
      completionStatus: body.completionStatus,
      priorityLevel: body.priorityLevel,
    };
    let data = JSON.parse(JSON.stringify(tasksData));
    data.tasks.push(task);
    try {
      let finalTaskData = JSON.stringify(data);
      fs.writeFileSync('./src/resource/tasks.json', finalTaskData, {
        encoding: 'utf8',
        flag: 'w',
      });
      return res.status(200).json({
        status: 200,
        message: 'Task created successfully',
      });
    } catch (error) {
      console.log(`Encountered error while writing task: ${error}`);
    }
  } else {
    return res
      .status(validationResult.statusCode)
      .send(validationResult.errorMessage);
  }
}

function updateTask(req, res, next) {
  let taskId = req.params.taskId;
  let taskUpdateBody = req.body;
  let existingTasks = JSON.parse(JSON.stringify(tasksData));
  if (!existingTasks.tasks.some((task) => task.taskId == taskId)) {
    return res.status(404).json({
      status: 404,
      message: 'Provided task id does not exist.',
    });
  } else {
    try {
      let idx = existingTasks.tasks.findIndex((task) => task.taskId == taskId);
      existingTasks.tasks[idx] = {
        ...existingTasks.tasks[idx],
        ...taskUpdateBody,
      };
      let updatedTask = JSON.stringify(existingTasks);
      fs.writeFileSync('./src/resource/tasks.json', updatedTask, {
        encoding: 'utf8',
        flag: 'w',
      });
      return res.status(200).json({
        status: 200,
        message: 'Task updated successfully!',
      });
    } catch (error) {
      console.log(`Encountered error while writing task: ${error}`);
    }
  }
}

function deleteTask(req, res, next) {
  let taskId = req.params.taskId;
  let finalTaskData = JSON.parse(JSON.stringify(tasksData));
  if (!finalTaskData.tasks.some((task) => task.taskId == taskId)) {
    return res.status(404).json({
      status: 404,
      message: 'Provided task id does not exist.',
    });
  } else {
    try {
      let idx = finalTaskData.tasks.findIndex((task) => task.taskId == taskId);
      finalTaskData.tasks.splice(idx, 1);
      fs.writeFileSync(
        './src/resource/tasks.json',
        JSON.stringify(finalTaskData),
        {
          encoding: 'utf8',
          flag: 'w',
        }
      );
      return res.status(200).json({
        status: 200,
        message: 'Task deleted successfully!',
      });
    } catch (error) {
      console.log(`Encountered error while writing task: ${error}`);
    }
  }
}

function getTasksBasisPriority(req, res, next) {
  let priorityLevel = req.params.level;
  if (checkPriorityLevel(priorityLevel)) {
    let tasks = JSON.parse(JSON.stringify(tasksData));
    let filteredPriorityTasks = tasks.tasks.filter(
      (task) => task.priorityLevel?.toLowerCase() == priorityLevel.toLowerCase()
    );
    if (filteredPriorityTasks.length) {
      return res.status(200).json({
        status: 200,
        data: filteredPriorityTasks,
      });
    } else {
      return res.send(404).json({
        status: 404,
        message: `No tasks found for ${priorityLevel} priority.`,
      });
    }
  } else {
    return res.status(400).json({
      status: 400,
      message: 'Invalid priority level.',
    });
  }
}

module.exports = {
  getTasks,
  getByTaskId,
  createTask,
  updateTask,
  deleteTask,
  getTasksBasisPriority,
};
