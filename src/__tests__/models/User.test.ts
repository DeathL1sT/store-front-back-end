import { UserData } from "../../models/User";

const store = new UserData();

beforeAll(async () => {
  await store.clear();
});

afterEach(async () => {
  await store.clear();
});

afterAll(async () => {
  await store.clear();
});

describe("userData.create()", () => {
  it("should be defined", () => {
    expect(store.create).toBeDefined();
  });

  it("should be create new user", async () => {
    const created = await store.create({
      firstName: "Test",
      lastName: "User",
      email: "test@mail.com",
      password: "password",
    });
    expect(created.email).toBe("test@mail.com");
  });
});

describe("userData.login()", () => {
  it("should be defined", () => {
    expect(store.login).toBeDefined();
  });

  it("should return user token", async () => {
    const user = await store.create({
      firstName: "Test",
      lastName: "User",
      email: "test@mail.com",
      password: "password",
    });

    const token = await store.login(user.email, "password");
    expect(token).toBeDefined();
  });

  it("should throws an error when user not found", async () => {
    await expect(
      store.login("notfound@mail.com", "password")
    ).rejects.toBeInstanceOf(Error);
  });
});
describe("userData.index()", () => {
  it("should be defined", () => {
    expect(store.index).toBeDefined();
  });

  it("returns empty array when no user avaliable", async () => {
    const user = await store.index();
    expect(user.length).toBe(0);
  });

  it("returns non-empty array when user are avaliable", async () => {
    await store.create({
      firstName: "Test",
      lastName: "User",
      email: "test@mail.com",
      password: "password",
    });

    const result = await store.index();
    expect(result.length).toBe(1);
  });
});

describe("userData.show()", () => {
  it("should be defined", () => {
    expect(store.show).toBeDefined();
  });

  it("returns user when avaliable", async () => {
    const created = await store.create({
      firstName: "Test",
      lastName: "User",
      email: "test@mail.com",
      password: "password",
    });
    const user = await store.show(created.id as number);

    expect(user.email).toBe("test@mail.com");
  });
});

describe("userData.update()", () => {
  it("should be defined", () => {
    expect(store.update).toBeDefined();
  });

  it("should be update users", async () => {
    const old = await store.create({
      firstName: "Test",
      lastName: "User",
      email: "test@mail.com",
      password: "password",
    });

    const user = await store.update(old.id as number, {
      firstName: "Test",
      lastName: "User",
      email: "test2@mail.com",
      password: "password",
    });

    expect(user.email).toBe("test2@mail.com");
  });
});

describe("userData.delete()", () => {
  it("should be defined", () => {
    expect(store.delete).toBeDefined();
  });

  it("should be delete user", async () => {
    const user = await store.delete(1);

    expect(user).toBeUndefined();
  });
});
