# Stock Data Repo Assignment

Stock Data repo is the assignment given by SlicePay.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

* [Node.js 8.X](https://nodejs.org/en/download/)
* [MongoDB](https://www.mongodb.com/download-center)


## Database Setup

You need to populate the Database by running 
`npm run seeds`

This will populate the stocks and price seed in the database.

## Start Server

Start the development server:
`npm start`

Start the server in debug mode:
`npm run debug`

Server is running at http://localhost:5000
For Swagger documentation, go to http://localhost:5000/api-docs


## Running the tests

For running tests : 


```
npm test
```

NOTE: Test cases are not implemented.

## Running lint

Verifying code style and practices.

`npm run lint`

Fix Lint issues

`npm run lint-fix`

This will verify that all code matches the lint guidelines.

## Considerations And Assumptions

Postman collection is not provided for the application as there is a swagger documentation for the same.