import { Router } from "express";

import * as UserController from "./Controller";
import * as Middleware from "./middleware";

const router = Router();

const routes = () => {
  router.post("/api/login", UserController.apiLogin);

  // login and register
  router.post("/db/api/register", UserController.register);
  router.post("/db/api/login", UserController.dbLogin);
  router.post("/db/api/signup", UserController.dbSignup);
  router.post("/db/api/forgetpw", UserController.forgetPassword);
  router.post(
    "/db/api/reset",
    Middleware.authenticate,
    UserController.ResetPassword
  );
  router.post("/auth", Middleware.authenticate);

  // For portfolio
  router.post("/addDetails", UserController.addDetails);
  router.get("/showDetails", UserController.showDetails);
  router.delete("/deleteSkills", UserController.deleteSkills);
  router.delete("/deleteProjects", UserController.deleteProjects);

  return router;
};

export default routes;
