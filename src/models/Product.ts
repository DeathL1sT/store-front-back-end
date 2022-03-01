import client from "../DB/DB";

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can not find the product `);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot find what you looking for `);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = "INSERT INTO products(name,price) VALUES($1,$2) RETURNING *";
      const result = await conn.query(sql, [p.name, p.price]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`please insert valid values`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id=($1) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`cannot delete your item `);
    }
  }

  async clear(): Promise<void> {
    try {
      const sql = "DELETE FROM products";
      const conn = await client.connect();
      await conn.query(sql);
      conn.release();
    } catch (err) {
      throw new Error(`cannot delete your item `);
    }
  }

  async update(id: number, newProduct: Product): Promise<Product> {
    try {
      const sql =
        "UPDATE products SET name=$1, price=$2 WHERE id=$3 RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [
        newProduct.name,
        newProduct.price,
        id || newProduct.id,
      ]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`cannot edit your item `);
    }
  }
}
