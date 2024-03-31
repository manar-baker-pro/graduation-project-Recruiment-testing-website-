import React, { useState } from "react";
import styles from "../survey.module.css";
import {
  CloseOutlined,
  CropOriginalOutlined,
  ShortTextOutlined,
} from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
export default function OptionsComponent(props: any) {
  const [selectedOption, setSelectedOption] = useState('');
  const { ques, index, isHovered } = props;
  const {
    handleChangeOption,
    handleMouseEnter,
    handleMouseLeave,
    removeOption,
    setOptionAnswer,
  } = props;
  return (
    <>
      <FormControl
        sx={{ display: "flex", flexDirection: "column", width: "100%" }}
      >
        {ques.options.map((option: any, indexOp: number) => {
          return (
            <div
              key={indexOp}
              style={{
                width: "95%",
                display: "flex",
                justifyContent: "space-between",
                marginRight: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginRight: "10px",
                }}
              >
                <input
                  type={ques.questionType}
                  name={index}
                  value={option.optionText}
                  style={{ marginRight: "10px" }}
                  // checked={selectedOption===option.optionText}
                  onChange={(e) =>
                    (ques.questionType === "radio" ||
                      ques.questionType === "CheckBox") &&
                    setOptionAnswer(index, indexOp, +e.target.checked)
                  }
                />
                <input
                  type="text"
                  className={styles.textInput}
                  placeholder="Option"
                  value={option.optionText}
                  onChange={(e) => handleChangeOption(e, index, indexOp)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
              {ques.options.length > 2 ? (
                <IconButton
                  aria-label="delete"
                  onClick={() => removeOption(index, indexOp)}
                >
                  <CloseOutlined />
                </IconButton>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </FormControl>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      ></div>
    </>
  );
}
