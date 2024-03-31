import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import COMPANYPROFILE from "./companyProfile";
import { useSelector } from "react-redux";
import anonymous from "../../../../../public/assets/images/Developer.png";
import { FadeProps } from "../../model";
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
  width: 320,
  background:
    "linear-gradient(to right,var(--sleep-purple),var(--base-purple))",
  // bgcolor: "",
  color: "#fff",
  boxShadow: 24,
  borderRadius: 3,
  pt: 2,
};

export default function ProfileModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const companySignIn = useSelector((state: RootState) => state.userSignIn);
  const { userInfo } = companySignIn;
  const companyProfileReducer = useSelector(
    (state: RootState) => state.companyProfileReducer
  );
  const { compProfileDa } = companyProfileReducer;
  const [profilePic,setProfilePic]=React.useState<string>("")
  React.useEffect(()=>{
    setProfilePic(compProfileDa?.profilePic?compProfileDa.profilePic:"")
    console.log(compProfileDa)
  },[compProfileDa])
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
 
        <Avatar
          src={
            profilePic?profilePic
              : userInfo&&'profileCompany' in userInfo ?userInfo?.profileCompany.profilePic:anonymous
          }

          style={{border:"1px solid rgba(0, 0, 0, 0.4)",borderRadius:"10px",marginLeft:"10px",cursor:"pointer"}}
          variant="square"
          onClick={handleOpen}
        />
    
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
            <COMPANYPROFILE />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
