import supertest from "supertest";
import app from "../../app";
import { Order, OrderData } from "../../models/Order";
import { UserData, User } from "../../models/User";
import { ProductStore } from "../../models/Product";
const request = supertest(app);

const userStore = new UserData();
const productstore = new ProductStore();
const orderstorse = new OrderData();
let testorder: Order;

let testUser: User;
let testToken: string;

beforeAll(async () => {
  testUser = await userStore.create({
    firstName: "test",
    lastName: "test",
    email: "test55@udacity.com",
    password: "1234567",
  });

  testToken = await userStore.login(testUser.email, "1234567");
  testorder = await orderstorse.create("active", testUser.id as number);

  //testproduct = await productstore.create({ name: "testcar", price: 10 });
});

afterAll(async () => {
  await orderstorse.clearProducts();
  await orderstorse.clear();
  await userStore.clear();
  await productstore.clear();
});

describe("POST /orders", () => {
  it("responds with create order on vaild auth", async () => {
    const res = await request
      .post("/orders")
      .send({ status: "active", userId: testUser.id })
      .set("x-auth-token", testToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("active");
  });
});

describe("GET /orders", () => {
  it("responds with orders data on vaild auth", async () => {
    const res = await request.get("/orders").set("x-auth-token", testToken);
    expect(res.statusCode).toBe(200);
  });

  it("responds with order id  data on vaild auth", async () => {
    const res = await request
      .get(`/orders/${testorder.id}`)
      .set("x-auth-token", testToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("active");
  });
});

describe("Put /orders/:id", () => {
  it("should be update the order status with valid auth", async () => {
    const res = await request
      .put(`/orders/${testorder.id}`)
      .send({ id: testorder.id, status: "complete" })
      .set("x-auth-token", testToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toMatch("complete");
  });
});

describe("delete /orders/:id", () => {
  it("should be delete the order info with valid auth", async () => {
    const order = await orderstorse.create("active", testUser.id as number);
    const res = await request
      .delete(`/orders/${order.id}`)
      .set("x-auth-token", testToken);
    expect(res.statusCode).toBe(200);
  });
});

describe("add product to order in order_product ", () => {
  it("should be add record with valid auth", async () => {
    const order = await orderstorse.create("active", testUser.id as number);
    const product = await productstore.create({ name: "test", price: 6 });
    const res = await request
      .post(`/orders/${order.id}/products`)
      .send({ orderId: order.id, productId: product.id, quantity: 6 })
      .set("x-auth-token", testToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(6);
  });
});

describe("get the active orders", () => {
  it("shoud return which order have active status", async () => {
    const res = await request
      .get("/orders/active")
      .set("x-auth-token", testToken);
    expect(res.statusCode).toBe(200);
  });

  it("shoud return empty array if  order have no active status", async () => {
    const res = await request
      .get("/orders/active")
      .set("x-auth-token", testToken);
    expect(res.statusCode).toBe(200);
  });
});

describe("get the complete orders", () => {
  it("shoud return which order have complete status", async () => {
    const res = await request
      .get("/orders/complete")
      .set("x-auth-token", testToken);
    expect(res.statusCode).toBe(200);
  });

  it("shoud return empty array order have no complete status", async () => {
    const res = await request
      .get("/orders/complete")
      .set("x-auth-token", testToken);
    expect(res.statusCode).toBe(200);
  });
});
