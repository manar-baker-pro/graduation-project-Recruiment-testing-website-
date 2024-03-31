import { Avatar, Box, Button, Modal } from "@mui/material";
import React from "react";
import styles from "../../userDash.module.css";
import CardMatchedSurvey from "./cardSurveyMatched";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
export default function ModelSurveyInfo(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const { surveyItem } = props;
  const handelStartSurvey = () => {
    navigate(`/userDash/surveyResponse/${surveyItem._id}`);
  };
  return (
    <div>
      <div onClick={handleOpen}>
        <CardMatchedSurvey surveyItem={surveyItem} />
      </div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div>
            <div>jop title :{surveyItem.title} </div>
            <p>Description</p>
            <p>{surveyItem.description}</p>
            <div>
              <h4>Required Skills</h4>
              <div style={{display:"flex",flexWrap:"wrap"}}>
                {surveyItem.requiredExperiences.map(
                  (tech: any, indexTech: number) => {
                    return (
                      <div key={indexTech}>
                        <Avatar
                          style={{
                            width: "80px",
                            height: "80px",
                            position: "relative",
                          }}
                          variant="square"
                          src={tech.technology.picture}
                        >
                          T
                        </Avatar>
                        <p>{tech.technology.TechnologyName}</p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div>
              Company Made
              <h4>{surveyItem.createdBy.companyName}</h4>
              <p>{surveyItem.createdBy.bio}</p>
              <Avatar
                style={{
                  width: "80px",
                  height: "80px",
                  position: "relative",
                }}
                variant="square"
                src={surveyItem.createdBy.profilePic}
              >
                T
              </Avatar>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "30px",
              flexDirection: "row-reverse",
            }}
          >
            <Button
              style={{
                backgroundColor: "var(--purple-to-blue)",
                border: "none",
                margin:"10px"

              }}
              onClick={() => {
                handelStartSurvey();
                handleClose();
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  color: "#ffff",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                }}
              >
                Start Survey
              </span>
            </Button>
            <Button  onClick={handleClose}
            style={{margin:"10px",border:"1px solid var(--purple-to-blue)"}}>
              <span
                style={{ fontSize: "14px", color: "var(--purple-to-blue)" }}
              >
                cancel
              </span>
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
