import { Link } from "react-router-dom";
import styles from "../../signture.module.css";
export default function WELCOMEPAGE() {
  return (
    <div className={styles.welcomeContainer}>
      <div className={` ${styles.cardWelocme}`}>
        <div className={styles.welcomeHeader}>
          <h1 className={styles.WelcomeHeader}>WELCOME To S.W.W </h1>
          <p>
            Welcome to S.W.W Dear user please sign up after defining your role in order
            to achieve the desired benefit from our site.
          </p>
        </div>

        <div className={styles.btnContainerWelcome}>
          <div className={`${styles.btnStyle} ${styles.btnComp}`}>
            <Link to="/auth/registerComp">Company</Link>
          </div>
          <div className={`${styles.btnStyle} ${styles.btnEmp}`}>
            <Link to="/auth/register">User</Link>
          </div>
        </div>
      </div>
     
    </div>
  );
}
