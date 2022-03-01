# API Endpoints

##### User Route

## POST `/user/register`

For creating account by insert [first name, last name, email, password] and all this info have validation

## POST `/login`

For sign in with valid email and password

## GET `/user`

This page for users have loged in

## GET `/user/:id`

For specific user by id like serach for some one

## PUT `/user/:id`

For edite the user profile have same id in the url

## DELETE `/user/:id`

For deleting user have same id in the url

#### Product Route

## POST `/products/create`

Create new product

## GET `/products`

Show list of all products

## GET `/products/:id`

show one product have same id in the url

## PUT `/products/:id`

Edite the product have same id in the url

## DELETE `/products/:id`

Delete the product have same id in the url

#### Order Route

## GET `/orders`

show orders list

## GET `/orders/:id`

For looking on specific order by id

## GET `/orders/active`

Show the list of active orders

## GET `/orders/complete`

Show the list of complete orders

## POST `/orders`

Create new order

## PUT `/orders/:id`

For edit status to order have same id in the url

## DELETE `/orders/:id`

Delete an order have same id in the url

## POST `/orders/:id/products`

Add product to the order with quantity have same id in the url

## License

This project is licensed under the MIT License.
