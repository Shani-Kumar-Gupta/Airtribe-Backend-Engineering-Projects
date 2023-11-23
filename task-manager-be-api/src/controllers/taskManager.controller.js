const { checkPriorityLevel } = require('../helpers');
const tasksData = require('../resource/tasks.json');
const { TaskManagerValidator } = require('../services');
const fs = require('fs');

function getTasks(req, res, next) {
  try {
    let filter = req.query.completionStatus;
    let sortBy = req.query.sortBy;
    if (filter == 'true' || filter == 'false') {
      let taskArr = JSON.parse(JSON.stringify(tasksData));
      let filteredTaskBasisCompletionStatus = taskArr.tasks.filter(
        (task) => task.completionStatus?.toString() == filter
      );
      if (filteredTaskBasisCompletionStatus.length) {
        return res.status(200).send(filteredTaskBasisCompletionStatus);
      } else {
        return res
          .status(404)
          .send(`No tasks found basis completion status: ${filter}`);
      }
    } else {
      return res.status(200).send(tasksData);
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error!',
      error: error,
    });
  }
}

function getByTaskId(req, res, next) {
  try {
    let taskId = req.params.taskId;
    let result = tasksData.tasks.filter((task) => task.taskId == taskId);
    if (result.length) {
      return res.status(200).send(result);
    } else {
      return res.status(404).send('Task not found');
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error!',
      error: error,
    });
  }
}

function createTask(req, res, next) {
  try {
    let body = req.body;
    let validationResult = TaskManagerValidator.validateTaskRequestBody(body);
    if (validationResult.status) {
      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      const formattedToday = dd + '/' + mm + '/' + yyyy;

      let task = {
        taskId: body.taskId,
        title: body.title,
        description: body.description,
        completionStatus: body.completionStatus,
        priorityLevel: body.priorityLevel,
        createdAt: formattedToday
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
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error!',
      error: error,
    });
  }
}

function updateTask(req, res, next) {
  try {
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
        let idx = existingTasks.tasks.findIndex(
          (task) => task.taskId == taskId
        );
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
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error!',
      error: error,
    });
  }
}

function deleteTask(req, res, next) {
  try {
    let taskId = req.params.taskId;
    let finalTaskData = JSON.parse(JSON.stringify(tasksData));
    if (!finalTaskData.tasks.some((task) => task.taskId == taskId)) {
      return res.status(404).json({
        status: 404,
        message: 'Provided task id does not exist.',
      });
    } else {
      try {
        let idx = finalTaskData.tasks.findIndex(
          (task) => task.taskId == taskId
        );
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
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error!',
      error: error,
    });
  }
}

function getTasksBasisPriority(req, res, next) {
  try {
    let priorityLevel = req.params.level;
    if (checkPriorityLevel(priorityLevel)) {
      let tasks = JSON.parse(JSON.stringify(tasksData));
      let filteredPriorityTasks = tasks.tasks.filter(
        (task) =>
          task.priorityLevel?.toLowerCase() == priorityLevel.toLowerCase()
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
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error!',
      error: error,
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
