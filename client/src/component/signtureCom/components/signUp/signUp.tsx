import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignUpActionCreator } from "../../../../setup/store/actionsCreators/authActionCreators/userSignUp.actionsCreators";
import { RootState } from "../../../../setup/store/store";
import * as Yup from "yup";
import { TextField, Checkbox, FormHelperText } from "@mui/material";
import { Field, Formik, Form } from "formik";
import styles from "../../signture.module.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LocalPostOfficeRoundedIcon from "@mui/icons-material/LocalPostOfficeRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import FormControlLabel from "@mui/material/FormControlLabel";
import LockIcon from "@mui/icons-material/Lock";
import logo from "../../../../../public/assets/logos/logoWhite.png";
import { FieldFormSignUp } from "../../models";
import { Navigate } from "react-router-dom";
const Register: React.FC = () => {
  const dispatch = useDispatch();
  const userSignUp = useSelector((state: RootState) => state.userSignUp);
  const { errorup, message } = userSignUp;
  const [error, setError] = useState<string | null>(null);
  const [formDataUp, setFormDataUp] = useState<FieldFormSignUp>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  if (message) {
    return <Navigate to={"/auth/confirm"} />;
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      event.target.value = "true";
    }
    const { name, value } = event.target;
    setFormDataUp({ ...formDataUp, [name]: value });
  };
  const handleSubmitForm = async (
    event: React.ChangeEvent<HTMLInputElement>,
    errors: any
  ) => {
    event.preventDefault();
    dispatch(userSignUpActionCreator(formDataUp));
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Name is Required"),
    email: Yup.string().email().required("Email is Required"),
    password: Yup.string().required("Password is Required"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .required("This field is Required "),
    checkPrivacy: Yup.boolean()
      .oneOf([true], "This field is Required ")
      .required("This field is Required "),
  });
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        checkPrivacy: false,
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
        <div className={`${styles.containerSignture} ${styles.specialConEmp}`}>
          <div
            className={`${styles.card} ${styles.legalCard}`}
            style={{ minHeight: "90vh" }}
          >
            <h1
              className={`${styles.WelcomeHeader} ${styles.legalWelcomeHeader}`}
            >
              Welcome Back !
            </h1>
            <Form
              onSubmit={(event: any) => {
                handleSubmit(event);
                handleSubmitForm(event, errors);
              }}
              className={styles.formClass}
            >
              <TextField
                className={styles.fieldClass}
                id="username"
                type="text"
                name="username"
                placeholder="Your Name"
                value={values.username}
                variant="outlined"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <AccountCircleRoundedIcon
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
                id="email"
                type="email"
                name="email"
                placeholder="Your Email"
                variant="outlined"
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
                variant="outlined"
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
              <TextField
                className={styles.fieldClass}
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Confirm Your Password"
                value={values.passwordConfirm}
                error={
                  touched.passwordConfirm && Boolean(errors.passwordConfirm)
                }
                helperText={touched.passwordConfirm && errors.passwordConfirm}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <LockIcon style={{ color: "gray", marginRight: "8px" }} />
                  ),
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  handleInputChange(e);
                }}
              />
              <FormControlLabel
                className={styles.checkLabel}
                style={{width:"84%",paddingLeft:"10px"}}
                control={
                  <Field
                    name="checkPrivacy"
                    type="checkbox"
                    as={Checkbox}
                    error={touched.checkPrivacy && errors.checkPrivacy}
                  />
                }
                label="
              Terms and conditions
              "
              />

              {touched.checkPrivacy && errors.checkPrivacy ? (
                <FormHelperText error style={{ marginLeft: "20px" }}>
                  Please Check Agreeable
                </FormHelperText>
              ) : null}
              <button className={styles.btnStyle} type="submit">
                Sign Up
              </button>

              <div
                className={`${styles.bobShare} ${styles.specialStyleBlob}`}
              ></div>
            </Form>
          </div>
          <div
            className={styles.card}
            style={{
              paddingTop: "50px",
              position: "relative",
              overflow: "hidden",
              minHeight: "90vh",
            }}
          >
            <div className={styles.welcomeSign}>
              <h2 style={{ textTransform: "uppercase", padding: "10px" }}>
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
export default Register;
