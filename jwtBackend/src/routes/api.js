/**
 * tra ve cac api cho client gan giong voi controller
 * tuy nhien no cung cap cho cac website o phia client
 * file web se cung cap cac router cho website o phia serverside
 */

/**file dieu huong thong thuong se viet o day*/

import express from "express";
import apiController from "../controller/apiController";
import groupController from "../controller/groupController";
import userController from "../controller/userController";

const router = express.Router();

/** khoi tao nhung api cung cap cho client */
const initApiRoutes = (app) => {
  router.get("/test-api", apiController.testApi);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  router.get("/user/read", userController.readFunc);
  router.post("/user/create", userController.createFunc);
  router.put("/user/update", userController.updateFunc);
  router.delete("/user/delete", userController.deleteFunc);

  router.get("/group/read", groupController.readFunc);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
