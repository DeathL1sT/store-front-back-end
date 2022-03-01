import express, { NextFunction, Request, Response } from "express";
import { ProductStore, Product } from "../models/Product";
import auth from "../middleweare/auth";
const store = new ProductStore();

const product_route = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products/create", auth, create);
  app.put("/products/:id", edite);
  app.delete("/products/:id", deleted);
};

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await store.index();
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const product = await store.show(+productId);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };

    const newProduct = await store.create(product);
    return res.status(200).json(newProduct);
  } catch (err) {
    next(err);
  }
};

const edite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId: number = parseInt(req.params.id);
    const product = await store.update(productId, req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const deleted = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const product = await store.delete(+productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export default product_route;
