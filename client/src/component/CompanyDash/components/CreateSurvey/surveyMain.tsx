import React from "react";
import TAB from "./tabs";
import styles from "./survey.module.css"
import SurveyComp from "./survey";
export default function SURVEYMAIN() {
  return (
    <div className={styles.createSurveyContainer}>
      <div
        className={styles.titleSection}
        style={{ padding: "10px", marginLeft: "0" }}
      >
        New Job Survey
      </div>
      <SurveyComp/>
    </div>
  );
}
