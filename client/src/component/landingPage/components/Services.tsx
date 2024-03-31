import React from "react";
import styles from "../landingPage.module.css";
import PersonIcon from "@mui/icons-material/Person";
import QuizIcon from "@mui/icons-material/Quiz";
import DuoIcon from "@mui/icons-material/Duo";
import PaidIcon from "@mui/icons-material/Paid";
import { Grid } from "@mui/material";
const Services: React.FC = () => {
  return (
    <>
      <section className={styles.servicesLanding} id="services">
        <h3 className={styles.titleSection}>Our Services</h3>
        <Grid container justifyContent="center" alignItems="center" alignContent="center" spacing={2}>
          <Grid item xs={12} md={12} lg={4}>
            <div className={styles.card}>
              <PersonIcon
                style={{
                  fontSize: "3.17rem",
                  textAlign: "center",
                  margin: "0.5rem",
                  color: "#5548ce",
                }}
              />
              <h5>CV Writing</h5>
              <div className={styles.par}>
                <p>
                  After logging in for the user, then the user can fill out his
                  CV, and then the CV data is matched with the existing jobs by
                  90%
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}  md={12} lg={4}>
            <div className={styles.card}>
              <QuizIcon
                style={{
                  fontSize: "3.17rem",
                  textAlign: "center",
                  margin: "0.5rem",
                  color: "#5548ce",
                }}
              />
              <h5>Make a Test</h5>
              <div className={styles.par}>
                <p>
                  After logging in to the company, the company can write a test,
                  either the test template is ready or empty in order to test
                  the employees
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}  md={12} lg={4}>
            <div className={styles.card}>
              <DuoIcon
                style={{
                  fontSize: "3.17rem",
                  textAlign: "center",
                  margin: "0.5rem",
                  color: "#5548ce",
                }}
              />
              <h5>video call</h5>
              <div className={styles.par}>
                <p>
                  In the event that the employee succeeds in the test, the
                  company will send the date of the interview by making a video
                  call
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
        {/* <div className={styles.box}>
          <div className={styles.card}>
            <PersonIcon
              style={{
                fontSize: "3.17rem",
                textAlign: "center",
                margin: "0.5rem",
                color: "#5548ce",
              }}
            />
            <h5>CV Writing</h5>
            <div className={styles.par}>
              <p>
                After logging in for the user, then the user can fill out his
                CV, and then the CV data is matched with the existing jobs by
                90%
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <QuizIcon
              style={{
                fontSize: "3.17rem",
                textAlign: "center",
                margin: "0.5rem",
                color: "#5548ce",
              }}
            />
            <h5>Make a Test</h5>
            <div className={styles.par}>
              <p>
                After logging in to the company, the company can write a test,
                either the test template is ready or empty in order to test the
                employees, and then send the result via e-mail
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <DuoIcon
              style={{
                fontSize: "3.17rem",
                textAlign: "center",
                margin: "0.5rem",
                color: "#5548ce",
              }}
            />
            <h5>video call</h5>
            <div className={styles.par}>
              <p>
                In the event that the employee succeeds in the test, the company
                will send the date of the interview by making a video call with
                the employee
              </p>
            </div>
          </div>

        </div> */}
      </section>
    </>
  );
};

export default Services;
