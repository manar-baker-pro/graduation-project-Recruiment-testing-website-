import express from "express";
import { body } from "express-validator";
import AuthControllers from "../controllers/auth.controllers";
import { corsConfig } from "../configs/CORS";
import { confirmMiddle } from "../middlewares/confirm.middleware";
import { confirmCompMiddle } from "../middlewares/confirmCompany.middleware";
import { apiErrorHandler } from "../middlewares/addErrorHandelig.middlewares";
export default class AuthRoutes {
  authControllers: AuthControllers = new AuthControllers();
  path = "/auth";
  public router = express.Router();
  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes = () => {
    this.router.post(
      "/register",
      corsConfig,
      body("username").isString().isLength({ min: 8, max: 255 }),
      body("email").isEmail().isLength({ min: 8, max: 255 }),

      // body("password")
      //   .isStrongPassword({
      //     minLength: 8,
      //     minLowercase: 1,
      //     minUppercase: 1,
      //     minNumbers: 1,
      //     minSymbols: 1,
      //     returnScore: false,
      //     pointsPerUnique: 1,
      //     pointsPerRepeat: 0.5,
      //     pointsForContainingLower: 10,
      //     pointsForContainingUpper: 10,
      //     pointsForContainingNumber: 10,
      //     pointsForContainingSymbol: 10,
      //   })
      //   .custom((value, { req }) => {
      //     if (value !== req.body.password) {
      // req.send("Password or Email Not validated ");
      //       console.log("Password or Email Not validated ");
      //     }
      //   }),
      // body("passwordConfirmation").custom((value, { req }) => {
      //   if (value !== req.body.password) {
      //     req.send("Passwordconfirmed not matched to password ");
      //     console.log("Passwordconfirmed not matched to password ");
      //   }
      // }),
      this.authControllers.registerController
    );
    this.router.post(
      "/registerComp",
      corsConfig,
      body("recruitmentOfficer").isString().isLength({ min: 8, max: 255 }),
      body("companyName").isString().isLength({ min: 3, max: 255 }),
      body("emailWork").isEmail().isLength({ min: 8, max: 255 }),
      // body("password")
      //   .isStrongPassword({
      //     minLength: 8,
      //     minLowercase: 1,
      //     minUppercase: 1,
      //     minNumbers: 1,
      //     minSymbols: 1,
      //     returnScore: false,
      //     pointsPerUnique: 1,
      //     pointsPerRepeat: 0.5,
      //     pointsForContainingLower: 10,
      //     pointsForContainingUpper: 10,
      //     pointsForContainingNumber: 10,
      //     pointsForContainingSymbol: 10,
      //   })
      //   .custom((value, { req }) => {
      //     if (value !== req.body.password) {
      // req.send("Password or Email Not validated ");
      //       console.log("Password or Email Not validated ");
      //     }
      //   }),
      // body("passwordConfirmation").custom((value, { req }) => {
      //   if (value !== req.body.password) {
      //     req.send("Passwordconfirmed not matched to password ");
      //     console.log("Passwordconfirmed not matched to password ");
      //   }
      // }),
      this.authControllers.registerCompController
    );
    this.router.put("/confirmed", confirmMiddle);
    this.router.put("/confirmedComp", confirmCompMiddle);
    this.router.get("/confirmedOk", this.authControllers.confirmedController);
    this.router.get(
      "/confirmedCompOk",
      this.authControllers.confirmedCompController
    );
    this.router.post(
      "/login",
      corsConfig,
      // apiErrorHandler,
      this.authControllers.loginController
    );
    this.router.post(
      "/logout",
      corsConfig,
      // apiErrorHandler,
      this.authControllers.logoutController
    );
  };
}
