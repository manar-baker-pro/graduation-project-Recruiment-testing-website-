import React, { useState } from "react";
import * as Yup from "yup";
import "../../../../App.css";
import { Checkbox, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import styles from "../../signture.module.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import LocalPostOfficeRoundedIcon from "@mui/icons-material/LocalPostOfficeRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { FieldFormSignIn } from "../../models";
import { RootState } from "../../../../setup/store/store.js";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "../../../../setup/store/actionsCreators/authActionCreators/userSignIn.actionCreators";
import { Link, Navigate } from "react-router-dom";
import { SigninState } from "../../../../setup/store/reducers/authReducers/auth.reducers.interfaces";
import blob from "../../../../../public/assets/images/blob.png";
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const userSignIn: SigninState = useSelector(
    (state: RootState) => state.userSignIn
  );
  const { userInfo, errorin, success } = userSignIn;
  const userSignUp = useSelector((state: RootState) => state.userSignUp);
  const { errorup, message } = userSignUp;
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FieldFormSignIn>({
    email: "",
    password: "",
    role: false,
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(event.target.value);
    if (event.target.type === "checkbox") {
      setFormData({ ...formData, [name]: event.target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    console.log(formData.role);
  };
  const handleSubmitForm = (
    event: React.ChangeEvent<HTMLInputElement>,
    errors: any
  ) => {
    event.preventDefault();
    const { email, password } = errors;
    if (email || password) return null;
    dispatch(SignIn(formData));
  };

  if (message) {
    return <Navigate to={"/auth/confirm"} />;
  }
  if (userInfo && userInfo?.role?.adminDash?.GET.given) {
    return <Navigate to={"/adminDash"} />;
  }
  console.log(userInfo?.role?.userDash?.GET.given);
  if (userInfo && userInfo?.role?.userDash?.GET.given) {
    return <Navigate to={"/userDash/homePage"} />;
  }
  if (userInfo && userInfo?.role?.companyDash?.GET.given) {
    return <Navigate to={"/companyDash/homepage"} />;
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is Required"),
    password: Yup.string()
      .min(5, "Password should be of minimum 5 characters length")
      .required("Password is required"),
    role: Yup.boolean().optional(),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        role: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        validateField,
      }) => (
        <div className={styles.containerSignture}>
          <div className={`${styles.card} ${styles.legalCard}`}>
            <h1 className={`${styles.WelcomeHeader}`}>Login to S.W.W</h1>
            <Form
              onSubmit={(event: any) => {
                handleSubmit(event);
                handleSubmitForm(event, errors);
              }}
              className={styles.formClass}
              style={{ height: "70%" }}
            >
              <TextField
                className={styles.fieldClass}
                id="email"
                type="email"
                name="email"
                placeholder="Your Email"
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <LocalPostOfficeRoundedIcon
                      style={{ color: "gray", marginRight: "8px" }}
                    />
                  ),
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  handleInputChange(e);
                }}
              />
              <TextField
                className={styles.fieldClass}
                type="password"
                id="password"
                name="password"
                placeholder="Your Password"
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  startAdornment: (
                    <LockRoundedIcon
                      style={{ color: "gray", marginRight: "8px" }}
                    />
                  ),
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  handleInputChange(e);
                }}
              />

              <div
                className={`${styles.fieldClass} `}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:"space-around",
                  fontSize: "16px",
                  width:"84%",
                }}
              >
                <FormControlLabel
                 
                  className={styles.checkboxStyle}
                  control={
                    <Field
                      
                      name="role"
                      type="checkbox"
                      as={Checkbox}
                      error={touched.role && errors.role}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        handleInputChange(event);
                        handleChange(event);
                      }}
                    />
                  }
                  label="As Company"
                />
                <Link to="/auth/register">
                  <div
                    style={{
                      color: "#272727",
                      fontSize: "14px",
                      width: "100%",
                  
                    }}
                  >
                    Forget Password?
                  </div>
                </Link>
              </div>

              <button className={styles.btnStyle} type="submit">
                Sign In
              </button>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "6px",
                  fontSize: "14px",
                }}
              >
                <span>Don't have an account?</span>
                <Link
                  to="/auth/welcome"
                  style={{ color: "#4d3293", margin: "0 2px" }}
                >
                  Sign up
                </Link>
              </div>
            </Form>
          </div>
          <div
            className={styles.card}
            style={{
              paddingTop: "50px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div className={styles.welcomeSign}>
              <h2 style={{ textTransform: "uppercase", padding: "10px" }}>
                {" "}
                welecome to S.W.W
              </h2>
              <p>Log in to start your journey with us </p>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};
export default Login;
