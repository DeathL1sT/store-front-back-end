CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(100),
    userId bigint REFERENCES users(id) 
);