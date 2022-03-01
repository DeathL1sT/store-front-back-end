import express, { NextFunction, Request, Response } from "express";
import { UserData, User } from "../models/User";
import { body, param, validationResult } from "express-validator";
import auth from "../middleweare/auth";

const users = new UserData();

const users_route = (app: express.Application) => {
  app.post(
    "/login",
    [
      body("email", "invalid email").notEmpty().isEmail(),
      body("password", "invalid password")
        .notEmpty()
        .isLength({ min: 6, max: 12 }),
    ],
    login
  );

  app.get("/user", index);

  app.get(
    "/user/:id",
    auth,
    [param("id", "id is not a number").isNumeric()],
    show
  );

  app.post(
    "/user/register",
    [
      body("firstName", "first name is required").notEmpty(),
      body("lastName", "last name is required ").notEmpty(),
      body("email", "invalid email").notEmpty().isEmail(),
      body("password", "invalid password")
        .notEmpty()
        .isLength({ min: 6, max: 12 }),
    ],
    create
  );

  app.put(
    "/user/:id",
    auth,
    [
      body("firstName", "first name is required").notEmpty(),
      body("lastName", "last name is required ").notEmpty(),
      body("email", "invalid email").notEmpty().isEmail(),
    ],
    update
  );

  app.delete(
    "/user/:id",
    auth,
    [param("id", "id is not a number").isNumeric()],
    deleted
  );
};

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (await users.index()).map((u) => {
      //delete (u as any).password;
      return u;
    });

    return res.json(user);
  } catch (err) {
    next(err);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.params.id;
    const user = await users.show(+userId);

    //delete (user as any).password;
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };

    const newuser = await users.create(user);
    return res.status(200).json(newuser);
  } catch (err) {
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.params.id;
    const user = await users.update(+userId, req.body);
    return res.json(user);
  } catch (err) {
    next(err);
  }
};

const deleted = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = parseInt(req.params.id);
    const user = await users.delete(userId);
    return res.json(user);
  } catch (err) {
    //next(err);
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await users.login(email, password);
  return res.status(200).json({ token });
};
export default users_route;
