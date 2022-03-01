import { OrderData } from "../../models/Order";
import { UserData, User } from "../../models/User";
import { ProductStore, Product } from "../../models/Product";
const store = new OrderData();
const productStore = new ProductStore();
const usersStore = new UserData();
let testUser: User;
let testProduct: Product;

beforeAll(async () => {
  testUser = await usersStore.create({
    firstName: "Test",
    lastName: "User",
    email: "ordertest@mail.com",
    password: "Password",
  });
  testProduct = await productStore.create({ name: "testproduct", price: 6 });
});

 
afterEach(async () => {
   await store.clearProducts();
   await store.clear();
 });

afterAll(async () => {
  await usersStore.clear();
  await store.clear();
  await store.clearProducts();
  await productStore.clear();
  
 });

describe("orderData.create()", () => {
  it("should be defined", () => {
    expect(store.create).toBeDefined();
  });

  it("should be create new order", async () => {
    const status = "active";
    const created = await store.create(status, testUser.id as number);

    expect(created.status).toBe("active");
  });
});

describe("orderData.index()", () => {
  it("should be defined", () => {
    expect(store.index).toBeDefined();
  });

  it("returns empty array when no order avaliable", async () => {
    const order = await store.index();
    expect(order.length).toBe(0);
  });

  it("returns non-empty array when order are avaliable", async () => {
    await store.create("active", testUser.id as number);
    const orders = await store.index();
    expect(orders.length).toBe(1);
  });
});

describe("orderData.getActive()", () => {
  it("should be defined", () => {
    expect(store.getActive).toBeDefined();
  });

  it("returns empty array when no active orders are avaliable", async () => {
    const order = await store.getActive();
    expect(order.length).toBe(0);
  });

  it("returns non-empty array when active orders are avaliable", async () => {
    await store.create("active", testUser.id as number);
    const orders = await store.getActive();
    expect(orders.length).toBe(1);
  });
});

describe("orderData.addproduct()", () => {
  it("should be defined", () => {
    expect(store.addproduct).toBeDefined();
  });

  it("add product to order", async () => {
    const neworder = await store.create("active", testUser.id as number);
    const add = await store.addproduct(
      neworder.id as number,
      testProduct.id as number,
      6
    );
    expect(add.quantity).toBe(6);
  });
});

describe("orderData.getComplete()", () => {
  it("should be defined", () => {
    expect(store.getComplete).toBeDefined();
  });

  it("returns empty array when no active orders are avaliable", async () => {
    const order = await store.getComplete();
    expect(order.length).toBe(0);
  });

  it("returns non-empty array when active orders are avaliable", async () => {
    await store.create("complete", testUser.id as number);
    const orders = await store.getComplete();
    expect(orders.length).toBe(1);
  });
});

describe("orderData.show()", () => {
  it("should be defined", () => {
    expect(store.show).toBeDefined();
  });

  it("returns non-empty array when orders are avaliable", async () => {
    const created = await store.create("active", testUser.id as number);

    const order = await store.show(created.id as number);
    expect(order.status).toBe(created.status);
  });
});

describe("orderData.update()", () => {
  it("should be defined", () => {
    expect(store.update).toBeDefined();
  });

  it("should be update orders", async () => {
    const newOrder = await store.create("active", testUser.id as number);
    const order = await store.update(newOrder.id as number, "complete");

    expect(order.status).toBe("complete");
  });
});

describe("orderData.delete()", () => {
  it("should be defined", () => {
    expect(store.delete).toBeDefined();
  });

  it("should be delete order", async () => {
    const newOrder = await store.create("active", testUser.id as number);
    const order = await store.delete(newOrder.id as number);
    expect(order.id).toBe(newOrder.id);
  });
});
