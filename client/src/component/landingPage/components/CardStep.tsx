import React from "react";
import styles from "../landingPage.module.css";
interface StepSectionProps {
  iconStyle: string;
  title: string;
  details: string;
  index: number;
}
const CardStep: React.FC<StepSectionProps> = ({
  iconStyle,
  index,
  title,
  details,
}) => {
  return (
    <>
      <li
        className={`${styles.timelineBox}   `}
       
      >
        <i className={iconStyle}></i>
        <p className={styles.timelineTitle}>{title}</p>
        <p className={styles.timelineDetails}>{details}</p>
        <span>{index}</span>
      </li>
    </>
  );
};

export default CardStep;
