import React from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Question,
  Survey,
} from "../../../../../setup/store/reducers/surveyReducer/surveyReducerModels";
import {
  AddCircleOutline,
  CropOriginalOutlined,
  DragIndicatorRounded,
  FilterNoneOutlined,
  MoreVertOutlined,
  OndemandVideoRounded,
  TextFieldsOutlined,
} from "@mui/icons-material";
import styles from "../survey.module.css";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import QuestionContent from "./questionContent";
import OptionsComponent from "./optionComponent";
import SetAnswerComponent from "./setAnswerComponent";
import FooterQues from "./footerQues";
export default function QuestionComponent(props: any) {
  const { survey } = props;
  const {
    handleExpand,
    addOption,
    copyQuestion,
    answerDone,
    addQuestion,
    requiredQues,
    removeQuestion,
    handleMouseEnter,
    handleMouseLeave,
    handleChangeOption,
    handleClickQuesType,
    handleChangeQues,
    removeOption,
    setOptionAnswer,
    setOptionPoint,
  } = props;
  return survey.questions.map((ques: Question, index: number) => (
    <Draggable key={index} draggableId={index + "id"} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={styles.questionContainer}>
            <div className={styles.indicatorQuestion}>
              <DragIndicatorRounded
                style={{
                  transform: "rotate(-90deg)",
                  color: "#dae0e2",
                }}
                fontSize="small"
              />
            </div>
            {/* ===================================== */}
            <Accordion
              expanded={ques.open}
              className={ques.open ? styles.addBorder : ""}
              onChange={() => handleExpand(index)}
              key={index}
            >
              {survey.questions[index].open ? (
                <div className={styles.questionBoxes}>
                  <AccordionDetails className={styles.addQuestion}>
                    <QuestionContent
                      ques={ques}
                      index={index}
                      handleClickQuesType={handleClickQuesType}
                      handleChangeQues={handleChangeQues}
                      setOptionPoint={setOptionPoint}
                    />
                    {ques.questionType !== "text" &&
                    ques.questionType !== "file" ? (
                      <OptionsComponent
                        ques={ques}
                        index={index}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        handleChangeOption={handleChangeOption}
                        removeOption={removeOption}
                        setOptionPoint={setOptionPoint}
                        setOptionAnswer={setOptionAnswer}
                      />
                    ) : ques.questionType === "text" ? (
                      <input
                        disabled
                        placeholder="long answer text"
                        type={ques.questionType}
                        className={styles.textInput}
                        style={{
                          width: "80%",
                          padding: "10px",
                          borderBottom: "1px dotted  gray",
                          height: "auto",
                          marginBottom: "20px",
                        }}
                      />
                    ) : ques.questionType === "file" ? (
                      <div>
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: "600",
                            padding: "10px 0",
                          }}
                        >
                          Let respondents upload files to Cloudinary
                        </div>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "400",
                            padding: "10px 0",
                          }}
                        >
                          Files will be uploaded to the form owner's Google
                          Drive. Respondents will be required to sign in to
                          Google when file upload questions are added to a form.
                          Please only share this form with people you trust.
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                    {ques.options.length < 5 &&
                      ques.questionType !== "text" &&
                      ques.questionType !== "file" && (
                        <div>
                          <Button
                            style={{
                              fontSize: "10px !important",
                              textTransform: "none",
                              color: "#4285f4",
                              fontWeight: "600",
                            }}
                            onClick={() => addOption(index)}
                          >
                            Add Option
                          </Button>
                        </div>
                      )}
                    <Divider />
                    <FooterQues
                      index={index}
                      requiredQues={requiredQues}
                      copyQuestion={copyQuestion}
                      removeQuestion={removeQuestion}
                      answerDone={answerDone}
                      setOptionPoint={setOptionPoint}
                      ques={ques}
                    />
                  </AccordionDetails>

                  <div className={styles.questionEdit}>
                    <AddCircleOutline
                      className={`${styles.edit} ${styles.shareIcon}`}
                      onClick={addQuestion}
                    />
                    <OndemandVideoRounded className={styles.edit} />
                    <CropOriginalOutlined className={styles.edit} />
                    <TextFieldsOutlined className={styles.edit} />
                  </div>
                </div>
              ) : (
                <AccordionSummary
                  aria-controls="panela-content"
                  id="panela-Header"
                  style={{
                    width: "100%",
                    boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div className={styles.savedQues}>
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontWeight: "400",
                        letterSpacing: "1px",
                        lineHeight: "24px",
                        paddingBottom: "8px",
                      }}
                    >
                      {index + 1 + "-" + ques.questionText}
                    </Typography>
                    {ques.questionType === "radio" ||
                    ques.questionType === "checkbox" ? (
                      ques.options.map((option, indexOp) => (
                        <div key={indexOp}>
                          <div style={{ display: "flex" }}>
                            <FormControlLabel
                              style={{
                                marginLeft: "5px",
                                marginBottom: "5px",
                              }}
                              disabled
                              control={
                                <input
                                  type={ques.questionType}
                                  color="primary"
                                  style={{ marginRight: "3px" }}
                                  required={ques.required}
                                />
                              }
                              label={
                                <Typography
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "400",
                                    letterSpacing: ".2px",
                                    lineHeight: "20px",
                                    color: "#202124",
                                  }}
                                >
                                  {option.optionText}
                                </Typography>
                              }
                            />
                          </div>
                        </div>
                      ))
                    ) : ques.questionType === "file" ? (
                      <div>
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: "600",
                            padding: "10px 0",
                          }}
                        >
                          Let respondents upload files to Drive
                        </div>
                        {/* <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "400",
                              padding: "10px 0",
                            }}
                          >
                            Files will be uploaded to the form owner's Google
                            Drive. Respondents will be required to sign in to
                            Google when file upload questions are added to a
                            form. Please only share this form with people you
                            trust.
                          </p> */}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </AccordionSummary>
              )}
            </Accordion>
          </div>
        </div>
      )}
    </Draggable>
  ));
}
