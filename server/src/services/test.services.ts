import mongoose from "mongoose";
import { Test } from "../interfaces/test.interface";
import TestModel from "../models/test.models";
import { NextFunction, Response } from "express";
import { ApiError } from "../lib/ErrorHandling/apiError.lib";

export default class TestServices {
  createTest = async (testData: Test): Promise<Test> => {
    console.log(testData);
    const test = new TestModel({
      ...testData,
      technology: testData.technology._id,
    });
    const createdTest = await test.save();
    return createdTest;
  };
  getTestById = async (testId: string): Promise<Test | null> => {
    // const testIdCon = new mongoose.Types.ObjectId(testId);
    console.log(testId + "from ser");
    const test = await TestModel.findById(testId).populate("technology");
    console.log(test);
    return test;
  };
  getAllTests = async (): Promise<Test[]> => {
    const tests = await TestModel.find();
    return tests;
  };
  updateTest = async (
    testId: string,
    updatedData: Partial<Test>
  ): Promise<Test | null> => {
    const updatedTest = await TestModel.findByIdAndUpdate(testId, updatedData, {
      new: true,
    });
    return updatedTest;
  };
  deleteTest = async (testId: string): Promise<boolean> => {
    const deletedTest = await TestModel.findByIdAndDelete(testId);
    return deletedTest !== null;
  };

  calculateScore = async (
    testId: string,
    userAnswers: any,
    res: Response,
    next: NextFunction
  ) => {
    console.log(testId + "from score i recv" + userAnswers);
    try {
      const test = await TestModel.findById(testId);

      if (!test) {
        return next(ApiError.NotFound({ message: "Test Not found" }));
      }
      let totalScore = 0;
      let score = 0;
      for (let i = 0; i < test.questionsTest.length; i++) {
        totalScore += test.questionsTest[i].points;
        const correctOption = test.questionsTest[i].options.find(
          (option) => option.isTrue
        );
        if (
          correctOption &&
          userAnswers[i].optionAnswered === correctOption.optionText
        ) {
          score += test?.questionsTest[i].points;
        }
      }
      // const totalQuestions = test.questionsTest.length;
      const percentage = (score / totalScore) * 100;
      console.log(
        totalScore + "totalScore" + percentage + "percentage"
      );

      return percentage;
    } catch (error) {
      console.error(error + "from totalTest");
      return ApiError.InternalServerError({ message: "Failed to add test" });
    }
  };
}
