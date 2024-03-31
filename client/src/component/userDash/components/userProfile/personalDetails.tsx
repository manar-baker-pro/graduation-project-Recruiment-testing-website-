import {
  Grid,
  // FormControl,
  // FormLabel,
  // TextareaAutosize,
  Button,
  Avatar,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import React from "react";
import PhoneNumberInput from "./phoneInput";
import styles from "../../userDash.module.css";
import { styled } from "@mui/system";
import CountrySelect from "./selectCounty";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import UploadFileComponent from "../../../../setup/globalConfig/cloudinaryHandleFile";
const CountryContainer = styled(Grid)`
  display: flex;
  align-items: center;
`;

const CountryAvatar = styled(Avatar)`
  margin-right: 8px;
`;
const NameTypography = styled(Typography)({
  display: "flex",
  alignItems: "center",
  fontSize: "28px",
  color: "#272727",
  justifyContent: "center",
  textTransform: "capitalize",
});
const CustomTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    background-color: #fff;
    border-radius: 8px;
  }

  .MuiOutlinedInput-root:hover {
    background-color: #e0e0e0;
  }

  .MuiOutlinedInput-root.Mui-focused {
    background-color: #f0f0f0;
    border: 0.4px solid #3c3ce2;
  }

  .MuiOutlinedInput-input {
    padding: 10px 14px;
    width: 100%;
  }
`;
export default function PersonalDetails(props: any) {
  const {
    userProfile,
    edit,
    handleChangeProfile,
    newLink,
    handleAddLink,
    getFaviconUrl,
    getLinkDomain,
    handleRemoveLink,
    setNewLink,
  } = props;

  return (
    <div
      style={{
        height: "100%",
        width: "70%",
        display: "flex",
        flexDirection: "column",
        // justifyContent:"space-between",
        // backgroundColor: "red",
        rowGap: "0",
        margin: "auto",
      }}
    >
      {/* <Grid item xs={8} style={{ padding: "0px",height:"max-content"}}> */}
      <NameTypography
        variant="h6"
        // className={styles.personalDetItem}
        style={{ margin: "50px 0" }}
      >
        Personal Details
      </NameTypography>
      {/* </Grid> */}
      {/* <CountryContainer item xs={8} style={{ padding: "0px",height:"max-content"}}> */}
      <div className={styles.personalDetItem}>
        <CountrySelect
          coValue={userProfile.country}
          handleChangeProfile={handleChangeProfile}
          disabled={!edit}
        />
      </div>
      {/* </CountryContainer> */}

      {/* <Grid item xs={8} style={{ padding: "0px",margin:"0",height:"max-content"}}> */}
      <div className={styles.personalDetItem}>
        <PhoneNumberInput
          edit={edit}
          handleChangeProfile={handleChangeProfile}
          userProfile={userProfile}
          className={styles.personalDetItem}
        />
      </div>

      {/* </Grid> */}

      <div className={styles.personalDetItem}>
        <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <CustomTextField
            value={newLink}
            onChange={(e) => {
              setNewLink(e.target.value);
            }}
            placeholder="Enter a link"
            disabled={!edit}
            sx={{
              width: "88%",
            }}
          />
          <Fab
            aria-label="add"
            disabled={!edit}
            sx={{
              borderRadius: "10px ",
              padding: "0px",
              height: "100%",
              width: "10%",
              marginLeft: "10px",
              zIndex: "1",
              background:
                "linear-gradient( 45deg, var(--base-yellow), var(--base-yellow), #cf376a )",
            }}
            onClick={() => handleAddLink()}
          >
            <AddIcon style={{ fontSize: "14px" }} />
          </Fab>
          {/* <Button
            variant="contained"
            onClick={() => handleAddLink()}
            disabled={!edit}
          >
            Add Link
          </Button> */}
        </div>

        <ul>
          {userProfile.links?.map((link: any, key: any) => (
            <li
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginLeft:"10px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={getFaviconUrl(link)}
                  alt={getLinkDomain(link)}
                  width="16"
                  height="16"
                  style={{ marginRight: "5px" }}
                />
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
                {/* <span> ({getLinkDomain(link)})</span> */}
              </div>
              {edit && (
                <IconButton onClick={() => handleRemoveLink(key)}>
                  <CancelPresentationIcon />
                </IconButton>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* <Grid item xs={8}>
        <UploadFileComponent handleUploadF={handleChangeProfile} />
      </Grid> */}
    </div>
  );
}
