import { Link } from "react-router-dom";
import styles from "../NavbarCom.module.css";
import logo from "../../../../public/assets/logos/logoMove.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavBar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  if (location.pathname.includes("auth")) return null;

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={styles.NavContainer}
      style={{
        background: scrolled ? "white" : "transparent",
        boxShadow: scrolled ? "rgba(0, 0, 0, 0.04) 0px 2px 1px, rgba(0, 0, 0, 0.04) 0px 4px 2px, rgba(0, 0, 0, 0.04) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 4px 16px" : "initial",
        transition: "all 0.5s linear",
      }}
    >
      <img
        src={logo}
        style={{ width: "100px", height: "50px", marginLeft: "4%" }}
        alt="logo here"
      />
      <ul className={styles.navList}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="#">Contact</Link>
          </li>
          <li>
            <Link to="#services">Services</Link>
          </li>
          <li>
            <Link to="/auth/login">Sign In</Link>
          </li>
          <li>
            <Link to="/auth/welcome">Sign Up</Link>
          </li>
        </>
      </ul>
    </div>
  );
}
