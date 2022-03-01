import client from "../DB/DB";

export type Order = {
  id?: number;
  status: string;
  userId: number;
};

export type OrderProduct = {
  orderId: number;
  productId: number;
  quantity: number;
};

export class OrderData {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can not find this orders `);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot find this order ID ... you looking for `);
    }
  }

  async getActive(): Promise<Order[]> {
    try {
      const sql = "SELECT * FROM orders WHERE status='active'";
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot find an active orders... `);
    }
  }

  async getComplete(): Promise<Order[]> {
    try {
      const sql = "SELECT * FROM orders WHERE status='complete'";
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot find an complete orders... `);
    }
  }

  async create(status: string, userId: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "INSERT INTO orders(status,userId) VALUES($1,$2) RETURNING *";
      const result = await conn.query(sql, [status, userId]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`please insert valid user id`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`cannot cancel your order `);
    }
  }

  async update(id: number, status: string): Promise<Order> {
    try {
      const sql = "UPDATE orders SET status=$1 WHERE id=$2 RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [status, id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`cannot edit your order `);
    }
  }

  async addproduct(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders_products(orderId,productId,quantity) VALUES($1,$2,$3) RETURNING *";
      const result = await conn.query(sql, [orderId, productId, quantity]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`cannot add product`);
    }
  }

  async clear(): Promise<void> {
    try {
      const sql = "DELETE FROM orders";
      const conn = await client.connect();
      await conn.query(sql);
      conn.release();
    } catch (err) {
      throw new Error(`cannot delete your orders `);
    }
  }

  async clearProducts(): Promise<void> {
    try {
      const sql = "DELETE FROM orders_products";
      const conn = await client.connect();
      await conn.query(sql);
      conn.release();
    } catch (err) {
      throw new Error(`cannot delete your orders products`);
    }
  }
}
