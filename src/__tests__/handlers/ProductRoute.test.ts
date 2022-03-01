import supertest from "supertest";
import app from "../../app";
import { Product, ProductStore } from "../../models/Product";
import { UserData, User } from "../../models/User";

const request = supertest(app);

const productstore = new ProductStore();
let testProduct: Product;
const userStore = new UserData();

let testUser: User;
let testToken: string;

beforeAll(async () => {
  testUser = await userStore.create({
    firstName: "test",
    lastName: "test",
    email: "test3@udacity.com",
    password: "1234567",
  });

  testToken = await userStore.login(testUser.email, "1234567");
  testProduct = await productstore.create({ name: "test", price: 6 });
});

afterAll(async () => {
  await userStore.clear();
  await productstore.clear();
});

describe("POST /product", () => {
  it("responds with create product on vaild auth", async () => {
    const res = await request
      .post("/products/create")
      .send({ name: "test2", price: 5 })
      .set("x-auth-token", testToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("test2");
  });
});

describe("GET /products", () => {
  it("responds with products data on vaild auth", async () => {
    const res = await request.get("/products").set("x-auth-token", testToken);
    expect(res.statusCode).toBe(200);
  });

  it("responds with products id  data on vaild auth", async () => {
    const res = await request
      .get("/products/" + testProduct.id)
      .set("x-auth-token", testToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("test");
  });
});

describe("Put /products/:id", () => {
  it("should be update the user info with valid auth", async () => {
    const res = await request
      .put("/products/" + testProduct.id)
      .send({
        name: "updated",
        price: 10,
      })
      .set("x-auth-token", testToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(testProduct.id);
  });
});

describe("delete /product/:id", () => {
  it("should be delete the user info with valid auth", async () => {
    const res = await request
      .delete("/products/" + testProduct.id)
      .set("x-auth-token", testToken);
    expect(res.statusCode).toBe(200);
  });
});
