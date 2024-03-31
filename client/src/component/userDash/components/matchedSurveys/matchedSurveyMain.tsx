import React, { useEffect, useState } from "react";
import styles from "../../userDash.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../setup/store/store";
import { getAvailbleSurvey } from "../../../../setup/store/actionsCreators/surveyActionCreators/survey.actionCreator";
import CardMatchedSurvey from "./cardSurveyMatched";
import ModelSurveyInfo from "./modelSurveyInfo";
export default function MatchedSurveyMain() {
  const dispatch = useDispatch();
  const surveyReducer = useSelector((state: RootState) => state.surveyReducer);
  const { surveyData } = surveyReducer;

  useEffect(() => {
    console.log("from useeffect");
    dispatch(getAvailbleSurvey());
  }, [dispatch]);
  useEffect(() => {
    console.log(surveyData);
  }, [surveyData]);

  return (
    <div className={styles.matchedSurveyContaner}>
      <div className={styles.surveysAv}>
        {surveyData?.map((survey, indexSurvey) => {
          return <ModelSurveyInfo surveyItem={survey} key={indexSurvey} />;
        })}
      </div>
    </div>
  );
}
