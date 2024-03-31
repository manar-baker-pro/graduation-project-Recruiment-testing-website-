import React from "react";
import SkillTest from "./skillTest";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
export default function ManageSkillTestsMain() {
  const navigate = useNavigate();
  const handleAddNewTest = () => {
    navigate(`/adminDash/manageSkillTest/creatTest`);
  };
  return (
    <>
      <Fab
        variant="extended"
        style={{
          position: "fixed",
          bottom: "36px",
          right: "36px",
          fontSize: "16px",
          color: "#fff",
          backgroundColor: "var(--purple-to-blue)",
        }}
        onClick={handleAddNewTest}
      >
        <AddIcon style={{ fontSize: "18px" }} 
        /> Add New Test
      </Fab>{" "}
    </>
  );
}
