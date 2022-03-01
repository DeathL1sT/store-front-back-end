import supertest from "supertest";
import app from "../../app";
import { UserData, User } from "../../models/User";

const request = supertest(app);
const userStore = new UserData();

let testUser: User;
let testToken: string;

beforeAll(async () => {
  await userStore.clear();
  testUser = await userStore.create({
    firstName: "test",
    lastName: "test",
    email: "test@udacity.com",
    password: "1234567",
  });

  testToken = await userStore.login(testUser.email, "1234567");
});

afterAll(async () => {
  await userStore.clear();
});

describe("POST /login", () => {
  it("responds with login token on vaild login credintioals", async () => {
    const res = await request
      .post("/login")
      .send({ email: "test@udacity.com", password: "1234567" });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});

describe("GET /user/:id", () => {
  it("responds with user data on vaild id", async () => {
    const res = await request
      .get("/user/" + testUser.id)
      .set("x-auth-token", testToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(testUser.id);
  });
});

describe("Put /user/:id", () => {
  it("should be update the user info with valid auth", async () => {
    const res = await request
      .put("/user/" + testUser.id)
      .send({
        firstName: "test2",
        lastName: "test123",
        email: testUser.email,
        id: testUser.id,
      })
      .set("x-auth-token", testToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(testUser.id);
  });
});

describe("delete /user/:id", () => {
  it("should be delete the user info with valid auth", async () => {
    const res = await request
      .delete("/user/" + testUser.id)
      .set("x-auth-token", testToken);
    expect(res.statusCode).toBe(200);
    expect(testUser.firstName).toBeUndefined();
  });
});
