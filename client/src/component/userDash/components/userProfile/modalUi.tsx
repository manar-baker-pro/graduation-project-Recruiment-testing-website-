import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import UserProfileComp from "./userProfile";
import { useSelector } from "react-redux";
import anonymous from "../../../../../public/assets/images/Developer.png";
import { FadeProps } from "../../models";
import { RootState } from "../../../../setup/store/store";
const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  background:"#fff",
  color: "#fff",
  boxShadow: 24,
  borderRadius: 3,
};

export default function ProfileModalUser() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const useranySignIn = useSelector((state: RootState) => state.userSignIn);
  const { userInfo } = useranySignIn;
  const userProfileReducer = useSelector(
    (state: RootState) => state.userProfileReducer
  );
  const { userProfileDa } = userProfileReducer;

  const [profilePic, setProfilePic] = React.useState<string>("");
  React.useEffect(() => {
    setProfilePic(userProfileDa?.profilePic ? userProfileDa.profilePic : "");
    console.log("from user info moad");
    console.log(
      userInfo && "profileUser" in userInfo ? userInfo?.profileUser : ""
    );
  }, [userInfo]);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <IconButton onClick={handleOpen}>
        <Avatar
          src={
            profilePic
              ? profilePic
              : userInfo && "profileUser" in userInfo
              ? userInfo?.profileUser.profilePic
              : anonymous
          }
        />
      </IconButton>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <UserProfileComp handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
