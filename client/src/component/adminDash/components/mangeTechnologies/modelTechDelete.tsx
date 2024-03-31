import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./manageTechnologies.module.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import Avatar from "@mui/material/Avatar";
import { grey } from "@mui/material/colors";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: 24,
  p: 4,
  pt: 6,
  textTransform: "capitalize",
};

export default function TechModalDelete(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { handleDelete,id } = props;
  return (
    <div>
      <Button className={styles.technologyBtn} onClick={handleOpen}>
        <DeleteRoundedIcon
          style={{ fontSize: "14px", color: "red", margin: "3px" }}
        />
        <span style={{ fontSize: "14px", color: "red" }}>Delete</span>
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div style={{ position: "relative", width: "100%" }}>
            <Avatar
              sx={{
                bgcolor: "rgb(76, 0, 255)",
                width: 90,
                height: 90,
                position: "absolute",
                top: "-100px",
                right: "36%",
                marginBottom: "10px",
              }}
              // aria-label="recipe"
            >
              <DeleteOutlineOutlinedIcon
                style={{
                  color: "#fff",
                  fontSize: "60px",
                  opacity: "1 !important",
                }}
              />
            </Avatar>
          </div>
          <Typography
            id="keep-mounted-modal-title"
            variant="subtitle1"
            component="p"
          >
            you are about to delete Html Technology
          </Typography>
          <Typography
            id="keep-mounted-modal-title"
            variant="subtitle2"
            component="p"
            color="rgba(73, 71, 71)"
          >
            This will delete the technology Are you sure?
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              margin: "15px 0",
            }}
          >
            <Button
              className={styles.technologyBtn}
              style={{
                backgroundColor: "var(--purple-to-blue)",
                border: "none !important",
              }}
            >
              <span
                style={{ fontSize: "14px", color: "#ffff" }}
                onClick={() => {
                  handleDelete(id);
                  handleClose();
                }}
              >
                Delete
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
