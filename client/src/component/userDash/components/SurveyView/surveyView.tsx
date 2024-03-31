import React, { useEffect, useState } from "react";
import styles from "../../userDash.module.css";
import { Avatar, Button, Divider, TextareaAutosize } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../setup/store/store";
import { Answer } from "../../../../setup/store/reducers/responsesReducers/responsesReducer.interface";
import { addResponseSurvey } from "../../../../setup/store/actionsCreators/responsesActionCreators/responses.actionsCreators";
import PdfViewerComponent from "../../../../setup/globalConfig/cloudinaryHandleFile"
import UploadFileComponent from "../../../../setup/globalConfig/cloudinaryHandleFile";
export default function SurveyView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const surveyReducer = useSelector((state: RootState) => state.surveyReducer);
  const { surveyData } = surveyReducer;
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [fileUploaded, setFileUploaded] = useState<string>("");
  const surveyItem = surveyData?.find((survey) => survey._id === id);
  const handleAnswerChange = (name:string,value:string,ques: any,event?:any) => {
  
    console.log(event?.target.checked, event?.target.value);
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.questionId === name
      );
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        if (ques.questionType === "checkBox" && event?.target.checked) {
          updatedAnswers[existingAnswerIndex].answer = [
            ...updatedAnswers[existingAnswerIndex].answer,
            value,
          ];
        } else if (ques.questionType === "checkBox" && !event.target.checked) {
          updatedAnswers[existingAnswerIndex].answer = (
            updatedAnswers[existingAnswerIndex].answer as string[]
          ).filter((item: string) => item !== value);
        } else {
          updatedAnswers[existingAnswerIndex] = {
            questionId: name,
            answer: value,
          };
        }

        return updatedAnswers;
      } else {
        if (ques.questionType === "checkBox" && event.target.checked) {
          return [
            ...prevAnswers,
            { questionId: name, answer: [...answers, event.target.value] },
          ];
        }
        return [...prevAnswers, { questionId: name, answer: value }];
      }
    });
    console.log(answers);
  };
  const handleUploadFile=(value:string)=>{
    setFileUploaded(value)
  }
  const handelAnswerSubmit = () => {
    surveyItem?._id&&dispatch(addResponseSurvey(surveyItem?._id, answers));
    console.log(answers);
  };

  return (
    <div className={styles.surveyViewContainer}>
      <div className={styles.surveyGlobalInfo}>
        <div style={{ margin: "20px 0" }}>{surveyItem?.title}</div>
        <Divider />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          <div>
            Made By:{" "}
            {surveyItem && "companyName" in surveyItem.createdBy
              ? surveyItem.createdBy.companyName
              : ""}{" "}
            ,{" "}
            <span style={{ textTransform: "lowercase" }}>
              {surveyItem && "emailWork" in surveyItem.createdBy
                ? surveyItem.createdBy.emailWork
                : ""}{" "}
            </span>
          </div>
          <Avatar
            style={{
              width: "40px",
              height: "40px",
              position: "relative",
            }}
            variant="square"
            sx={{ border: "1px solid black" }}
            src={surveyItem?.createdBy?.profilePic}
          >
            T
          </Avatar>
        </div>
      </div>
      <div>
        {surveyItem?.questions.map((ques, indexQues) => {
          return (
            <div
              className={styles.surveyGlobalInfo}
              key={indexQues}
              style={{
                border: "0px",
                borderLeft: "8px solid rgb(255, 153, 0)",
              }}
            >
              <div>{ques.questionText}</div>
              {ques.questionType === "text" && (
                <TextareaAutosize
                  name={ques._id}
                  aria-label="answerText"
                  minRows={1}
                  placeholder="Enter your answer"
                  style={{
                    width: "95%",
                    padding: "4px",
                    resize: "none",
                    border: "none",
                    borderBottom: "1px solid #494949",
                    paddingLeft: "2px",
                    marginTop: "10px",
                  }}
                  onChange={(e) => handleAnswerChange(e.target.name,e.target.value,ques,e )}
                />
              )}
              {ques.questionType === "file" && (
                <label htmlFor="upload-image">
                  <UploadFileComponent ques={ques} handleAnswerChange={handleAnswerChange}/>
                </label>
              )}
              {(ques.questionType === "checkBox" ||
                ques.questionType === "radio") && (
                <div>
                  {ques.options.map((op, indexOp) => {
                    return (
                      <div key={indexOp} style={{ display: "flex" }}>
                        <input
                          name={ques._id}
                          type={ques.questionType}
                          value={op.optionText}
                          style={{ marginRight: "10px" }}
                          onChange={(e) => handleAnswerChange(e.target.name,e.target.value,ques,e)}
                          />
                        <div>{op.optionText}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        <div
          style={{ width: "60%", backgroundColor: "red", margin: "10px auto" }}
        >
          <Button
            variant="contained"
            type="submit"
            style={{ margin: "10px auto" }}
            onClick={handelAnswerSubmit}
          >
            send
          </Button>
        </div>
      </div>
    </div>
  );
}
