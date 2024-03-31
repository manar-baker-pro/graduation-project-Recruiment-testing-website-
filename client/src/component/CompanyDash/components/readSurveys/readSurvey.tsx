import React, { useEffect, useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../setup/store/store";
import styles from "../companyDshHome.module.css";
import { getSurveys } from "../../../../setup/store/actionsCreators/surveyActionCreators/survey.actionCreator";
import { SurveyRecived } from "../../../../setup/store/reducers/surveyReducer/surveyReducerModels";
import { useNavigate } from "react-router-dom";
export const READONLINESURVEYS: React.FC = () => {
  const dispatch = useDispatch();
  const surveyReducer = useSelector((state: RootState) => state.surveyReducer);
  const { surveyData } = surveyReducer;
  const [filter, setFilter] = useState<string>("all");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("from useeffect");
    dispatch(getSurveys(filter));
    // console.log(surveyData);
  }, [dispatch, filter]);
  useEffect(() => {
    console.log(surveyData);
  }, [surveyData]);
  return (
    <div className={styles.readSurveysContainer}>
      <h2 className={styles.headerCompDshTitle}>Your Created Survey</h2>
      <div className={styles.surveyFilterContainer}>
        <FormControl
          component="fieldset"
          style={{ display: "flex", paddingLeft: "10px" }}
        >
          <FormLabel component="legend">Filter Survey:</FormLabel>
          <RadioGroup
            row
            aria-label="filter"
            name="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <FormControlLabel value="all" control={<Radio />} label="All " />
            <FormControlLabel
              value="expired"
              control={<Radio />}
              label="Expired"
            />
            <FormControlLabel
              value="available"
              control={<Radio />}
              label="Available"
            />
          </RadioGroup>
        </FormControl>

        <div className={styles.containerListSurveys}>
          {surveyData?.map((survey: any, IndexSurvey: number) => {
            return (
              <div
                key={IndexSurvey}
                className={styles.itemSurveyContanier}
                onClick={() => {
                  navigate(`/companyDash/surveyDetails/${survey._id}`);
                }}
              >
                <div className={styles.itemSurveyTech}>
                  {survey?.requiredExperiences?.map(
                    (tech: any, indexTech: number) => {
                      return (
                        <div key={indexTech}>
                          <img
                            key={indexTech}
                            src={tech.technology.picture}
                            alt=""
                            className={styles.techPicture}
                          />
                          {/* {tech.experienceLevel} */}
                        </div>
                      );
                    }
                  )}
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h2 className={styles.itemSurveyTitle}>{survey.title}</h2>
                </div>
                <div className={styles.surveyStatistics}>
                  <div className={styles.responsesSchedule}>
                    {" "}
                    <EditRoundedIcon
                      style={{
                        fontSize: "14px ",
                        fontWeight: " 500",
                        color: "#71778b",
                        marginRight: " 3px",
                        marginTop: "3px",
                      }}
                    />
                    <h6>
                      <span style={{ margin: "0 5px" }}>
                        {survey.responseCount}
                      </span>
                      Responses{" "}
                    </h6>
                  </div>

                  <div className={styles.surveyDate}>{survey.createdAt}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
