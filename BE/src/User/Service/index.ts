import * as UserRepository from "../Repository";
import { ISignup, IUser, IuserRegister } from "../Repository/User.types";
require("dotenv").config();
import jwt from "jsonwebtoken";
const secretKey =
  "5ad7235379e726b5c8c3e8ab394c1f10230e78b8a2e8b5a692c5ab42f1f7d8e4";
const nodemailer = require("nodemailer");
const password = "lnds kvrj wvfm dmik";

export const apiLogin = (value: IUser) => {
  try {
    return UserRepository.apiLogin(value);
  } catch (e) {
    console.log(e);
  }
};

export const connectDb = () => {
  try {
    return UserRepository.connectDb();
  } catch (e) {
    console.log(e);
  }
};

export const register = (value: IuserRegister) => {
  try {
    return UserRepository.register(value);
  } catch (e) {
    throw e;
  }
};

export const login = async (
  username: IuserRegister,
  password: IuserRegister
) => {
  try {
    const authenticateUser = await UserRepository.login(username, password);
    if (authenticateUser) {
      console.log(authenticateUser);
      const accessToken = jwt.sign(username, secretKey);
      return { username: authenticateUser, accessToken };
    } else {
      const err = new Error("authentication failed");
      err.name = "400";
      throw err;
    }
  } catch (e) {
    throw e;
  }
};

export const dbSignup = (value: ISignup) => {
  try {
    return UserRepository.dbSignup(value);
  } catch (e) {
    throw e;
  }
};

export const forgetPassword = async (email: string) => {
  try {
    const userData = await UserRepository.forgetPassword(email); //if email exits in database
    if (userData) {
      const token = jwt.sign(userData, secretKey);
      // return { status: 200, message: "User found!",token };
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "barsashyaula13@gmail.com",
          pass: password,
        },
      });
      console.log(userData);

      const mailOptions = {
        from: "barsashyaula13@gmail.com",
        to: "barsashyaula13@gmail.com",
        subject: "Forgot Password Link",
        text: `http://localhost:5173/reset?token=${token}`,
      };

      transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
          throw new Error();
        } else {
          console.log("Email sent: ");
          return { status: 200, message: "Email sent", token };
        }
      });
    }
  } catch (e: any) {
    throw e;
  }
};

export const ResetPassword = async (decoded: any, password: any) => {
  try {
    const email = decoded.email;
    const result = await UserRepository.ResetPassword(email, password);

    return { status: 200, message: "sucessful Password Reset" };
  } catch (e) {
    throw e;
  }
};

export const addDetails = async (UsersDetails: any) => {
  try {
    const result = await UserRepository.addDetails(UsersDetails);
    return { result };
  } catch (e) {
    throw e;
  }
};
export const showDetails = async (userId: any) => {
  try {
    const result = await UserRepository.showDetails(userId);
    // return { status: 200, message: "sucessful showProduct", data: result };
    return { result };
  } catch (e) {
    throw e;
  }
};

export const deleteSkills = async (Skill_ID: number, user_id: number) => {
  try {
    const result = await UserRepository.deleteSkills(Skill_ID, user_id);
    return { result };
  } catch (e) {
    throw e;
  }
};
export const deleteProjects = async (Project_ID: number, user_id: number) => {
  try {
    const result = await UserRepository.deleteProjects(Project_ID, user_id);
    return { result };
  } catch (e) {
    throw e;
  }
};
