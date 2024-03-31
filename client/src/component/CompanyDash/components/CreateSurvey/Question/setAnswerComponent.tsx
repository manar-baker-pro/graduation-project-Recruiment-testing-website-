import React from "react";
import styles from "../survey.module.css";
import { AccordionDetails, Button } from "@mui/material";
import QuestionContent from "./questionContent";
import { ShortTextOutlined } from "@mui/icons-material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
export default function SetAnswerComponent(props: any) {
  const { ques, index } = props;
  const { setOptionAnswer, answerDone,setOptionPoint } = props;
  return (
    <AccordionDetails className={styles.addQuestion}>
      {ques.questionType !== "radio" || ques.questionType !== "checkbox" ? (
        <div className={styles.topHeader}>Choose the correct answer</div>
      ) : (
        ""
      )}
      <div>
        <QuestionContent ques={ques} index={index} disabled />

        {ques.options.map((option: any, indexOp: number) => (
          <div
            className={styles.addQuestionBody}
            key={indexOp}
            style={{
              marginLeft: "10px",
              marginBottom: "10px",
              marginTop: "5px",
            }}
          >
            <div key={indexOp}>
              <div style={{ display: "flex" }}>
                <div className={styles.formCheck}>
                  <label
                    style={{ fontSize: "13px" }}
                    onClick={() => {
                      setOptionAnswer(index, option.optionText);
                    }}
                  >
                    {ques.questionType !== "text" ? (
                      <input
                        type={ques.questionType}
                        value={option.optionText}
                        name={ques.questionText}
                        className={styles.formCheckInput}
                        style={{
                          marginRight: "10px",
                          marginTop: "5px",
                          marginBottom: "10px",
                        }}
                      />
                    ) : (
                      <ShortTextOutlined style={{ marginRight: "10px" }} />
                    )}
                    {ques.options[indexOp].optionText}
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.addQuestionBody}></div>
      <div className={styles.addQuestionBottom}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          style={{
            textTransform: "none",
            fontSize: "12px",
            color: "#4228f4",
            marginTop: "12px",
            fontWeight: "600",
          }}
          onClick={() => answerDone(index)}
        >
          Done
        </Button>
      </div>
    </AccordionDetails>
  );
}
