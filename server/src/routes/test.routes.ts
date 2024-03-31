import express from "express";
import TestController from "../controllers/test.controllers";

export class TestRoutes {
  public path = "/tests";
  public router = express.Router();
  testController: TestController = new TestController();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.get(
      "/",
      // [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      this.testController.getAllTests
    );
    // this.router.get(
    //   "/:id",
    //   // [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
    //   this.testController.getTestById
    // );
    this.router.post(
      "/",
      // [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      this.testController.createTest
    );
    this.router.put(
      "/:id",
      // [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      this.testController.updateTest
    );
    this.router.delete(
      "/:id",
      // [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      this.testController.deleteTest
    );
  
  }
}
