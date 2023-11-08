import { ISignup, IUser, IuserRegister } from "./User.types";

import jwt from "jsonwebtoken";
const secretKey =
  "5ad7235379e726b5c8c3e8ab394c1f10230e78b8a2e8b5a692c5ab42f1f7d8e4";
const nodemailer = require("nodemailer");

const sendMail = async (token: any) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        email: "barsashyaula13@mail.com",
        password: process.env.password,
      },
    });
    const mailOptions = {
      from: "barsashyaula13@gmail.com",
      to: "learnlearn10101@gmail.com",
      subject: "for password reset",
      html: "<p>this is for password reset<p/>",
    };
    transporter.sendMail(mailOptions, function (error: any, infor: string) {
      if (error) {
        console.log(error);
      } else {
        console.log("mail has been sent");
      }
    });
  } catch (e) {
    console.log(e);
  }
};

// for database connection
const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb+srv://barsha:test123@cluster0.4rnjqa0.mongodb.net/";
const client = new MongoClient(uri);
const db = client.db("Portfolio");

export const apiLogin = (value: IUser) => {
  const { firstName, password } = value;
  if (firstName === "gritfeat" && password === "fellowship") {
    return "Login successful";
  } else {
    return "Login failed";
  }
};

export const connectDb = () => {
  try {
    return "database is connected";
  } catch (e) {
    return e;
  }
};

async function getAdminRoleId() {
  const db = client.db("Login");
  const roles = db.collection("roles");
  const roleData = await roles.findOne({ name: "ADMIN" });
  return roleData ? roleData._id : null;
}

export const register = async (value: IuserRegister) => {
  const db = client.db("Login");
  const { firstName, lastName, email, password, username } = value;
  try {
    const user = db.collection("login");
    const roleId = await getAdminRoleId();
    const userData: IuserRegister = {
      firstName,
      lastName,
      email,
      username,
      password,
      role: roleId,
    };
    const result = await user.insertOne(userData);
    return result;
  } catch (e) {
    throw e;
  }
};

export const login = async (
  username: IuserRegister,
  password: IuserRegister
) => {
  try {
    const db = client.db("Portfolio");
    const users = db.collection("Users");
    const product = db.collection("login");

    return await users.findOne({ username, password });
  } catch (e) {
    console.log("repository", e);
    throw e;
  }
};

export const dbSignup = async (value: ISignup) => {
  const db = client.db("Login");
  const { name, email, password, username } = value;
  try {
    const user = db.collection("login");
    const userData: ISignup = {
      name,
      email,
      username,
      password,
      role: "user",
    };
    const result = await user.insertOne(userData);
    return result;
  } catch (e) {
    throw e;
  }
};

export const forgetPassword = async (email: string) => {
  try {
    const db = client.db("Login");
    const users = db.collection("login");
    // throw new Error("repo error");
    return await users.findOne({ email });
  } catch (e) {
    console.log("repository", e);
    throw e;
  }
};

export const ResetPassword = async (email: string, password: any) => {
  try {
    const db = client.db("Login");
    const users = db.collection("login");
    const user = await users.findOne({ email: "barsashyaula13@gmail.com" });
    console.log("repo reset", user);
    if (user) {
      await users.updateOne(
        { email: "barsashyaula13@gmail.com" },
        { $set: { password: password } }
      );
      return { status: 200, message: "Reset password sucessfull" };
    } else {
      throw new Error("User not found");
    }
  } catch (e) {
    console.log("repository", e);
    throw e;
  }
};

export const showPortfolioDetails = async () => {
  try {
    const db = client.db("Portfolio");
    const portfolioDetails = db.collection("UserDetails");
    const data = portfolioDetails.find().toArray();
    return data;
  } catch (e) {
    return e;
  }
};

interface UserDetails {
  name: string;
  description: string;
  skills: string[];
  projects: string[];
  contacts: string[];
  user_id: string;
  template_id: number;
}

export const addDetails = async (UsersDetails: any) => {
  const {
    name,
    description,
    skills,
    projects,
    contacts,
    user_id,
    template_id,
  } = UsersDetails;

  try {
    const product = db.collection("UserDetails");
    const existingData = await product.findOne({
      user_id: new ObjectId(user_id),
    });

    if (existingData) {
      // Update existing data
      const updateFields: Partial<UserDetails> = {}; //to save the previously stored content in database
      if (name) updateFields.name = name;
      if (description) updateFields.description = description;

      if (skills) {
        if (existingData.skills === null) {
          updateFields.skills = [...skills];
        } else if (Array.isArray(existingData.skills)) {
          updateFields.skills = [...existingData.skills, ...skills];
        } else {
          console.error("existingData.skills has an unexpected data type.");
        }
      }

      //checking if the project null and if null then creates an array
      if (projects) {
        if (existingData.projects === null) {
          updateFields.projects = [...projects];
        } else if (Array.isArray(existingData.projects)) {
          updateFields.projects = [...existingData.projects, ...projects];
        } else {
          console.error("existingData.projects has an unexpected data type.");
        }
      }

      if (contacts) updateFields.contacts = contacts;
      if (template_id) updateFields.template_id = template_id;

      const updateResult = await product.updateOne(
        { user_id: new ObjectId(user_id) },
        { $set: updateFields }
      );
      return updateResult;
    } else {
      // Insert new data
      const newData = {
        user_id: new ObjectId(user_id),
        name,
        description,
        skills,
        projects,
        contacts,
        template_id,
      };
      const insertResult = await product.insertOne(newData);
      return insertResult;
    }
  } catch (e) {
    throw e;
  }
};

export const deleteSkills = async (skillID: number, user_id: number) => {
  try {
    const _id = new ObjectId(user_id);

    const db = client.db("Portfolio");
    const product = db.collection("UserDetails");

    const result = await product.updateOne(
      { user_id: _id },
      { $pull: { skills: { id: skillID } } }
    );

    return result;
  } catch (e) {
    throw e;
  }
};
export const deleteProjects = async (Project_ID: number, user_id: number) => {
  try {
    const _id = new ObjectId(user_id);

    const db = client.db("Portfolio");
    const product = db.collection("UserDetails");

    const result = await product.updateOne(
      { user_id: _id },
      { $pull: { projects: { id: Project_ID } } }
    );

    return result;
  } catch (e) {
    throw e;
  }
};

export const showDetails = async (userId: any) => {
  try {
    const db = client.db("Portfolio");
    const portfolioDetails = db.collection("UserDetails");
    // Convert userId to ObjectId
    const _id = new ObjectId(userId);

    // Query the database using the objectId
    const data = await portfolioDetails.findOne({ user_id: _id });
    // Return the retrieved data
    if (data) {
      return data;
    } else {
      const _id = new ObjectId("6530b5133f9c1019f4cc64f9");
      const data = await portfolioDetails.findOne({ user_id: _id });
      return data;
    }
  } catch (e) {
    throw e;
  }
};
