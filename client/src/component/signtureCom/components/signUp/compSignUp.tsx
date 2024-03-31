import { Button, Checkbox, FormHelperText, TextField } from "@mui/material";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "../../signture.module.css";
import * as React from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LocalPostOfficeRoundedIcon from "@mui/icons-material/LocalPostOfficeRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockIcon from "@mui/icons-material/Lock";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { FieldFormSignUpComp } from "../../models";
import { RootState } from "../../../../setup/store/store";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { userSignUpActionCreator } from "../../../../setup/store/actionsCreators/authActionCreators/userSignUp.actionsCreators";
import UploadFileComponent from "../../../../setup/globalConfig/cloudinaryHandleFile";
export default function COMPANYSIGHNUP() {
  const dispatch = useDispatch();
  const compSignUp = useSelector((state: RootState) => state.userSignUp);
  const { errorup, message } = compSignUp;
  const [formDataUpComp, setFormDataUpComp] = useState<FieldFormSignUpComp>({
    recruitmentOfficer: "",
    companyName: "",
    emailWork: "",
    companyPassword: "",
    license: "",
    companyPasswordConfirm: "",
  });
  if (message) {
    return <Navigate to={"/auth/confirm"} />;
  }
  const handleInputChange = (value: string, name: string, event?: any) => {
    if (event?.target.checked) {
      event.target.value = "true";
    }
    setFormDataUpComp({ ...formDataUpComp, [name]: value });
    console.log(formDataUpComp);
  };
  const handleSubmitForm = async (
    event: React.ChangeEvent<HTMLInputElement>,
    termsAgree: boolean,
    errors: any
  ) => {
    event.preventDefault();
    const {
      recruitmentOfficer,
      emailWork,
      companyName,
      companyPassword,
      companyPasswordConfirm,
      checkPrivacy,
      license,
    } = errors;
    if (
      recruitmentOfficer ||
      emailWork ||
      companyName ||
      companyPassword ||
      companyPasswordConfirm ||
      checkPrivacy ||
      license
    )
      return null;
    if (!formDataUpComp.license) {
      // setErrors((prevState) => ({
      //   ...prevState,
      //   license: "License file is required",
      // }));
      // return;
    }
    if (termsAgree) {
      dispatch(userSignUpActionCreator(formDataUpComp));
    }
  };
  return (
    <Formik
      initialValues={{
        recruitmentOfficer: "",
        emailWork: "",
        companyName: "",
        companyPassword: "",
        companyPasswordConfirm: "",
        checkPrivacy: false,
        license: "",
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={Yup.object().shape({
        recruitmentOfficer: Yup.string().required("Name is Required"),
        companyName: Yup.string().required("Company name is required"),
        emailWork: Yup.string().email().required("Email is Required"),
        companyPassword: Yup.string().required("Password is required"),
        companyPasswordConfirm: Yup.string()
          .oneOf([Yup.ref("companyPassword")], "Password must match")
          .required("This field is Required"),
        checkPrivacy: Yup.boolean()
          .oneOf([true], "This field is Required ")
          .required("This field is Required "),
        license: Yup.mixed().required("License file is required"),
      })}
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
        /* and other goodies */
      }) => (
        <div className={`${styles.containerSignture} ${styles.specialConComp}`}>
          <div className={`${styles.card} ${styles.legalCard}`} style={{height:"auto"}}>
            <h1
              className={`${styles.WelcomeHeader} ${styles.legalWelcomeHeader}`}
            >
              Welcome Back !
            </h1>
            <Form
              onSubmit={(event: any) => {
                handleSubmit(event);
                handleSubmitForm(event, values.checkPrivacy, errors);
              }}
              className={styles.formClass}
            >
              <TextField
                className={styles.fieldClass}
                id="recruitmentOfficer"
                type="text"
                name="recruitmentOfficer"
                placeholder="Recruitment Officer Name"
                value={values.recruitmentOfficer}
                variant="outlined"
                error={
                  touched.recruitmentOfficer &&
                  Boolean(errors.recruitmentOfficer)
                }
                helperText={
                  touched.recruitmentOfficer && errors.recruitmentOfficer
                }
                InputProps={{
                  startAdornment: (
                    <AccountCircleRoundedIcon
                      style={{ color: "gray", marginRight: "8px" }}
                    />
                  ),
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  handleInputChange(e.target.value, e.target.name, e);
                }}
              />
              <TextField
                className={styles.fieldClass}
                id="companyName"
                type="text"
                name="companyName"
                placeholder=" Company Name"
                value={values.companyName}
                variant="outlined"
                error={touched.companyName && Boolean(errors.companyName)}
                helperText={touched.companyName && errors.companyName}
                InputProps={{
                  startAdornment: (
                    <AccountCircleRoundedIcon
                      style={{ color: "gray", marginRight: "8px" }}
                    />
                  ),
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  handleInputChange(e.target.value, e.target.name, e);
                }}
              />
              <TextField
                className={styles.fieldClass}
                id="emailWork"
                type="email"
                name="emailWork"
                placeholder="Your Email"
                variant="outlined"
                value={values.emailWork}
                error={touched.emailWork && Boolean(errors.emailWork)}
                helperText={touched.emailWork && errors.emailWork}
                InputProps={{
                  startAdornment: (
                    <LocalPostOfficeRoundedIcon
                      style={{ color: "gray", marginRight: "8px" }}
                    />
                  ),
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  handleInputChange(e.target.value, e.target.name, e);
                }}
              />
              <TextField
                className={styles.fieldClass}
                type="password"
                id="companyPassword"
                name="companyPassword"
                placeholder="Your Password"
                variant="outlined"
                value={values.companyPassword}
                error={
                  touched.companyPassword && Boolean(errors.companyPassword)
                }
                helperText={touched.companyPassword && errors.companyPassword}
                InputProps={{
                  startAdornment: (
                    <LockRoundedIcon
                      style={{ color: "gray", marginRight: "8px" }}
                    />
                  ),
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  handleInputChange(e.target.value, e.target.name, e);
                }}
              />
              <TextField
                className={styles.fieldClass}
                type="password"
                id="companyPasswordConfirm"
                name="companyPasswordConfirm"
                placeholder="Confirm Your Password"
                value={values.companyPasswordConfirm}
                error={
                  touched.companyPasswordConfirm &&
                  Boolean(errors.companyPasswordConfirm)
                }
                helperText={
                  touched.companyPasswordConfirm &&
                  errors.companyPasswordConfirm
                }
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <LockIcon style={{ color: "gray", marginRight: "8px" }} />
                  ),
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  handleInputChange(e.target.value, e.target.name, e);
                }}
              />
              <div
                style={{
                  marginTop: " 2% !important",
                  width: "84%",
                  marginLeft:"20px",
                  zIndex: "3",
                  height: "60px"
                }}
              >
                <UploadFileComponent
                  handleUploadF={handleInputChange}
                  element={
                    <button
                      type="button"
                      style={{
                        padding: "8px 10px ",
                        width: "auto",
                        backgroundColor: "transparent",
                        outline: "none",
                        border: "1px solid gray",
                        borderRadius: "6px",
                        color: "#363636",
                      }}
                    >
                      Upload license
                    </button>
                  }
                />
                {errors.license && (
                  <FormHelperText error>{errors.license}</FormHelperText>
                )}
              </div>
              <div  style={{
                  marginTop: " 2% !important",
                  width: "84%",
                  marginLeft:"20px",
                  zIndex: "3",
                  height: "60px"
                }}>
                <FormControlLabel
                  className={styles.checkLabel}
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
                  <FormHelperText error >
                    Please Check Agreeable
                  </FormHelperText>
                ) : null}
              </div>
              <div style={{ display: "flex", width: "100%" }}>
                <button
                  type="submit"
                  className={styles.btnStyle}
                  style={{
                    margin: "0 auto",
                    padding: "10px",
                    marginTop: "10px",
                  }}
                >
                  sign up
                </button>
              </div>
            </Form>
          </div>
          <div
            className={styles.card}
            style={{
              paddingTop: "50px",
              position: "relative",
              overflow: "hidden",
              height:"91%",
              
            }}
          >
            <div className={styles.welcomeSign}>
              <h2 style={{ textTransform: "uppercase", padding: "10px" }}>
       
                welecome to S.W.W
              </h2>
              <p>sign up to start your journey with us </p>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
