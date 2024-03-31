import React from "react";
import styles from "../survey.module.css";
import {
  CheckBoxOutlined,
  CropOriginalOutlined,
  RadioButtonChecked,
  SubjectOutlined,
} from "@mui/icons-material";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { MenuItem, Select } from "@mui/material";
export default function QuestionContent(props: any) {
  const { ques, index } = props;
  const { handleChangeQues, handleClickQuesType, setOptionPoint } = props;
  return (
    <div key={index} className={styles.addQuestionTop}>
      <input
        type="text"
        className={styles.question}
        placeholder="Question"
        value={ques.questionText}
        name="questionText"
        onChange={(e) => handleChangeQues(e, index)}
      />
      {!ques.answer ? (
        <>
          <CropOriginalOutlined style={{ color: "#5f636b" }} />
          <Select
            className={styles.selectComp}
            value={ques.questionType}
            style={{ color: "#5f636b",fontSize:"16px" }}
          >
            <MenuItem
              id="text"
              value="text"
              className={styles.menuItem}
              onClick={(e) => handleClickQuesType(e, index, "text")}
            >
              <SubjectOutlined
                style={{
                 
                  marginRight: "10px",
                  color: "#70757a",
                  fontSize: "18px",
                }}
              />
              Paragraph
            </MenuItem>
            <MenuItem
              id="checkBox"
              className={styles.menuItem}
              value="checkBox"
              onClick={(e) => handleClickQuesType(e, index, "checkBox")}
            >
              <CheckBoxOutlined
                style={{
                  marginRight: "10px",
                  fontSize: "18px",
                }}
              />
              Checkboxes
            </MenuItem>
            <MenuItem
              id="radio"
              className={styles.menuItem}
              value="radio"
              onClick={(e) => handleClickQuesType(e, index, "radio")}
            >
              <RadioButtonChecked
                style={{
                  marginRight: "10px",
                  fontSize: "18px",
                }}
              />
              Multiple choice
            </MenuItem>
            <MenuItem
              id="file"
              className={styles.menuItem}
              value="file"
              onClick={(e) => handleClickQuesType(e, index, "file")}
            >
              <CloudUploadOutlinedIcon
                style={{
                  marginRight: "10px",
                  fontSize: "18px",
                }}
              />
             Upload File
            </MenuItem>
          </Select>
        </>
      ) : (
        <>
          <input
            type="number"
            className={styles.points}
            min={0}
            step={1}
            placeholder="0"
            onChange={(e) => setOptionPoint(index, +e.target.value)}
          />
        </>
      )}
    </div>
  );
}
