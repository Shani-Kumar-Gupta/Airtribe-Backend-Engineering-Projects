const tasksData = require('../../resource/tasks.json');

class TaskManagerValidator {
  static validateTaskRequestBody(requestBody) {
    let body = requestBody;
    let { taskId, title, description, completionStatus, priorityLevel } = body;
    if (
      taskId &&
      title &&
      description &&
      (completionStatus == true || completionStatus == false) &&
      priorityLevel
    ) {
      if (taskId && tasksData.tasks.some((task) => task.taskId === taskId)) {
        return {
          status: false,
          errorMessage:
            'Provided task id already exists. Please provide a unique task id.',
          statusCode: 403
        };
      }
      return {
        status: true,
      };
    } else {
      return {
        status: false,
        errorMessage: 'Request you send has something incorrect.',
        statusCode: 400
      };
    }
  }
}

module.exports = TaskManagerValidator;
