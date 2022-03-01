import { ProductStore } from "../../models/Product";

const store = new ProductStore();

beforeAll(async () => {
  await store.clear();
});

afterEach(async () => {
  await store.clear();
});

describe("ProductStore.create()", () => {
  it("should be defined", () => {
    expect(store.create).toBeDefined();
  });

  it("should be create new product", async () => {
    const created = await store.create({ name: "create case", price: 15 });
    expect(created.name).toBe("create case");
  });
});

describe("ProductStore.index()", () => {
  it("should be defined", () => {
    expect(store.index).toBeDefined();
  });

  it("returns empty array when no products avaliable", async () => {
    const products = await store.index();
    expect(products.length).toBe(0);
  });

  it("returns non-empty array when products are avaliable", async () => {
    await store.create({ name: "Test Product", price: 10 });

    const products = await store.index();
    expect(products.length).toBe(1);
  });
});

describe("ProductStore.show()", () => {
  it("should be defined", () => {
    expect(store.show).toBeDefined();
  });

  it("returns non-empty array when products are avaliable", async () => {
    const created = await store.create({ name: "Test Product", price: 10 });

    const product = await store.show(created.id as number);
    expect(product.name).toBe("Test Product");
  });
});

describe("ProductStore.update()", () => {
  it("should be defined", () => {
    expect(store.update).toBeDefined();
  });

  it("should be update products", async () => {
    const newp = await store.create({ name: "for update", price: 5 });
    const product = await store.update(newp.id as number, {
      name: "updated",
      price: 6,
    });

    expect(product.name).toBe("updated");
  });
});

describe("ProductStore.delete()", () => {
  it("should be defined", () => {
    expect(store.delete).toBeDefined();
  });

  it("should be delete products", async () => {
    const newp = await store.create({ name: "for update", price: 5 });
    const product = await store.delete(newp.id as number);

    expect(product.id).toBe(newp.id);
  });
});
