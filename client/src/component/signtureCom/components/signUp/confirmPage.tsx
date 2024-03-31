import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../setup/store/store";
import { ConfirmAccount } from "../../../../setup/store/actionsCreators/authActionCreators/userSignUp.actionsCreators";
import styles from "../../signture.module.css";
export default function CONFIRM() {
  const userSignUp = useSelector((state: RootState) => state.userSignUp);
  const { success } = userSignUp;
  const dispatch = useDispatch();
  const [sendMes, setSendMes] = useState<boolean>(false);
  const reSend = () => {
    setTimeout(() => {}, 6000);
  };
  if (!success) {
    return (
      <div style={{width:"100vw",height:"95vh" ,display:"flex",alignItems:"center",justifyContent:"center",background: "linear-gradient( rgba(156, 137, 255, 0.4), rgba(153, 204, 237, 0.4) )"}}>
        <div style={{width:"35%",height:"60%",backgroundColor:"white",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:"10px",boxShadow:" rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
        <div style={{padding:"10px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <h1 className={styles.WelcomeHeader} style={{textAlign:"center",padding:"0px"}}>Confirme Page</h1>
          <p style={{color:"gray",padding:"10px 0px",textAlign:"center",fontSize:"16px"}}>Please Confirm your Acccount to continue .</p>
        </div>
        <div>
          <button className={`${styles.btnStyle} ${styles.btnComp}`}onClick={() => dispatch(ConfirmAccount())}>
            Send Message
          </button>
        </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <h1>Welcome to S.W.W </h1>
          <p>
            Message was sent successfull check your email to activate email and
            join to S.W.W Comunity
          </p>
        </div>
      </div>
    );
  }
}
