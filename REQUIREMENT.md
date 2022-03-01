# Store Front Back-End.

### NOTE: You will need to create the databast image on docker before you run the app 
PORT=3000
POSTGRES_HOST = 127.0.0.1
POSTGRES_DB = store
POSTGRES_DB_TEST = store_test
POSTGRES_USER = postgres
POSTGRES_PASSWORD = sql123
### PORT
Port number for db :5432
port number for server:3000
## REQUIREMENT
** This App Build on
   Postgres DataBase, Node.js and Express by TypeScript Language with some extra packages for  encryption and authorization to access the database for who have permetion
**
# Packages 
+ express-validator to validate the input 
+ jsonwebtoken to give authrization for login users 
+ bcrypt to hash the enter password 
+ pg for postgress database 
+ db-migrate-pg  db-migrate  for writting the schema on node 
+ jest for unit test and integration test

## Database schema with column name and type.
* users table {
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(100)
    }
* orders table {
    id SERIAL PRIMARY KEY,
    status VARCHAR(100),
    userId bigint REFERENCES users(id) 
}
* products table {
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    price FLOAT NOT NULL
}
* orders_products{
    orderId bigint REFERENCES orders(id),
    productId bigint REFERENCES products(id), 
    quantity integer,
    PRIMARY KEY (orderId, productId)
}

### Example to create table and insert data

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(100));

INSERT INTO users(firstName,lastName,email,password) VALUES(
    "test","test","test@udacity.com","udacity");
## License

This project is licensed under the MIT License.
