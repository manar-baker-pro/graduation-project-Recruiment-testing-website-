import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./manageTechnologies.module.css";
import {TextareaAutosize} from "@mui/base";
import { styled } from "@mui/system";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import Cloudinary from "../../../../setup/globalConfig/cloudinary";
import { Avatar } from "@mui/material";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  resize: none;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: "#24292f";
  background: "#fff";
  border: 1px solid #d0d7de;
  box-shadow: 0px 2px 2px  #f6f8fa;
  margin-top:10px;

  &:hover {
    border-color: #3399FF;
  }

  &:focus {
    border-color: #3399FF;
    box-shadow: 0 0 0 3px #d0d7de;
    
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

export default function TechModalInfo(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { element } = props;
  const { operation, technology } = props;
  const { handleChangeTechnology } = props;
  const { editTechnology, handleChangeEditTechnology, handleAddTechnology,handleUpdateTechnology,id} =
    props;
  return (
    <div>
      <div onClick={handleOpen}>{element}</div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h5" component="h5">
          {operation === "add"
                  ? "Create New Technology"
                  : operation === "edit"
                  ? "Edit Technology"
                  : ""}
          </Typography>
          {/* <TextField
            label="Name of Technology"
            id="outlined-start-adornment"
            sx={{ margin:"3px 1px", width: "95%" ,borderRadius: "12px 12px 0 12px !important"}}
            hiddenLabel
            // InputProps={{
            //   startAdornment: <InputAdornment position="start">kg</InputAdornment>,
            // }}
          /> */}
          <div className={styles.addItem}>
            <label htmlFor="nameTech" style={{ padding: "10px" }}>
              {" "}
              Technology Name
            </label>
            <StyledTextarea
              id="nameTech"
              value={
                operation === "add"
                  ? technology.TechnologyName
                  : operation === "edit"
                  ? editTechnology?.TechnologyName
                  : ""
              }
              name="TechnologyName"
              onChange={(e) =>
                operation === "add"
                  ? handleChangeTechnology(e.target.name, e.target.value)
                  : operation === "edit"
                  ? handleChangeEditTechnology(e.target.name, e.target.value)
                  : ""
               
              }
              aria-label="minimum height"
              minRows={1}
              placeholder="Technology Name"
            />
          </div>
          <div className={styles.addItem}>
            <label
              htmlFor="descriptionTech"
              style={{ padding: "10px", color: "#302e2e" }}
            >
              {" "}
              Technology Description
            </label>
            <StyledTextarea
              name="description"
              id="descriptionTech"
              aria-label="minimum height"
              value={
                operation === "add"
                  ? technology.description
                  : operation === "edit"
                  ? editTechnology.description
                  : ""
              }
              minRows={3}
              maxRows={5}
              placeholder="Technology Description"
              onChange={(e) =>
                operation === "add"
                  ? handleChangeTechnology(e.target.name, e.target.value)
                  : operation === "edit"
                  ? handleChangeEditTechnology(e.target.name, e.target.value)
                  : ""
              }
            />
          </div>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className={styles.stackItems}
          >
            <label
              htmlFor="logoTech"
              style={{ padding: "10px", color: "#302e2e" }}
            >
              {" "}
              Logo Image
            </label>

            <Cloudinary
              name={"picture"}
              element={
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    background: "transparent !important",
                    border: "1px solid #c7c1c1",
                    color: "#302e2e",
                    boxShadow: "none",
                    padding: "5px 10px",
                    fontSize: "14px !important",
                    textTransform: "capitalize",
                  }}
                >
                  Upload
                  <PhotoCamera
                    style={{
                      marginLeft: "10px",
                      fontSize: "20px",
                      color: "gray",
                    }}
                  />
                </Button>
              }
              handleSetImage={
                operation === "add"
                  ? handleChangeTechnology
                  : operation === "edit"
                  ? handleChangeEditTechnology
                  : ""
              }
            />
            <Avatar
              style={{ width: "80px", height: "80px", position: "relative" }}
              variant="square"
              src={
                operation === "edit"
                  ? editTechnology?.picture
                  : operation === "add"
                  ? technology?.picture
                  : ""
              }
            >
              T
            </Avatar>
          </Stack>
          <div
            style={{
              display: "flex",
              marginTop: "30px",
              flexDirection: "row-reverse",
            }}
          >
            <Button
              className={styles.technologyBtn}
              style={{
                backgroundColor: "var(--purple-to-blue)",
                border: "none",
              }}
              onClick={() => {
                operation === "add" && handleAddTechnology();
                operation === "edit" && handleUpdateTechnology(id);

                handleClose()
              }}
            >
              <span style={{ fontSize: "14px", color: "#ffff" }}>
                {operation === "edit"
                  ? "Edite"
                  : operation === "add"
                  ? "Create"
                  : ""}
              </span>
            </Button>
            <Button className={styles.technologyBtn} onClick={handleClose}>
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
