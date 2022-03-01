import express, { NextFunction, Request, Response } from "express";
import { OrderData } from "../models/Order";
import auth from "../middleweare/auth";

const orders = new OrderData();

const order_route = (app: express.Application) => {
  app.get("/orders", auth, index);
  app.get("/orders/active", auth, getActive);
  app.get("/orders/complete", auth, getComplete);
  app.get("/orders/:id", auth, show);
  app.post("/orders", auth, create);
  app.put("/orders/:id", auth, edite);
  app.delete("/orders/:id", auth, deleted);
  app.post("/orders/:id/products", auth, addproduct);
};

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orders.index();
    return res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderId = req.params.id;
    const order = await orders.show(+orderId);
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

const getActive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orders.getActive();
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

const getComplete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orders.getComplete();
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status: string = req.body.status;
    const userId: number = req.body.userId;

    const neworder = await orders.create(status, +userId);
    return res.status(200).json(neworder);
  } catch (err) {
    next(err);
  }
};

const edite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderId: number = parseInt(req.params.id);

    const order = await orders.update(orderId, req.body);
    res.json(order);
  } catch (err) {
    next(err);
  }
};

const deleted = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderId: number = parseInt(req.params.id);
    const order = await orders.delete(orderId);
    res.json(order);
  } catch (err) {
    next(err);
  }
};

const addproduct = async (req: Request, res: Response, next: NextFunction) => {
  const orderId: number = parseInt(req.params.id);
  const productId: number = parseInt(req.body.productId);
  const quantity: number = parseInt(req.body.quantity);
  try {
    const submitProduct = await orders.addproduct(orderId, productId, quantity);
    console.log(submitProduct);
    return res.json(submitProduct);
  } catch (err) {
    next(err);
  }
};

export default order_route;
