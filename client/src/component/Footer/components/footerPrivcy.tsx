import styles from "../footer.module.css";
import { useLocation } from "react-router-dom";

export default function FOOTERPRIVACY() {
  const location = useLocation();
  if (location.pathname.includes("auth")||location.pathname.includes("welcome"))  return null ;
    return (
      <>
        <div className={styles.footerPrivacy}>
          <span>
            <a href="/">Terms & Privacy </a>
          </span>
          <span>© 2023-2024 S.W.W</span>
        </div>
      </>
    );
 
}
