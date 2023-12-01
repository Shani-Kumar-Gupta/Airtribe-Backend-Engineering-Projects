# Airtribe Backend Engineering: News Aggregator API Backend Project
## Objective
Build a RESTful API that allows users to fetch news articles from multiple sources based on their preferences.

## Project Description:

In this project, we will create a RESTful API using Node.js, Express.js, and NPM packages. The API will allow users to register, log in, and set their news preferences (e.g., categories, sources). The API will then fetch news articles from multiple sources using external news APIs (e.g., NewsAPI). The fetched articles should be processed and filtered asynchronously based on user preferences.

## Initial Project Setup:

Used the below-mentioned npm command to initialize the project-
`npm init`

## Follow the below commands to run the project locally on your system:

1. Clone the repository:

   ```bash
   https://github.com/Shani-Kumar-Gupta/Airtribe-Backend-Engineering-Projects.git
   ```
2. Open the cloned repository

2. Navigate to the project directory:

   ```bash
   cd news-aggregator-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the application

   ```bash
   npm start
   ```
   Alternative to run the application
   ```bash
   npm run dev
   ```

## Dependencies:

As a part of backend application and API development, I have used the below-mentioned packages or modules as dependencies-
1. express
2. body-parser
3. dotenv
4. nodemon
5. axios
6. bcrypt
7. jsonwebtoken
8. url-search-params
9. fs

## Endpoint Implemented:

1. Register New User: `/auth/register` Method: `POST``
2. Login existing user: `/auth/login` Method: `POST`
3. Get Users News Preferences: `/newsAggregator/users/preferences` Method: `GET`
4. Updated Users News Preferences: `/newsAggregator/users/preferences` Method: `PUT`
5. Get News Basis User Preferences: `/newsAggregator/news` Method: `GET`