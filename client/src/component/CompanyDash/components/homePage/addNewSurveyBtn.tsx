import React from "react";
import styles from "../companyDshHome.module.css";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Button, Fab } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Theme } from "@mui/material/styles";
export default function AddNewSurveyBtn() {
  const nav = useNavigate();
  const createSurvey = () => {
    const id = uuid();
    nav("/companyDash/createSurvey/" + id);
    console.log(id);
  };
  return (
    <div>
      <CssBaseline />
      <GlobalStyles
        styles={(theme) => ({
          body: { backgroundColor: (theme as Theme).palette.background.paper },
        })}
      />
      <Fab
        size="large"
        style={{
          backgroundColor: "#7f33ec",
          position: "absolute",
          bottom: "30px",
          right: "50px",
        }}
        onClick={createSurvey}
      >
        <AddIcon style={{ color: "#fff" }} />
      </Fab>
    </div>
  );
}
