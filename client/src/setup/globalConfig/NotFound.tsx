import React from "react";
import { styled } from "@mui/system";
import { Typography, Button } from "@mui/material";
import "./sylesSass/NotFoundPage.scss";
import { useNavigate } from 'react-router-dom';
const NotFoundContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const NotFoundText = styled(Typography)`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const NotFoundButton = styled(Button)`
  margin-top: 16px;
`;

const NotFoundPage = () => {
  const navigate=useNavigate();
  const handleGoBack=()=>{
    navigate(-1);
  }
  return (
    <NotFoundContainer>
      <NotFoundText variant="h1">404</NotFoundText>
      <Typography variant="h4">Page Not Found</Typography>
      <NotFoundButton className="NotFoundButton" variant="contained" color="primary" onClick={handleGoBack}>
        Go Back
      </NotFoundButton>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
