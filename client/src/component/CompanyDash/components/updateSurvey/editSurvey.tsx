import React, { useEffect } from "react";
import SurveyComp from "../CreateSurvey/survey";
import styles from "../companyDshHome.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../setup/store/store";
import { useParams } from "react-router-dom";
import { Survey } from "../../../../setup/store/reducers/surveyReducer/surveyReducerModels";
export default function EditSurvey() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const surveyReducer = useSelector((state: RootState) => state.surveyReducer);
  const { surveyData } = surveyReducer;
  const [desiredSurvey, setDesiredSurvey] = React.useState<Survey>({
    title: "Job Title",
    description: "",
    requiredExperiences: [],
    questions: [],
  });
  useEffect(() => {
    const des = surveyData?.find((survey) => survey._id === id);
    des &&
      setDesiredSurvey({
        title: des.title,
        description: des.description,
        requiredExperiences: des.requiredExperiences
          ? des.requiredExperiences
          : [],
        questions: des?.questions,
      });
 
  }, [surveyData, id]);
  useEffect(() => {
    console.log(desiredSurvey);
  }, [desiredSurvey]);

  return (
    <div className={styles.createSurveyContainer}>
      <div
        className={styles.titleSection}
        style={{ padding: "10px", marginLeft: "0" }}
      >
        New Job Survey
      </div>
      <SurveyComp surveyUp={desiredSurvey ? desiredSurvey : ""} />
    </div>
  );
}
