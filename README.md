# Introduction

This is a nodejs backend for a todo app. This projects allows users to create and manage their accounts and to create and manage todos.

## Getting Started

clone this github repository using:

1. **Clone project**
   ssh: <<git@github.com>:almamarie/nodejs-react-todo.git>
   http: <https://github.com/almamarie/nodejs-react-todo.git>

2. **Installing Node and NPM**
   This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (the download includes NPM) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

3. **Installing project dependencies**
   This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the directory of this repository. After cloning, open your terminal, move into the project directory, and run:

```bash
npm install
```

4. **Start server**
   To start the server, open your terminal and run:

```bash
npm run dev
```

Base URL: At present this app can only be run locally and is not hosted as a base URL. The backend app is hosted at the default, [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

- **Base URL:** [http://127.0.0.1:5000/api/v0](http://127.0.0.1:5000/api/v0)

## CORS

CORS has been set up for this application. the following HTTP methods are the only ones that can be performed on the server:

1. GET
2. POST
3. DELETE
4. PATCH

## Error Handling

Errors are returned as JSON objects in the following format:

```json
{
  "success": false,
  "message": "bad request"
}
```

The API will return the following error types when requests fail:

400: Bad Request
401: unauthorised
500: Server Error

## Endpoints

=================================================================

### GET '/'

- The route is used to check if the system is properly configured
- Request Arguments: None
- Returns: A hard coded object with 2 keys, success, and message.
- success is either True or False
- message always containg the string "successfully configured system"
- Response: The endpoint returns data in the following format:

```json
{
  "success": true,
  "message": "successfully configured system"
}
```

### POST '/auth/signin'

- The route is used to sign in
- Request body:

```json
{
  "email": "example97@email.com",
  "password": "12345678"
}
```

- Response: The endpoint returns data in the following format:

```json
{
  "success": true,
  "body": {
    "user": {
      "userId": 100,
      "firstName": "first_name",
      "lastName": "last_name",
      "email": "example97@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJmaXJzdE5hbWUiOiJBdG9sdWtvIiwibGFzdE5hbWUiOiJBeWFyaWdhIiwiZW1haWwiOiJhbG91aXNtYXJpZWE5N0BnbWFpbC5jb20iLCJpYXQiOjE2OTU0MTczNzl9.UED1hHyrLNOZMs7nOHxAmVYXVw9_okGENyvwEAexWtQ"
  }
}
```

### PATCH '/user/:userId/update'

- The route is used to update a user's details.
- request parameter: must include the id of the user
- Request body: an object containing the data to update. must include one or more fields.

```json
{
  "firstName": "louis marie",
  "lastName": "Ayariga",
  "email": "eahalouis@gmail.com"
}
```

- Response: The endpoint returns data in the following format:

```json
{
  "success": true,
  "body": {
    "userId": 3,
    "firstName": "louis marie",
    "lastName": "Ayariga",
    "email": "eahalouis@gmail.com",
    "updatedAt": "2023-09-21T22:58:36.000Z"
  }
}
```

### GET '/user/:userId'

- The route is used to get a user's details.
- Params: must include the id of the user
- Token must be included in the authorization header
- Response: The endpoint returns data in the following format:

```json
{
  "success": true,
  "body": {
    "userId": 3,
    "firstName": "louis marie",
    "lastName": "Ayariga",
    "email": "eahalouis@gmail.com"
  }
}
```

### DELETE "/user/:userId"

- The route is used to delete a user.
- Token must be included in the authorization header
- request parameter: must include the id of the user
- Response: The endpoint returns data in the following format:

```json
{
  "success": true,
  "body": "User deleted."
}
```

### POST '/todo/:userId/new'

- The route is used to add a new todo for a user.
- Token must be included in the authorization header
- request parameter: must include the id of the user
- Request body:

```json
{
  "userId": 3,
  "title": "Remove the stocks from the movie",
  "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptates sit ipsum veritatis vel ratione ea esse nam eum. Rem distinctio fugit veniam praesentium minima possimus odio consequatur blanditiis veritatis?",
  "deadline": "2023-09-30 12:00:00",
  "completed": false
}
```

- Response: The endpoint returns data in the following format:

```json
{
  "success": true,
  "body": {
    "total": 2,
    "data": [
      {
        "todoId": 1,
        "title": "create budget for rewind",
        "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptates sit ipsum veritatis vel ratione ea esse nam eum. Rem distinctio fugit veniam praesentium minima possimus odio consequatur blanditiis veritatis?",
        "deadline": "2024-08-30T12:00:00.000Z",
        "completed": false
      },
      {
        "todoId": 2,
        "title": "Remove the stocks from the movie",
        "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptates sit ipsum veritatis vel ratione ea esse nam eum. Rem distinctio fugit veniam praesentium minima possimus odio consequatur blanditiis veritatis?",
        "deadline": "2023-09-30T12:00:00.000Z",
        "completed": false
      }
    ]
  }
}
```

### PATCH '/todo/:userId/:todoId/update'

- The route is used to patch a todo.
- Token must be included in the authorization header
- request parameter: must include the id of the todo
- Request body:

```json
{
  "title": "create budget for rewind",
  "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptates sit ipsum veritatis vel ratione ea esse nam eum. Rem distinctio fugit veniam praesentium minima possimus odio consequatur blanditiis veritatis?",
  "deadline": "2024-08-30 12:00:00",
  "completed": false
}
```

- Response: The endpoint returns data in the following format:

```json
{
  "success": true,
  "body": {
    "total": 2,
    "data": [
      {
        "todoId": 1,
        "title": "create budget for rewind",
        "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptates sit ipsum veritatis vel ratione ea esse nam eum. Rem distinctio fugit veniam praesentium minima possimus odio consequatur blanditiis veritatis?",
        "deadline": "2024-08-30T12:00:00.000Z",
        "completed": false
      },
      {
        "todoId": 2,
        "title": "Remove the stocks from the movie",
        "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptates sit ipsum veritatis vel ratione ea esse nam eum. Rem distinctio fugit veniam praesentium minima possimus odio consequatur blanditiis veritatis?",
        "deadline": "2023-09-30T12:00:00.000Z",
        "completed": false
      }
    ]
  }
}
```

### GET '/todo/:userId/'

- The route is used to get all todos for a user.
- Token must be included in the authorization header
- request parameter: must include the id of the user
- Response: The endpoint returns data in the following format:

```json
{
  "success": true,
  "body": {
    "total": 2,
    "data": [
      {
        "todoId": 1,
        "title": "create budget for rewind",
        "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptates sit ipsum veritatis vel ratione ea esse nam eum. Rem distinctio fugit veniam praesentium minima possimus odio consequatur blanditiis veritatis?",
        "deadline": "2024-08-30T12:00:00.000Z",
        "completed": false
      },
      {
        "todoId": 2,
        "title": "Remove the stocks from the movie",
        "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptates sit ipsum veritatis vel ratione ea esse nam eum. Rem distinctio fugit veniam praesentium minima possimus odio consequatur blanditiis veritatis?",
        "deadline": "2023-09-30T12:00:00.000Z",
        "completed": false
      }
    ]
  }
}
```

### DELETE "/todo/:userId/:todoId/"

- The route is used to delete a todo.
- Token must be included in the authorization header
- request parameter: must include the id of the user
- Request body: None
- Response: The endpoint a list of todos:

```json
{
  "success": true,
  "body": {
    "total": 2,
    "data": [
      {
        "todoId": 1,
        "title": "create budget for rewind",
        "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptates sit ipsum veritatis vel ratione ea esse nam eum. Rem distinctio fugit veniam praesentium minima possimus odio consequatur blanditiis veritatis?",
        "deadline": "2024-08-30T12:00:00.000Z",
        "completed": false
      },
      {
        "todoId": 2,
        "title": "Remove the stocks from the movie",
        "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptates sit ipsum veritatis vel ratione ea esse nam eum. Rem distinctio fugit veniam praesentium minima possimus odio consequatur blanditiis veritatis?",
        "deadline": "2023-09-30T12:00:00.000Z",
        "completed": false
      }
    ]
  }
}
```

### POST 'todo/:userId/:todoId/complete'

- The route is used to **toggle** the complete state of a todo.
- Token must be included in the authorization header
- request parameter: must include the id of the todo
- Request body:

```json
{
  "completed": true // true or false
}
```

- Response: The endpoint returns data in the following format:

```json
{
  "success": true,
  "body": {
    "total": 2,
    "data": [
      {
        "todoId": 1,
        "title": "create budget for rewind",
        "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptates sit ipsum veritatis vel ratione ea esse nam eum. Rem distinctio fugit veniam praesentium minima possimus odio consequatur blanditiis veritatis?",
        "deadline": "2024-08-30T12:00:00.000Z",
        "completed": false
      },
      {
        "todoId": 2,
        "title": "Remove the stocks from the movie",
        "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptates sit ipsum veritatis vel ratione ea esse nam eum. Rem distinctio fugit veniam praesentium minima possimus odio consequatur blanditiis veritatis?",
        "deadline": "2023-09-30T12:00:00.000Z",
        "completed": false
      }
    ]
  }
}
```
