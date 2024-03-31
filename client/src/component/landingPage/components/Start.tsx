import React from "react";
import styles from "../landingPage.module.css";
import { Link } from "react-router-dom";
import start from "../../../../public/assets/images/start.png";
const Start: React.FC = () => {
  return (
    <>
      <section className={`${styles.startLanding} ${styles.layout}`} id="start" style={{background:"#e1ddfd"}}>
        <div className={styles.containerImage}>
          <img src={start} alt="" />
        </div>
        <div className={styles.containerText}>
          <h1>How to Start?</h1>
          <p>
            You can create a free account now (no credit card required), and you
            are up and ready!!
          </p>
          <button className={styles.btn2}>Start Now For Free</button>
        </div>
      </section>
    </>
  );
};

export default Start;
