CREATE TABLE orders_products(
   orderId bigint REFERENCES orders(id),
   productId bigint REFERENCES products(id), 
   quantity integer,
   PRIMARY KEY (orderId, productId)
);