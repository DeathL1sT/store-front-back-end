import client from "../DB/DB";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export class UserData {
  async index(): Promise<User[]> {
    const conn = await client.connect();
    const sql = "SELECT * FROM users";
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  }

  async show(id: number): Promise<User> {
    const conn = await client.connect();
    const sql = "SELECT * FROM users WHERE id=($1) ";
    const result = await conn.query(sql, [id]);
    conn.release();

    if (result.rowCount === 0) {
      throw new Error("user not found");
    }

    return result.rows[0];
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users(firstName,lastName,email,password) VALUES($1,$2,$3,$4) RETURNING *";
      const hash = bcrypt.hashSync(
        u.password,
        +(process.env.SALT_ROUND as string)
      );

      const result = await conn.query(sql, [
        u.firstName,
        u.lastName,
        u.email,
        hash,
      ]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error("email is already in use");
    }
  }

  async update(id: number, newUser: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE users SET firstName=$1, lastName = $2, email= $3 WHERE id=($4) RETURNING *";

      const result = await conn.query(sql, [
        newUser.firstName,
        newUser.lastName,
        newUser.email,
        id,
      ]);
      const user = result.rows[0];

      conn.release();
      return user;
    } catch (err) {
      throw new Error(`cnnot update this user ...`);
    }
  }
  async clear(): Promise<void> {
    try {
      const sql = "DELETE FROM users";
      const conn = await client.connect();
      await conn.query(sql);
      conn.release();
    } catch (err) {
      throw new Error("cannot delete your users ");
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM users WHERE id=($1) RETURNING *";
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error("cannot delete this user ...");
    }
  }

  async login(email: string, password: string): Promise<string> {
    const conn = await client.connect();
    const sql = "SELECT * FROM users WHERE email=($1)";
    const result = await conn.query(sql, [email]);
    conn.release();

    if (result.rowCount === 0) {
      throw new Error("invalid email or password");
    }

    const user = result.rows[0] as User;

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("invalid email or password");
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.SECRET_TOKEN as string,
      { expiresIn: "7d" }
    );

    return token;
  }
}
