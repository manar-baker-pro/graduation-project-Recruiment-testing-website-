import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
const AnimatedButton = styled(Button)`
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDelete = () => {};
  const handleEdit = () => {
    navigate(`/companyDash/editSurvey/${id}`);
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      style={{ width: "100%", margin: "0", paddingLeft: "20px" }}
    >
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ marginBottom: "8px" }}>
          Edit Survey
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: "16px", color: "#8c8d8d" }}
        >
          Note: Editing the survey will not retrieve the previous data.
        </Typography>
        <AnimatedButton
          onClick={handleEdit}
          sx={{
            marginBottom: "16px",
            backgroundColor: "#4f21f3",
            fontSize: "12px",
            width: "90px",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#3519d2",
            },
          }}
        >
          Edit
          <EditIcon sx={{ marginLeft: "8px", fontSize: "14px" }} />
        </AnimatedButton>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ marginBottom: "8px" }}>
          Delete Survey
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: "16px", color: "#8c8d8d" }}
        >
          Note: Deleting the survey will permanently remove it.
        </Typography>
        <AnimatedButton
          color="error"
          onClick={handleDelete}
          sx={{
            marginBottom: "16px",
            width: "90px",

            backgroundColor: "#f44336",
            fontSize: "12px",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
        >
          Delete
          <DeleteIcon sx={{ fontSize: "14px", marginLeft: "8px" }} />
        </AnimatedButton>
      </Grid>
    </Grid>
  );
};

export default SettingsPage;
