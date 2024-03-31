import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const CircularProgressWithLabel = (
  props: any & { value: number }
) => {
   const {isupload,value}=props;
  return (
    <Box
    //   sx={{ position: "relative", display: "inline-flex" }}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        // display: `${value? "block" : "none"}`,
      }}
    >
    <CircularProgress  style={{color:"#7f33ec"}} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          fontSize="10px"

        >{`${Math.round(value)>0&&Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
};
