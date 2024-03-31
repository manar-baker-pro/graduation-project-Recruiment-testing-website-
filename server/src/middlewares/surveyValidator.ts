import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
export const validateSurvey=(next:NextFunction, req:Request, res:Response)=>{
    body('title').notEmpty().withMessage('Please specify the survey title')
    body('requiredExperiences').isArray({ min: 1 }).withMessage('Please specify at least one required experience'),
    body('requiredExperiences.*.technology').notEmpty().withMessage('Please specify the technology for each experience'),
    body('requiredExperiences.*.experienceLevel').notEmpty().withMessage('Please specify the experience level for each experience'),
    body('expireDate').optional().isISO8601().withMessage('Invalid date format'),
    body('questions').isArray({ min: 1 }).withMessage('Please specify at least one question'),
    body('questions.*.questionType').notEmpty().withMessage('Please specify the question type'),
    body('questions.*.questionText').notEmpty().withMessage('Please specify the question text'),
    body('questions.*.questionType').custom((value, { req }) => {
      if (value === 'radio' || value === 'checkbox') {
        if (!req.body.questions[0].options || req.body.questions[0].options.length < 2) {
          throw new Error('The question must have at least two options');
        }
      }
      return true;
    }).withMessage('Please specify the question type and provide at least two options')
    next();
};
