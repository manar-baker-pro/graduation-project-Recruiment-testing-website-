import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import styles from "../survey.module.css";
import Avatar from "@mui/material/Avatar";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SELECTTECH from "./selectTech";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  fontSize: "10px",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  textTransform: "capitalize",
};

export default function TechModalSelect(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { handleAddTech, RequiredExperiences, handleRemoveTech } = props;
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Avatar
        onClick={handleOpen}
        style={{
          width: "70px",
          height: "70px",
          position: "relative",
          backgroundColor: "#e8e8eb",
          borderRadius: "10px",
          cursor: "pointer",
          margin: "10px",
        }}
        variant="square"
      >
        <AddBoxOutlinedIcon style={{ color: "#12042c", fontSize: "35px" }} />
      </Avatar>
      {RequiredExperiences?.map((tech: any, indexTech: number) => {
        return (
          <div key={indexTech}>
            <div className={styles.containerDispalyTech}>
              <div
                style={{
                  position: "relative",
                  width: "80px",
                  height: "80px",
                }}
              >
                <div className={styles.hoverDelete}></div>
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "#f9a30a",
                    color: "#272727",
                    top: "-8px",
                    right: "0px",
                    width: "70px",
                    fontSize: "11px",
                    borderBottomLeftRadius: "10px",
                    padding: "6px 4px",
                    textAlign: "center",
                    zIndex: "999",
                  }}
                >
                  {tech.experienceLevel}
                </div>
                <Avatar
                  style={{
                    borderRadius: "10px",
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                    border: "1px solid rgba(39, 39, 39,0.7)",
                  }}
                  variant="square"
                  src={tech.technology.picture}
                ></Avatar>
              </div>
              <div>{tech.technology.TechnologyName}</div>
            </div>
          </div>
        );
      })}
      <Modal
        // keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="subtitle1"
            component="p"
            style={{ textAlign: "start", margin: "10px 0" }}
          >
            Select Required Technologies
          </Typography>
          <SELECTTECH
            handleAddTech={handleAddTech}
            handleClose={handleClose}
            RequiredExperiences={RequiredExperiences}
            handleRemoveTech={handleRemoveTech}
          />
        </Box>
      </Modal>
    </div>
  );
}
