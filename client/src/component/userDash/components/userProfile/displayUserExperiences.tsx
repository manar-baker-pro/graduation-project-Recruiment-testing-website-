import React, { useState } from "react";
import { styled } from "@mui/system";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Typography, IconButton } from "@mui/material";
import {  Star, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StyledTimelineDot = styled(TimelineDot)`
  &.MuiTimelineDot-root {
    background-color: #892cf3;
    color: #fff;
  }
`;

const StyledTimelineContent = styled(TimelineContent)`
  &.MuiTimelineContent-root {
    color: #000;
    width:fit-content;
    background-color: transparent;
    margin: 0;
  }
`;

const StyledTimelineConnector = styled(TimelineConnector)`
  &.MuiTimelineConnector-root {
    background-color: #e2e2e2;
  }
`;

const DisplayUserExperiences = (props:any) => {
  const [technologies, setTechnologies] = useState(["React", "Node.js"]);
  const {handleClose}=props
const navigate=useNavigate();
  const addTechnology = () => {
    navigate(`/userDash/addNewExperience`);
    handleClose();
  };

  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <StyledTimelineDot>
            <IconButton onClick={addTechnology}>
              <Add style={{color:"#fff"}} />
            </IconButton>
          </StyledTimelineDot>
          <StyledTimelineConnector />
        </TimelineSeparator>
        <StyledTimelineContent>
          <Typography variant="subtitle1">
            Add Technology
          </Typography>
        </StyledTimelineContent>
      </TimelineItem>
      {technologies.map((technology, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <StyledTimelineDot>
              <Star />
            </StyledTimelineDot>
            <StyledTimelineConnector />
          </TimelineSeparator>
          <StyledTimelineContent>
            <Typography variant="subtitle1" component="span">
              {technology}
            </Typography>
          </StyledTimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default DisplayUserExperiences;
