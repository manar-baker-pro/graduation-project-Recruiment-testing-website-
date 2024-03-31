import { NextFunction, Request, Response } from "express";
import TestServices from "../services/test.services";
import { ApiError } from "../lib/ErrorHandling/apiError.lib";

export default class TestController {
  testServices: TestServices = new TestServices();

  createTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("from createTest");
      const testData = req.body;
      console.log(testData);
      const test = await this.testServices.createTest(testData);
      return res.status(200).send(test);
    } catch (error) {
      console.log(error);
      next(ApiError.InternalServerError({ message: "Failed to create test" }));
    }
  };

  getAllTests = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("from getAllTests");
      const tests = await this.testServices.getAllTests();
      return res.status(200).send(tests);
    } catch (error) {
      next(
        ApiError.InternalServerError({ message: "Failed to get all tests" })
      );
    }
  };

  updateTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("from updateTest");
      const { testId } = req.params;
      const { updatedData } = req.body;
      const test = await this.testServices.updateTest(testId, updatedData);
      return res.status(200).send(test);
    } catch (error) {
      next(ApiError.InternalServerError({ message: "Failed to update test" }));
    }
  };

  // getTestById = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     console.log("from getTestById");
  //     const { id } = req.params;
  //     console.log(req.session?.tests);
  //     console.log(req.sessionID+"====================================");
  //     if (req.session?.tests) {
  //       const storedTest = req.session?.tests.find(
  //         (test: any) => test.id === id
  //       );
  //       if (storedTest) {
  //         const { data } = storedTest;
  //         console.log(
  //           data + "from session====================================="
  //         );
  //         return res.status(200).send(data);
  //       }
  //     }

  //     const test = await this.testServices.getTestById(id);
  //     const newTest = { id, data: test };
  //     req.session.tests = [...(req.session.tests || []), newTest];
  //     req.session.save();
  //     console.log(req.session.tests);
  //     return res.status(200).send(test);
  //   } catch (error) {
  //     next(
  //       ApiError.InternalServerError({ message: "Failed to get test by ID" })
  //     );
  //   }
  // };

  deleteTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("from deleteTest");
      const { testId } = req.params;
      const test = await this.testServices.deleteTest(testId);
      return res.status(200).send(test);
    } catch (error) {
      next(ApiError.InternalServerError({ message: "Failed to delete test" }));
    }
  };
}
