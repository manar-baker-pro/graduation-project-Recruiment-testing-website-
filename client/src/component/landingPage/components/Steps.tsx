import React from "react";
import styles from "../landingPage.module.css";
import CardStep from "./CardStep";
import { stepsCompanyContent, stepsUserContent } from "./constant";

const Steps: React.FC = () => {
  return (
    < >
      <div className={`${styles.stepTotal} `} style={{background:"#e1ddfd"}}>
        <h1 className={styles.titleSection}>steps for user</h1>

        <section className={`${styles.steps} ${styles.stepsArea} ${styles.layout}`} >
        
            <ul className={styles.timeline}>
              {stepsUserContent.map((step, index) => (
                <CardStep
                  title={step.title}
                  details={step.details}
                  iconStyle={step.iconStyle}
                  index={step.index}
                />
              ))}
      </ul>
        </section>
      </div>

      <div className={`${styles.stepTotal}`} style={{background:"#fff"}}>
        <h1 className={styles.titleSection}>
          <span>steps</span> for company
        </h1>
        <section className={`${styles.steps} ${styles.stepsArea} ${styles.layout}`}>
       
            <ul className={styles.timeline}>
              {stepsCompanyContent.map((step, index) => (
                <CardStep
                  title={step.title}
                  details={step.details}
                  iconStyle={step.iconStyle}
                  index={step.index}
                />
              ))}
            </ul>
        
        </section>
      </div>
    </>
  );
};

export default Steps;
