
import styles from "../landingPage.module.css";
import blobman from "../../../../public/assets/images/blobman.png";
import man from "../../../../public/assets/images/man.png";
const Header = () => {
  return (
    <>
      <section className={` ${styles.homeLanding}`} id="welcome">
        <div className={styles.containerText}>
          <h1>Steering Wheel OF Work</h1>
          <p>
            Stop wasting time on people who look good on paper but can't do the
            job. Let us handle testing your candidates & present you with the
            best qualified.
          </p>
          <div className={styles.btnContainer}>
            <button className={styles.btn1}>
              <a href="#start"> Try Now For Free</a>
            </button>
            <button className={styles.btn2}>
              <a href="#video">Watch Demo</a>
            </button>
          </div>
        </div>
        <div className={styles.containerImage}>
          <img className={styles.shape} src={blobman} alt="blob" />
          <img className={styles.man} src={man} alt="man" />
        </div>
      </section>
    </>
  );
};

export default Header;
