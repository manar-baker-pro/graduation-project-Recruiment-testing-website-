import { Company } from "../../../../setup/store/actions/company.Actions";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../setup/store/store";
import styles from "./companyProfile.module.css";
import {TextareaAutosize} from "@mui/base";
import BusinessIcon from "@mui/icons-material/Business";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import LightbulbCircleRoundedIcon from "@mui/icons-material/LightbulbCircleRounded";
import Cloudinary from "../../../../setup/globalConfig/cloudinary";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import {
  GetProfile,
  UpdateProfile,
} from "../../../../setup/store/actionsCreators/companyActionCreators/companyProfileActionCreator";
const RootDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "10px",
});
const AvatarImg = styled(Avatar)({
  marginBottom: "0.5rem",
});
const NameTypography = styled(Typography)({
  marginBottom: "0.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "uppercase",
});
const ItemTypography = styled(Typography)({
  color: "rgba(214, 197, 197, 0.7)",
  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
});

const COMPANYPROFILE: React.FC = () => {
  const companyProfileSt = useSelector(
    (state: RootState) => state.companyProfileReducer
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();
  const { compProfileDa } = companyProfileSt;
  const [edit, setEdit] = useState<Boolean>(false);
  const [isDis, setIsDes] = useState<Boolean>(false);
  useEffect(() => {
    dispatch(GetProfile());
    setIsDes(true);
  }, [dispatch]);
  const [companyProfile, setCompanyProfile] = useState<Company>({
    _id: "",
    companyName: "",
    emailWork: "",
    recruitmentOfficer: "",
    location: "",
    bio: "",
    profilePic: "",
    phoneNumber: "",
  });
  useEffect(() => {
    if (isDis && compProfileDa) {
      setCompanyProfile(compProfileDa);
      setIsDes(false);
      console.log(compProfileDa);
    }
  }, [compProfileDa, isDis]);
  const handleChangeProfile = (name: string, value?: string) => {
    setCompanyProfile({
      ...companyProfile,
      [name]: value,
    });
  };
  const handleEdit = () => {
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
    setEdit(!edit);
  };
  const handleCheckUpdate = () => {
    dispatch(UpdateProfile(companyProfile));
  };
  return (
    <RootDiv>
      <div style={{ position: "relative" }}>
        <AvatarImg
          alt={companyProfile.companyName}
          src={companyProfile.profilePic}
          style={{ width: "7rem", height: "7rem", objectFit: "cover" }}
        />
        <Cloudinary
          edit={edit}
          name={"profilePic"}
          handleSetImage={handleChangeProfile}
          element={
            <Avatar
              style={{
                backgroundColor: `${edit ? "red" : "gray"}`,
                position: "absolute",
                bottom: "5px",
                right: "2px",
                cursor: "pointer",
              }}
            
            >
              <EditRoundedIcon style={{ color: "var(--sleep-purple)" }} />
            </Avatar>
          }
        />
      </div>
      <NameTypography variant="h6">
        <BusinessIcon style={{ fontSize: "16px", margin: "2px" }} />
        {companyProfile?.companyName}
      </NameTypography>
      <ItemTypography variant="body2">
        {companyProfile?.emailWork}
      </ItemTypography>
      <div className={styles.companyProfileBottom}>
        <ItemTypography variant="body2">
          <BadgeRoundedIcon
            style={{ fontSize: "16px", marginRight: "10px", color: "gray" }}
          />

          <TextareaAutosize
            aria-label="empty textarea"
            name="recruitmentOfficer"
            placeholder="Empty"
            value={companyProfile.recruitmentOfficer}
            disabled={!edit}
            ref={textareaRef}
            className={styles.itemProfile}
            onChange={(e) => handleChangeProfile(e.target.name, e.target.value)}
          />
        </ItemTypography>
        <ItemTypography variant="body2">
          <LightbulbCircleRoundedIcon
            style={{ fontSize: "16px", marginRight: "10px", color: "gray" }}
          />
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Bio"
            name="bio"
            value={companyProfile.bio}
            disabled={!edit}
            className={styles.itemProfile}
            onChange={(e) => handleChangeProfile(e.target.name, e.target.value)}
          />
        </ItemTypography>
        <ItemTypography variant="body2">
          <AddLocationAltRoundedIcon
            style={{ fontSize: "16px", marginRight: "10px", color: "gray" }}
          />
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Location"
            name="location"
            disabled={!edit}
            value={companyProfile?.location}
            className={styles.itemProfile}
            onChange={(e) => handleChangeProfile(e.target.name, e.target.value)}
          />
        </ItemTypography>
        <ItemTypography variant="body2">
          <CallRoundedIcon
            style={{ fontSize: "16px", marginRight: "10px", color: "gray" }}
          />
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="phoneNumber"
            name="phoneNumber"
            disabled={!edit}
            value={companyProfile?.phoneNumber}
            className={styles.itemProfile}
            onChange={(e) => handleChangeProfile(e.target.name, e.target.value)}
          />
        </ItemTypography>
        <Button
          variant="contained"
          disabled={edit === true}
          onClick={handleEdit}
          className={styles.btnProfile}
        >
          Edit
        </Button>
        {edit && (
          <Button
            variant="contained"
            className={styles.btnProfile}
            onClick={(e) => {
              handleCheckUpdate();
              handleEdit();
            }}
          >
            Update
          </Button>
        )}
      </div>
    </RootDiv>
  );
};

export default COMPANYPROFILE;
