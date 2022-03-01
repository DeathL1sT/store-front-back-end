# Store Front Back-End.

A mini store backend made with Express.js, postgresSQL in shape of RESTful API

## Setup

You can choose to run this project with/out Docker. However, you might favor you would have to setup
the .env file for configurations.

## Setting up Database

# create a user to connect to the database.

CREATE USER storefront WITH PASSWORD "password";

# Create Database storefrontend

CREATE DATABASE storefrontend;
GRANT ALL PRIVILEGES ON DATABASE storefrontend TO storefront;

Do it agaein with the test database

CREATE DATABASE storefrontend_test;
GRANT ALL PRIVILEGES ON DATABASE storefrontend_test TO storefront;

# Run database migrations

npm run migrate

or for test

npm run migrate:test

## To start the App you need to Installation

Install deps:

```bash
npm install
```

Run for development

```bash
npm run dev
```

Build for Prodcution:

```bash
npm run build
```

Run Tests:

```bash
npm run test
```

Formatting and Linting:

```bash
npm run format
npm run lint
```

## License

This project is licensed under the MIT License.
