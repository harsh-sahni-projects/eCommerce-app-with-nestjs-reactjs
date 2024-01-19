## About

A Book Store eCommerce application made with NestJS and ReactJS.

## Tech used

* NodeJS
* NestJS
* Mongoose (MongoDB)
* ReactJS
* Vite
* MaterialUI
* Redux
* Redux Toolkit
* Cookies
* JWTs
* Encryption
* Session Management

## Prerequisites

1. Make sure your mongodb is running on `port 27017`

2. Make sure you have a database with name `books` in mongodb

(There should be no collections/docs in this `books` database. Data will be automatically added in this db when you'll run the app)

3. Make sure no other app is running on ports `3000` and `5173`

## Installation

### Steps:

1. Make sure you meet all the requirements mentioned under "Prerequisities" heading above.

2. Clone this repository using command `git clone git@github.com:harsh-sahni-projects/eCommerce-app-with-nestjs-reactjs.git`

2. Go inside this cloned folder using `cd eCommerce-app-with-nestjs-reactjs`

3. Install backend dependencies by running `npm install`

4. The frontend is placed in the folder "book-store-frontend". Install frontend dependencies by running `cd book-store-frontend` and `npm install`

5. Come back to server folder by running `cd ..`

## Running the app

1. Run `npm run start:dev` to run the development server.

2. Go to `http://localhost:5173` and you'll land on Book Store dashboard.
