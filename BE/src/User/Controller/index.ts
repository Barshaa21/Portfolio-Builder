import { NextFunction, Request, Response } from "express";
import * as UserService from "../Service";
import jwt from "jsonwebtoken";
const secretKey =
  "5ad7235379e726b5c8c3e8ab394c1f10230e78b8a2e8b5a692c5ab42f1f7d8e4";

// Login
export const apiLogin = (req: Request, res: Response) => {
  try {
    res.status(200).json(UserService.apiLogin(req.body));
  } catch (e) {
    res.status(400).json(e);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await UserService.register(req.body));
  } catch (e) {
    // res.status(500).json("registration failed");
    next(e);
  }
};

export const dbLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  try {
    res.status(200).json(await UserService.login(username, password));
  } catch (e: any) {
    // res.status(500).json("Login failed");
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};

export const dbSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { username, password, email } = req.body;
  try {
    res.status(200).json(await UserService.dbSignup(req.body));
  } catch (e: any) {
    // res.status(500).json("Login failed");
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};
export const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    res.status(200).json(await UserService.forgetPassword(email));
  } catch (e: any) {
    // res.status(500).json("Login failed");
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};
export const ResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { id, token } = req.params;
  const { password } = req.body;
  try {
    const result = await UserService.ResetPassword(req.user, password);
    res.status(result.status).json({ message: result.message });
    console.log(result);
  } catch (e: any) {
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};

export const showDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.query.userId as string;
  console.log("userId", userId);
  try {
    const result = await UserService.showDetails(userId);
    res.status(200).json(result);
  } catch (e: any) {
    console.log("Controller", e.message);
    next(e);
  }
};

export const addDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const UsersDetails = req.body;
  console.log("userDetails", UsersDetails);
  try {
    const result = await UserService.addDetails(UsersDetails);
    res.status(200).json(result);
  } catch (e: any) {
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};

export const deleteSkills = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const Skill_Details = req.body;
  const Skill_ID = Skill_Details.Skill_ID;
  const user_id = Skill_Details.user_id;
  console.log(Skill_ID, user_id);
  try {
    const result = await UserService.deleteSkills(Skill_ID, user_id);
    res.status(200).json(result);
  } catch (e: any) {
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};
export const deleteProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const Project_Details = req.body;
  const Project_ID = Project_Details.Skill_ID;
  const user_id = Project_Details.user_id;
  console.log(Project_ID, user_id);
  try {
    const result = await UserService.deleteProjects(Project_ID, user_id);
    res.status(200).json(result);
  } catch (e: any) {
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};
