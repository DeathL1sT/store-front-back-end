import express, { Request, Response } from "express";
import dotenv from "dotenv";
import handleError from "./middleweare/errorHandler";
import logger from "./middleweare/logger";
import product_route from "./handlers/productRoute";
import cors from "cors";
import users_route from "./handlers/userRoute";
import order_route from "./handlers/orderRoute";

dotenv.config();

const app: express.Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.get("/", async (req: Request, res: Response) => {
  res.send("hello world");
});
product_route(app);
users_route(app);
order_route(app);
app.use(handleError);

export default app;
