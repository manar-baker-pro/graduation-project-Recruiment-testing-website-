import React, { useState } from "react";
import {
  Typography,
  Container,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  styled,
  CardMedia,
} from "@mui/material";
import im from "../../../../../public/assets/images/alaa.png";
import {
  PlayArrow,
  CheckCircleOutline,
  HelpOutline,
  AccessTime,
  Add,
} from "@mui/icons-material";
import GradingIcon from "@mui/icons-material/Grading";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import DoneAllIcon from '@mui/icons-material/DoneAll';
const tests = [
  {
    id: 1,
    name: "Test 1",
    technology: "React",
    passPercentage: 80,
    duration: 60,
    image: "image-url-1",
  },
  {
    id: 2,
    name: "Test 2",
    technology: "JavaScript",
    passPercentage: 75,
    duration: 45,
    image: "image-url-2",
  },
];

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: "#ffffff",
  padding: theme.spacing(6),
  borderRadius: "8px",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-around",
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  justifyContent: "center",
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));
const ButtonStart = styled(Button)`
  cursor: pointer;
  color: #5435dd;
  background: transparent;
  text-transform:capitalize;
  border: none;
  border-radius: 10px;
  align-self: flex-end;
  margin: 0;
  box-shadow: none;
  z-index: 1000;
  position: relative;
  &:hover {
    color: white;
    background: transparent;
    box-shadow: none;
  }
  &::before,
  &::after {
    margin: 0px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    color: #fff;
  }

  &::before {
    background: transparent;
    content: "";
    -webkit-clip-path: polygon(0% 0%, 100% 0, 100% 50%, 100% 100%, 0% 100%);
    clip-path: polygon(0% 0%, 100% 0, 100% 50%, 100% 100%, 0% 100%);
    transition: clip-path 0.4s cubic-bezier(0.2, 1, 0.8, 1),
      -webkit-clip-path 0.4s cubic-bezier(0.2, 1, 0.8, 1);
    z-index: -100;
  }

  &:hover::before {
    background: linear-gradient(to right, #6c46eb, #582de4, #422ef2);
    -webkit-clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
    clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
  }
  &:hover span {
    transform: translate3d(-10px, 0, 0);
    /* color: #fff !important; */
  }
`;
const StyledCardLabel = styled(Typography)`
  position: absolute;
  top: 0px;
  left: 20px;
  transform: translateX(-50%);
  background: linear-gradient( 45deg, var(--base-yellow), var(--base-yellow), #cf376a );
  color: #ffffff;
  padding: 3px;
  border-radius: 4px;
  clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%);
`;

const StyledCardImage = styled(CardMedia)(({ theme }) => ({
  width: "60%",
  height: "130px",
  alignSelf: "flex-end",
  border: "1px solid #000",
  borderRadius: "100% 0% 0% 100% / 0% 0% 100% 100%",
  objectFit: "cover",
}));

const StyledCard = styled(Card)`
  /* width: 300px; */
  position:relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

export default function AddNewUserExperience() {
  const [completedTests, setCompletedTests] = useState<number[]>([]);
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [requestedTechnology, setRequestedTechnology] = useState("");

  const handleTestCompletion = (testId: number) => {
    if (!completedTests.includes(testId)) {
      setCompletedTests([...completedTests, testId]);
    }
  };

  const isTestCompleted = (testId: number) => completedTests.includes(testId);

  const handleRequestDialogOpen = () => {
    setOpenRequestDialog(true);
  };

  const handleRequestDialogClose = () => {
    setOpenRequestDialog(false);
    setRequestedTechnology("");
  };

  const handleRequestSubmit = () => {
    handleRequestDialogClose();
  };
  const handleTestStart = (testId: any) => {
    console.log(`Start Test ${testId}`);
  };
  const handleRequestedTechnologyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRequestedTechnology(event.target.value);
  };

  return (
    <StyledContainer maxWidth="md">
      <StyledTitle variant="h5">Add New Experience</StyledTitle>
      <Typography variant="body1" paragraph color="#616161">
        To add a specific experience to your profile, you must successfully pass
        the corresponding test. If you fail the test, you won't be able to apply
        for it again until two months from the date of your previous attempt. We
        believe that this requirement enhances the quality and credibility of
        user experiences. Embrace the challenge, be ready for it, and start
        adding your amazing experiences to your profile!
      </Typography>
      <StyledTitle variant="h6">Experience Tests Available</StyledTitle>
      <Grid container spacing={2}>
        <Grid item xs={10} sm={3}>
          <StyledCard>
            <StyledCardContent style={{ flexDirection: "column" }}>
              <StyledCardImage
                style={{ border: "none", width: "100%", height: "90px" }}
              >
                <StyledCardActions>
                  <Tooltip title="Request Experience">
                    <StyledIconButton
                      color="primary"
                      onClick={handleRequestDialogOpen}
                    >
                      <Add style={{ fontSize: "60px" }} />
                    </StyledIconButton>
                  </Tooltip>
                </StyledCardActions>
              </StyledCardImage>
              <Typography variant="h6" style={{ fontSize: "18px" }}>
                Request Experience
              </Typography>
              <Typography
                variant="body2"
                style={{ fontSize: "14px" }}
                color="text.secondary"
              >
                Can't find the technology you want to add? Request it!
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        {tests.map((test) => (
          <Grid item xs={10} sm={3} key={test.id}>
            <StyledCard>
              {isTestCompleted(test.id) ? (
                <StyledCardLabel variant="caption"><DoneAllIcon/></StyledCardLabel>
              ) : (
                <StyledCardLabel variant="caption"><HourglassTopIcon style={{fontSize:"20px"}}/></StyledCardLabel>
              )}
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={0}
                key={test.id}
              >
                <Typography
                  variant="h6"
                  component="div"
                  style={{ paddingLeft: "20px" }}
                >
                  {test.name}
                </Typography>
                <StyledCardImage image={im} />
              </Grid>
              <StyledCardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  title="total Question"
                >
                  <HelpOutline
                    style={{ fontSize: "14px", marginLeft: "4px" }}
                  />
                  10
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  title="Success Rate"
                >
                  <GradingIcon
                    style={{ fontSize: "14px", marginLeft: "4px" }}
                  />
                  {test.passPercentage}%
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  title=" Duration"
                >
                  <AccessTime style={{ fontSize: "14px", marginLeft: "4px" }} />
                  {test.duration} min
                </Typography>
              </StyledCardContent>
              <ButtonStart
                variant="contained"
                style={{}}
                endIcon={<PlayArrow style={{ fontSize: "26px" }} />}
                onClick={() => handleTestStart(test.id)}
                // disabled={isTestCompleted?true:false}
              >
                Start
              </ButtonStart>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openRequestDialog} onClose={handleRequestDialogClose}>
        <DialogTitle>Request Experience</DialogTitle>
        <DialogContent>
          <TextField
            label="Technology"
            value={requestedTechnology}
            onChange={handleRequestedTechnologyChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestDialogClose}>Cancel</Button>
          <Button onClick={handleRequestSubmit} color="primary">
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
}
