import TEMPDROWER from "../tempDrower";
import React from "react";
import { styled } from "@mui/system";
import { Box } from "@mui/material";
const Root = styled("div")({
  display: "flex",
});

const Drawer = styled("div")({
  flexShrink: 0,
});

const Content = styled(Box)({
  flexGrow: 1,
  padding: "16px",
  backgroundColor:"red",
  hieght:"100%"
});

export const HOMPAGE = () => {
  return (
    <Root>
      <Drawer>
        <TEMPDROWER />
      </Drawer>

      <Content>loreremmmmmmmmmm</Content>
    </Root>
  );
};
