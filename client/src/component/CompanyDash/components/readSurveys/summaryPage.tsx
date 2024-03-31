import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../setup/store/store";
import { useParams } from "react-router-dom";
import { getSurveyDetails } from "../../../../setup/store/actionsCreators/surveyActionCreators/surveyDetails.actionCreator";
import expiredIcon from "../../../../../public/assets/images/expired.png";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import SubtitlesOffIcon from "@mui/icons-material/SubtitlesOff";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import StarsIcon from "@mui/icons-material/Stars";
import { keyframes } from "@emotion/react";
import dayjs from "dayjs";
import DoNotDisturbRoundedIcon from "@mui/icons-material/DoNotDisturbRounded";
const ScrollableBox = styled(Box)({
  maxHeight: "400px",
  overflowY: "scroll",
});
const pulseAnimation = keyframes`
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  `;
const AnimatedBadge = styled(Avatar)({
  animation: `${pulseAnimation} 2s infinite`,
});
const SummaryPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const surveyReducer = useSelector(
    (state: RootState) => state.surveyDetailsReducer
  );
  const { surveyDetData } = surveyReducer;

  useEffect(() => {
    id && dispatch(getSurveyDetails(id));
  }, [dispatch, id]);

  return (
    <Box sx={{ p: 5 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5">Survey status</Typography>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12} sm={6} lg={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minHeight: "150px",
                  // p: 2,
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
                  borderRadius: "4px",
                  background: "#FFFFFF",
                }}
              >
                <AnimatedBadge
                  sx={{
                    width: 55,
                    height: 55,

                    backgroundImage: `linear-gradient(45deg,rgba(83, 67, 241,1),rgba(140, 85, 240,1))`,
                    color: "#fff",
                    mb: 1,
                    mt: 2,
                  }}
                >
                  {surveyDetData?.questionCount}
                </AnimatedBadge>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {/* <Typography
                      variant="h4"
                      sx={{ color: "#000", mr: 1, fontWeight: 500 }}
                    >
                      {surveyDetData?.questionCount}
                    </Typography> */}
                  <Typography variant="subtitle1" sx={{ color: "#000" }}>
                    Total Questions
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <StarsIcon sx={{ color: "#333", fontSize: "14px", mr: 1 }} />
                  <Typography variant="caption" sx={{ color: "#333" }}>
                    Required: {surveyDetData?.requiredQuestionCount}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minHeight: "150px",
                  // p: 2,
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
                  borderRadius: "4px",
                  background: "#FFFFFF",
                }}
              >
                <AnimatedBadge
                  sx={{
                    width: 55,
                    height: 55,

                    backgroundImage: `linear-gradient(45deg, #f79651, #f03f8e)`,
                    color: "#fff",
                    mb: 1,
                    mt: 2,
                  }}
                >
                  {surveyDetData?.responseCount}
                </AnimatedBadge>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: "#000" }}>
                    Number of Respondents
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Typography variant="caption" sx={{ color: "#333" }}>
                    Last Response In:
                    {dayjs(surveyDetData?.lastResponseCreatedAt).format(
                      "MMM D, YYYY"
                    )}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minHeight: "150px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
                  borderRadius: "4px",
                  background: "#FFFFFF",
                }}
              >
                <AnimatedBadge
                  sx={{
                    width: 55,
                    height: 55,
                    background: `linear-gradient(45deg, #1bcfb4, #198ae3)`,
                    color: "#fff",
                    mb: 1,
                    mt: 2,
                    backgroundPosition: "center",
                    backgroundSize: "20%",
                  }}
                  src={expiredIcon}
                >
                  {/* {surveyDetData?.status === "expired" ? (
                    <DoNotDisturbRoundedIcon />
                  ) : (
                    <></>
                  )} */}
                </AnimatedBadge>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#333", textTransform: "capitalize" }}
                >
                  {surveyDetData?.status}
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    // flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  {/* <AccessTimeFilledIcon /> */}
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#333",
                      fontSize: "11px",
                      display: "flex",
                      alignItems: "center",
                      mt: 1,
                    }}
                    title={surveyDetData?.createdAt}
                  >
                    <EventAvailableIcon
                      sx={{ color: "#333", fontSize: "14px", mr: 0.5 }}
                    />
                    {dayjs(surveyDetData?.createdAt).format("MMM D, YYYY")}
                  </Typography>
                  <TrendingFlatIcon
                    sx={{ color: "#333", fontSize: "18px", mt: 1 }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#333",
                      fontSize: "11px",
                      display: "flex",
                      alignItems: "center",
                      mt: 1,
                    }}
                    title={surveyDetData?.expireDate}
                  >
                    <SubtitlesOffIcon
                      sx={{ color: "#333", fontSize: "14px", mr: 0.5 }}
                    />
                    {dayjs(surveyDetData?.expireDate).format("MMM D, YYYY")}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Typography variant="h5">Job Description</Typography>
        <Typography
          variant="body1"
          sx={{
            padding: "5px",
            fontWeight: "400",
            width: "100%",
            wordWrap: "break-word",
            color: "#747272",
          }}
        >
          {surveyDetData?.description}
        </Typography>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5">Required Technologies</Typography>
        <ScrollableBox>
          <Grid container spacing={2} sx={{ pt: 6 }}>
            {surveyDetData?.requiredExperiences.map((tech, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    position: "relative",
                  }}
                >
                  <Avatar
                    alt={tech.technology.TechnologyName}
                    src={tech.technology.picture}
                    sx={{
                      width: 80,
                      height: 80,
                      border: "0.5px solid rgba(57, 57, 58,0.3)",
                    }}
                  />
                  <Typography variant="body2" align="center">
                    {tech.technology.TechnologyName}
                  </Typography>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      position: "absolute",
                      backgroundImage: `linear-gradient(45deg,rgba(83, 67, 241,1),rgba(140, 85, 240,1))`,
                      top: "-10%",
                      right: "26%",
                      textTransform: "capitalize",
                    }}
                  >
                    {tech.experienceLevel.charAt(0)}
                  </Avatar>
                </Box>
              </Grid>
            ))}
          </Grid>
        </ScrollableBox>
      </Box>
    </Box>
  );
};

export default SummaryPage;
