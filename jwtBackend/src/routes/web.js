/**file dieu huong thong thuong se viet o day*/

import express from "express";
import homeController from "../controller/homeController";
const router = express.Router();

/** khoi tao nhung route trong day */
const initWebRoutes = (app) => {
  router.get("/", homeController.handleHelloWorld);
  router.get("/user", homeController.handleUserPage);
  router.post("/users/create-user", homeController.handleCreateNewUser);
  // :id dau : la tham so dong co ten la id
  router.post("/delete-user/:id", homeController.handleDeleteUser);

  return app.use("/", router);
};

export default initWebRoutes;
