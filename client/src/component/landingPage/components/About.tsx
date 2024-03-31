import React from "react";
import styles from "../landingPage.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import alaa from "../../../../public/assets/images/alaa.png";
import manar from "../../../../public/assets/images/manar.png";
import ghalia from "../../../../public/assets/images/ghalia.png";
import NavBar from "../../Navbar/components/NavbarCom";
import Footer from "./Footer";
const About: React.FC = () => {
  return (
    <>
    <NavBar></NavBar>
      <div className={styles.about}>
        <div className={styles.header}>
          <h2>OUR TEAM</h2>
        </div>
        <section className={styles.ourteam}>
          <div
            className={styles.team}
            style={{ backgroundImage: `url(${alaa})` }}
          >
            <img src={alaa} alt="" />
            <div className={styles.info}>
              <div className={styles.name}>Alaa Alyosef</div>
              <div className={styles.title}>dfdfdfdff</div>
              <div className={styles.social}>
                <FacebookIcon></FacebookIcon>
                <InstagramIcon></InstagramIcon>
                <TwitterIcon></TwitterIcon>
              </div>
            </div>
          </div>
          <div
            className={styles.team}
            style={{ backgroundImage: `url(${manar})` }}
          >
            <img src={manar} alt="" />
            <div className={styles.info}>
              <div className={styles.name}>Manar Bakir</div>
              <div className={styles.title}>dfdfdfdff</div>
              <div className={styles.social}>
                <FacebookIcon></FacebookIcon>
                <InstagramIcon></InstagramIcon>
                <TwitterIcon></TwitterIcon>
              </div>
            </div>
          </div>

          <div
            className={styles.team}
            style={{ backgroundImage: `url(${ghalia})` }}
          >
            <img src={ghalia} alt="" />
            <div className={styles.info}>
              <div className={styles.name}>Ghalia Almizuad</div>
              <div className={styles.title}>dfdfdfdff</div>
              <div className={styles.social}>
                <FacebookIcon></FacebookIcon>
                <InstagramIcon></InstagramIcon>
                <TwitterIcon></TwitterIcon>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </>
  );
};

export default About;
