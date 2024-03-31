import React from "react";
import styles from "../../userDash.module.css";
import { Storage } from "@mui/icons-material";
export default function CardMatchedSurvey(props: any) {
  return (
    <div className={styles.card}>
      <div
        className={`${styles.cardImage} ${styles.template}`}
        style={{
          background: `url(${props.surveyItem.createdBy.profilePic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>{" "}
      <div>
        <h5
          className={styles.cardTitle}
          style={{
            textAlign: "center",
            marginLeft: "0px",
            fontSize: "16px",
          }}
        >
          {props.surveyItem.title}
        </h5>
        <div className={styles.docContent}>
          <div className={styles.contentLeft}>
            <Storage
              style={{
                fontSize: "16px",
                color: "white",
                backgroundColor: "#6e2594",
                padding: "2px",
                marginRight: "6px",
                borderRadius: "2px",
              }}
            />
            <span style={{ fontSize: "13px", color: "gray", padding: "0" }}>
              {props.surveyItem.createdAt}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
