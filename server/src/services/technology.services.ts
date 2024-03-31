import { Request, Response, NextFunction } from "express";
import TechnologyModel from "../models/technology.models";
import { Technology } from "../interfaces/technology.interfaces";
import { ApiError } from "../lib/ErrorHandling/apiError.lib";
import SurveyModel from "../models/survey.models";
export default class TechnologyService {
  CreateTechnology = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log("from tech services");
      console.log(req.body);
      const technologyExist = await TechnologyModel.findOne({
        TechnologyName: req.body.TechnologyName,
      });
      console.log(technologyExist);
      if (technologyExist)
        return next(
          ApiError.Forbidden({ message: "technology already Exist " })
        ); // 403 not exist
      const technology = new TechnologyModel({
        TechnologyName: req.body.TechnologyName,
        description: req.body.description,
        picture: req.body.picture,
      });
      await technology.save();
      console.log(technology);

      return res.status(200).send(technology);
    } catch (err) {
      console.error(err);
      return next(
        ApiError.InternalServerError({
          message: "Failed  Get Technology ",
        })
      );
    }
  };
  getAllTechnologies = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const technologies: Technology[] = await TechnologyModel.find(
        {},
        { createdAt: 0 }
      );
      console.log(technologies);
      return res.status(200).json(technologies);
    } catch (err) {
      console.error(err);
      return next(
        ApiError.InternalServerError({
          message: "Failed  Get Technology ",
        })
      );
    }
  };
  getTechnology = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const technology: Technology | null = await TechnologyModel.findById(
        req.params.id
      );
      if (!technology)
        return next(ApiError.BadRequest({ message: "technology Not Found" }));
      res.status(200).json(technology);
    } catch (err) {
      console.error(err);
      return next(
        ApiError.InternalServerError({
          message: "Failed  Get All Technologies ",
        })
      );
    }
  };
  updateTechnology = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { TechnologyName, description, picture } = req.body;

    try {
      const updatedTechnology: Technology | null = await TechnologyModel.findByIdAndUpdate(
        req.params.id,
        { TechnologyName, description, picture },
        { new: true }
      );
      if (!updatedTechnology)
        return next(ApiError.BadRequest({ message: "technology Not Found" }));
      return res
        .status(200)
        .json(updatedTechnology)
        .send({ message: "Technology created successfully" });
    } catch (err) {
      console.error(err);
      return next(
        ApiError.InternalServerError({
          message: "Failed  Update technology ",
        })
      );
    }
  };

  deleteTechnology = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {}
  //   try {
  //     const deletedTechnology: Technology | null = await TechnologyModel.findByIdAndRemove(
  //       req.params.id
  //     );
  //     if (!deletedTechnology) {
  //       return next(ApiError.BadRequest({ message: "Technology Not Found" }));
  //     }

  //     await SurveyModel.updateMany(
  //       { "requiredExperiences.technology": req.params.id },
  //       { $pull: { requiredExperiences: { technology: req.params.id } } }
  //     );

  //     return res
  //       .status(200)
  //       .json(deletedTechnology)
  //       .send({ message: "Technology deleted successfully" });
  //   } catch (err) {
  //     console.error(err);
  //     return next(
  //       ApiError.InternalServerError({ message: "Failed to delete technology" })
  //     );
  //   }
  // };
}
