import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getResponsesSurvey } from "../../../../setup/store/actionsCreators/responsesActionCreators/responses.actionsCreators";
import { RootState } from "../../../../setup/store/store";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";

const StyledTableContainer = styled(TableContainer)`
  width: 100%;
  /* margin-top: ${({ theme }) => theme.spacing(3)}; */
  overflow-x: auto;
`;

const StyledTable = styled(Table)`
  min-width: 650px;
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: ${({ theme }) => theme.palette.background.default};
    color: ${({ theme }) => theme.palette.text.primary};
  }

  &:nth-of-type(odd) {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.text.secondary};

  }
`;

const ResponsiveTableContainer = styled(TableContainer)`
  overflow-x: auto;
`;

function CandidatesPage() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#8744f3",
      },
      text: {
        primary: "#fff",
        secondary:"#272727"
      },
      background: {
        default: "#b8d0f5",
      },
    },
  });
  const themeOptions = useTheme();
  const isMobile = useMediaQuery(themeOptions.breakpoints.down("sm"));
  const { id } = useParams();
  const dispatch = useDispatch();
  const surveyReducer = useSelector(
    (state: RootState) => state.responseReducer
  );
  const { responses } = surveyReducer;
  useEffect(() => {
    id && dispatch(getResponsesSurvey(id));
  }, [id]);
  return (
    <div style={{ backgroundColor: "#fff", padding: "20px" }}>
      <ThemeProvider theme={theme}>
        {isMobile ? (
          <ResponsiveTableContainer>
            <StyledTable className="table" aria-label="striped table">
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Response Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {responses?.map((response, indexResponse) => {
                  return (
                    <StyledTableRow key={indexResponse}>
                      <TableCell>
                        <Grow in={true} style={{ transformOrigin: "0 0 0" }}>
                          <Box display="flex" alignItems="center">
                            <Avatar
                              src={response.user.profilePic}
                              alt={response.user.username}
                              sx={{ marginRight: "10px" }}
                            />
                            <Typography
                              variant="body1"
                              style={{ textTransform: "capitalize" }}
                            >
                              {response.user.username}
                            </Typography>
                          </Box>
                        </Grow>
                      </TableCell>
                      <TableCell>Value 2</TableCell>
                      <TableCell>Value 3</TableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </StyledTable>
          </ResponsiveTableContainer>
        ) : (
          <StyledTableContainer>
            <StyledTable className="table" aria-label="striped table">
              <TableHead style={{ backgroundColor: "#1d0555", color: "white" }}>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Response Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {responses?.map((response, indexResponse) => {
                  return (
                    <>
                    <StyledTableRow key={indexResponse}>
                      <TableCell>
                        <Grow in={true} style={{ transformOrigin: "0 0 0" }}>
                          <Box display="flex" alignItems="center">
                            <Avatar
                              src={response.user.profilePic}
                              alt={response.user.username}
                              sx={{ marginRight: "10px" }}
                            />
                            <Typography
                              variant="body1"
                              style={{ textTransform: "capitalize" }}
                            >
                              {response.user.username}
                            </Typography>
                          </Box>
                        </Grow>
                      </TableCell>
                      <TableCell>Value 2</TableCell>
                      <TableCell>Value 3</TableCell>
                    </StyledTableRow>
                    <StyledTableRow key={indexResponse}>
                      <TableCell>
                        <Grow in={true} style={{ transformOrigin: "0 0 0" }}>
                          <Box display="flex" alignItems="center">
                            <Avatar
                              src={response.user.profilePic}
                              alt={response.user.username}
                              sx={{ marginRight: "10px" }}
                            />
                            <Typography
                              variant="body1"
                              style={{ textTransform: "capitalize" }}
                            >
                              {response.user.username}
                            </Typography>
                          </Box>
                        </Grow>
                      </TableCell>
                      <TableCell>Value 2</TableCell>
                      <TableCell>Value 3</TableCell>
                    </StyledTableRow>
                    </>
                  );
                })}
              </TableBody>
            </StyledTable>
          </StyledTableContainer>
        )}
      </ThemeProvider>
    </div>
  );
}

export default CandidatesPage;
