# Airtribe Backend Engineering: Task Manager API Projects
## Objective
Build a RESTful API for a simple task manager application.

## Project Description:

In this project, we will create a RESTful API using Node.js, Express.js, and NPM packages. The API will allow users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. The tasks should have a title, description, and a flag for completion status. The API should be tested using Postman or Curl.

Set up a basic Node.js project with Express.js and other necessary NPM packages.

Implement a RESTful API with the following endpoints:

* GET /tasks: Retrieve all tasks.
* GET /tasks/:id: Retrieve a single task by its ID.
* GET /tasks/priority/:level: Retrieve task(s) by its priority level
* POST /tasks: Create a new task.
* PUT /tasks/:id: Update an existing task by its ID.
* DELETE /tasks/:id: Delete a task by its ID.

1. Use an in-memory data store (e.g., an array) to store the tasks.
2. Implement proper error handling for invalid requests.
3. Add input validation for task creation and updates. Validate that the title and description are not empty and that the completion status is a boolean value.
4. Test the API using Postman or Curl to ensure it works as expected.

## Optional Extension:

1. Implement filtering and sorting for the GET /tasks endpoint. For example, users should be able to filter tasks based on completion status and sort them by creation date.
2. Allow users to assign a priority level (e.g., low, medium, high) to each task. Update the API to support this new attribute in task creation, updates, and retrieval.
3. Implement an endpoint to retrieve tasks based on priority level: GET /tasks/priority/:level.

## Initial Project Setup:

Used the below-mentioned npm command to initialize the project-
`npm init`

## Dependencies:

As a part of backend application and API development, I have used the below-mentioned packages or modules as dependencies-
1. express
2. body-parser
3. dotenv
4. nodemon

## Endpoint Implemented:

Application content: taskManager<br>
Resource Name: tasks

1. To Get a list of all tasks with filter query params: `/taskManager/tasks` Method: `GET`
2. To Get a specific task basis task id: `/taskManager/tasks/:taskId` Method: `GET`
3. To Create a task: `/taskManager/tasks` Method: `POST`
4. To Update a task: `/taskManager/tasks/:taskId` Method: `PUT`
5. To Delete a task: `/taskManager/tasks/:taskId` Method: `DELETE`
6. To Get a tasks basis priority level: `/taskManager/tasks/:priorityLevel` Method: `GET` 
