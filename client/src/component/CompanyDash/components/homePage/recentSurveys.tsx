import React, { useEffect } from "react";
import styles from "../companyDshHome.module.css";
import { CssBaseline } from "@mui/material";
import Container from "@mui/material/Container";
import CardRecentSurvey from "./cardRecentSurvey";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../setup/store/store";
import { getRecents } from "../../../../setup/store/actionsCreators/surveyActionCreators/survey.actionCreator";
export default function MAINBODY() {
  const dispatch = useDispatch();
  const surveyReducer = useSelector((state: RootState) => state.surveyReducer);
  const { surveyData } = surveyReducer;

  useEffect(() => {
    dispatch(getRecents());
  }, [dispatch]);
  useEffect(() => {
    console.log(surveyData);
  }, [surveyData]);
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={styles.recentSurveyContainer}>
        <div
          className={styles.titleSection}
          style={{ padding: "10px", marginLeft: "0" }}
        >
          Recent Survey
        </div>
        <div className={styles.surveysRecent}>
          {}
          {surveyData?.map((surveyItem, indexSurvey) => (
            <CardRecentSurvey key={indexSurvey} surveyItem={surveyItem} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
