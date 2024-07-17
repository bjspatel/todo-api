# ToDo API

This is a ToDo application API built using **NestJS**, and **MongoDB**. The application serves endpoints for managing tasks, users, and authentication. For protecting the endpoints, authentication is done with the help of short-living access-token, and long-living refresh-token. It also provides Swagger documentation for the API.

## Table of Contents
- [ToDo API](#todo-api)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [API Documentation](#api-documentation)
  - [Project Structure](#project-structure)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/bjspatel/todo-api.git
    cd todo-api
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Running the Application

1. Make sure you have MongoDB running on local machine or on the free [MongoDB Atlas](https://www.mongodb.com/lp/cloud/atlas/try4) cluster.

2. Create a `.env` file in the root directory of the project and add the following environment variables (modify the values as needed):
    ```env
    MONGODB_URI=mongodb://localhost:27017/todo
    FRONTEND_URL=http://localhost:5173
    PORT=8080
    ```

     - `MONGODB_URI` is the connection string for MongoDB.
     - `FRONTEND_URL` is used for CORS configuration.
     - `PORT` is the port on which the application will run.

3. Start the application:
    ```sh
    npm run start
    ```

4. The application will be running on `http://localhost:8080`.


## API Documentation

The API is documented using the Swagger module. Once the application is running, you can access the Swagger documentation at `http://localhost:8080/api`.


## Project Structure

TODO/
├── src/
│ ├── auth/ # Authentication module
│ ├── decorators/ # Custom decorators
│ ├── task/ # Task module
│ ├── user/ # User module
│ ├── app.module.ts # Root module
│ └── main.ts # Entry point
├── .env # Environment variables file
...
