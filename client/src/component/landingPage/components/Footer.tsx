import React from "react";
import styles from "../landingPage.module.css";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logo from "../../../../public/assets/logos/logoMove.png";
const Footer: React.FC = () => {
  return (
   
      <footer>
        <img src={logo} alt="" className={styles.logo} />
        <div className={styles.contentFooter}>
          <h1>steering wheel of working</h1>
          <p className={styles.end}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br />{" "}
            Ullam illo aspernatur voluptatem blanditiis, praesentium <br />{" "}
            ipsum deleniti quis quos corrupti quibusdam.
          </p>
         
          <div className={styles.line}></div>
          <div className={styles.icon}>
            <FacebookIcon style={{
              fontSize: '2rem',
              textAlign: 'center',
              margin: '0.2rem',
              color: '#ee8423'
            }}></FacebookIcon>
            <GitHubIcon style={{
              fontSize: '2rem',
              textAlign: 'center',
              margin: '0.2rem',
              color: '#ee8423'
            }}></GitHubIcon>
            <LinkedInIcon style={{
              fontSize: '2rem',
              textAlign: 'center',
              margin: '0.2rem',
              color: '#ee8423'
            }}>
              
            </LinkedInIcon>
          </div>
        </div>
      </footer>
    
  );
};

export default Footer;
