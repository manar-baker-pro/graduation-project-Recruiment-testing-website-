import React from "react";
import styles from "../survey.module.css";
import { Button, IconButton, Switch } from "@mui/material";
import { FilterNoneOutlined, MoreVertOutlined } from "@mui/icons-material";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
export default function FooterQues(props: any) {
  const {
    index,
    requiredQues,
    copyQuestion,
    removeQuestion,
    answerDone,
    setOptionPoint,
    ques,
  } = props;
  return (
    <div
      className="addFooter"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

      }}
    >
        <div className={styles.addQustionBottomLeft}>
        <label htmlFor="points">points</label>
        <input
          id="points"
          type="number"
          className={styles.points}
          min={0}
          step={1}
          placeholder="0"
          style={{width:"50px",marginLeft:"10px"}}

          onChange={(e) => setOptionPoint(index, +e.target.value)}
        />
      </div>
      <div className={styles.addQuestionBottom}>
        <IconButton aria-label="copy" onClick={() => copyQuestion(index)}>
          <FilterNoneOutlined />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => removeQuestion(index)}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
        <span style={{ color: "#5f6368", fontSize: "13px" }}>Required</span>
        <Switch
          name="checkedReq"
          color="secondary"
          onClick={() => requiredQues(index)}
        />
      </div>
    </div>
  );
}
