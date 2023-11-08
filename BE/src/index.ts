import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { env } from "./config";
import routes from "./User";
import middleware from "./User/middleware/error";
import { addDetails } from "./User/Repository";
const swaggerUi = require("swagger-ui-express");
const swaggeroutput = require("./swagger-output.json");
const path = require("path");

dotenv.config();

declare namespace Express {
  interface Request {
    file?: any;
  }
}

const app: Express = express();
const port = process.env.PORT;
const http = require("http");

// multer
const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb+srv://barsha:test123@cluster0.4rnjqa0.mongodb.net/";
const client = new MongoClient(uri);
const db = client.db("Portfolio");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "Images");
  },
  filename: (req: any, file: any, cb: any) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// bodyparser for json to string and cors for frontend backend connection
app.use(bodyParser.json());
app.use(cors());
app.use("/user", routes());
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggeroutput));
app.use("/images", express.static(path.join("/", "images")));

const server = http.createServer(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Server connected");
});

// multer
app.get("/upload", (req, res) => {
  res.render("upload");
});

app.post(
  "/upload",
  upload.single("image")
  // async (req: Request, res: Response) => {
  //   if (!req.file) res.send("no image");
  //   const image = req.file.filename;
  //   res.send("Image Uploaded");
  // }
);

app.all("*", function (req, res) {
  res.status(404).send("Path not found");
});

app.use(middleware);

// app.listen(port, () => {
server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:4000`);
});
