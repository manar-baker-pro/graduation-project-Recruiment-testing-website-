import React from "react";
import styles from "../landingPage.module.css";
import { Link } from "react-router-dom";
const video: React.FC = () => {
  return (
    <>
      <section
        className={styles.videoLanding}
        id="video"
        style={{ background: "white" }}
      >
        <h1>Demo Video</h1>
        <p>Still not sure how this works? check out this quick demo video</p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/eoW5L6Rdy8w"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </section>
    </>
  );
};

export default video;
