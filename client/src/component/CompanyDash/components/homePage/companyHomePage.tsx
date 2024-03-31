import styles from "../companyDshHome.module.css";
import TEMPLATE from "./addNewSurveyBtn";
import MAINBODY from "./recentSurveys";
export default function COMPANYHOMEPAGE() {
  return (
    <div className={styles.containerCompanyHome}>
      <TEMPLATE />
      <MAINBODY />
    </div>
  );
}
