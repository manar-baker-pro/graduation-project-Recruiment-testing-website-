import SurveyService from "../services/survey.services";
const surveyService: SurveyService = new SurveyService();
import cron from "node-cron";
export const cronExpireConfig = (cronJop: typeof cron) => {
  cronJop.schedule("* * * * *", () =>
    // surveyService.updateSurveyStatus
    console.log("from cron configg")
  );
};
