import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Typography,
  Button,
  Tabs,
  Tab,
  Divider,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../setup/store/store";
import styles from "../../userDash.module.css";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Cloudinary from "../../../../setup/globalConfig/cloudinary";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
  GetProfile,
  UpdateProfile,
} from "../../../../setup/store/actionsCreators/userActionCreators/userProfile.actionCreators";
import { User } from "../../../../setup/store/reducers/userReducers/userReducer.interface";
import PersonalDetails from "./personalDetails";
import DispalyUserExperiences from "./displayUserExperiences";

const StyledTab = styled(Tab)(({ theme }) => ({
  margin: "10px",
  minWidth: "unset",
  width: "40.5%",
  backgroundColor: "transparent",
  padding: "15px 30px",
  paddingLeft: "0px",
  borderRadius: "4px 0 0 4px",
  color: "#dddada",
  "&.Mui-selected": {
    color: "#5c2be2",
    backgroundColor: "#fff",
    fontWeight: "600",
  },
}));
const StyledTabs = styled(Tabs)(({ theme }) => ({
  position: "absolute",
  top: "44%",
  left: "-42%",
  width: "100%",

  "& .MuiTabs-indicator": {
    right: "auto",
    width: "4px",
    left: "2px",
    borderRadius: "4px 0 0 4px",
    background: "linear-gradient(to bottom, #ff8a00, #e52e71) !important",
  },
}));

const AvatarImg = styled(Avatar)({
  marginBottom: "0.5rem",
});

const NameTypography = styled(Typography)({
  marginBottom: "0.25rem",
  display: "flex",
  alignItems: "center",
  fontSize: "22px",
  justifyContent: "center",
  textTransform: "capitalize",
});

const ItemTypography = styled(Typography)({
  color: "rgba(214, 197, 197, 0.7)",
  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
});
const UserProfileComp = (props: any) => {
  const userProfileReducer = useSelector(
    (state: RootState) => state.userProfileReducer
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();
  const { userProfileDa } = userProfileReducer;
  const [edit, setEdit] = useState<Boolean>(false);
  const [isDis, setIsDes] = useState<Boolean>(false);
  const { handleClose } = props;
  const [tabInfo, setTabInfo] = useState<string>("personal details");
  const handleTabInfo = (event: React.SyntheticEvent, newValue: string) => {
    setTabInfo(newValue);
  };
  useEffect(() => {
    dispatch(GetProfile());
    setIsDes(true);
  }, [dispatch]);
  const [newLink, setNewLink] = useState<string>("");
  const [userProfile, setUserProfile] = useState<User>({
    username: "",
    email: "",
    profilePic: "",
    phoneNumber: undefined,
    country: "",
    gender: "",
    links: [],
    cv: "",
    experience: undefined,
  });

  useEffect(() => {
    if (isDis && userProfileDa) {
      setUserProfile(userProfileDa);
      setIsDes(false);
      console.log(userProfileDa);
    }
  }, [userProfileDa, isDis]);

  const handleChangeProfile = (name: string, value?: string) => {
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
    console.log(userProfile.cv);
  };

  const handleEdit = () => {
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
    setEdit(!edit);
  };
  const handleCancel = () => {
    setEdit(!edit);
  };

  const handleCheckUpdate = () => {
    dispatch(UpdateProfile(userProfile));
  };

  const handleAddLink = () => {
    if (newLink.trim() !== "") {
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        links: prevProfile.links ? [...prevProfile.links, newLink] : [newLink],
      }));
      setNewLink("");
    }
  };

  const handleRemoveLink = (index: number) => {
    setUserProfile((prevProfile) => {
      const links = prevProfile.links as string[];

      const updatedLinks = [...links];
      updatedLinks.splice(index, 1);

      return {
        ...prevProfile,
        links: updatedLinks,
      };
    });
  };

  const getLinkDomain = (urlLink: any) => {
    if (!urlLink || urlLink.trim() === "") {
      return "";
    }
    let hostname = "";
    try {
      const url = new URL(urlLink);
      hostname = url.hostname;
    } catch (error) {
      console.error("Invalid URL:", urlLink);
    }
    return hostname;
  };

  const getFaviconUrl = (urlLink: any) => {
    if (!urlLink || urlLink.trim() === "") {
      return "";
    }

    let faviconUrl = "";
    try {
      const url = new URL(urlLink);
      faviconUrl = `https://www.google.com/s2/favicons?domain=${url.hostname}`;
    } catch (error) {
      console.error("Invalid URL:", urlLink);
    }
    return faviconUrl;
  };

  return (
    <Grid container spacing={0} justifyContent="center">
      <Grid
        item
        xs={4}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",

          background: `linear-gradient(120deg,#6a4af1,#7f51f0)`,
          padding: "20px",
          paddingTop: "50px",
          minHeight: "90vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
            }}
          >
            <AvatarImg
              alt={userProfile.username}
              src={userProfile.profilePic}
              style={{
                width: "7rem",
                height: "7rem",
                objectFit: "cover",
                border: "2px solid #c6cdee",
              }}
            />
            <Cloudinary
              edit={edit}
              name={"profilePic"}
              handleSetImage={handleChangeProfile}
              element={
                <Avatar
                  style={{
                    background: "linear-gradient(to bottom, #ff8a00, #e52e71)",
                    position: "absolute",
                    bottom: "5px",
                    right: "2px",
                    cursor: "pointer",
                    border: "0.5px solid rgba(80, 79, 79, 0.5)",
                  }}
                >
                  <EditRoundedIcon
                    style={{
                      color: `${edit ? "#fff" : "rgba(65, 63, 63, 0.3)"}`,
                    }}
                  />
                </Avatar>
              }
            />
          </div>
          <NameTypography variant="h6">
            <AccountBoxIcon style={{ fontSize: "18px", margin: "2px" }} />
            {userProfile?.username}
          </NameTypography>
          <ItemTypography variant="body2">
            <EmailRoundedIcon style={{ fontSize: "16px", margin: "2px" }} />
            {userProfile?.email}
          </ItemTypography>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            width: "100%",
          }}
        >
          {edit === true ? (
            <Button
              variant="contained"
              onClick={handleCancel}
              className={styles.btnCancel}
              style={{
                margin: "5px",
                width: "50%",
                backgroundColor: "#6163db!important",
              }}
            >
              Cancel
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled={edit === true}
              onClick={handleEdit}
              className={styles.btnProfile}
              style={{ margin: "5px", width: "50%" }}
            >
              Edit
            </Button>
          )}

          {edit && (
            <Button
              variant="contained"
              className={styles.btnProfile}
              style={{ margin: "5px", width: "50%" }}
              onClick={(e) => {
                handleCheckUpdate();
                handleEdit();
              }}
            >
              Update
            </Button>
          )}
        </div>
      </Grid>

      <Grid
        item
        xs={8}
        className={styles.userProfileBottom}
        style={{ position: "relative" }}
      >
        <StyledTabs
          value={tabInfo}
          onChange={handleTabInfo}
          orientation="vertical"
        >
          <StyledTab label="personal details" value="personal details" />
          <Divider style={{ width: "42%" }} />
          <StyledTab label="Your Experience" value="your experience" />
          <Divider style={{ width: "42%" }} />

          <StyledTab label="Change password" value="change password" />
        </StyledTabs>
        {tabInfo === "personal details" && (
          <PersonalDetails
            userProfile={userProfile}
            edit={edit}
            handleChangeProfile={handleChangeProfile}
            newLink={newLink}
            handleAddLink={handleAddLink}
            getFaviconUrl={getFaviconUrl}
            getLinkDomain={getLinkDomain}
            handleRemoveLink={handleRemoveLink}
            setNewLink={setNewLink}
          />
        )}
        {tabInfo === "your experience" && (
          // <></>
          <DispalyUserExperiences handleClose={handleClose} />
        )}
        {tabInfo === "change password" && (
          <div style={{ backgroundColor: "red" }}>change password </div>
        )}
      </Grid>
    </Grid>
  );
};

export default UserProfileComp;
