import React, { useState } from "react";
import { makeStyles } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { capitalize } from "@mui/material";
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tab: {
    fontSize: 12,
    color: "#9da1a1",
    textTransform: "capitalize",
    height: 10,
    fontWeight: 500,
  },
  tabs: {
    height: 20,
    border:"none !important",
    
  },
});
export default function TAB() {
  // const classes = useStyles();
  const [valueTabs, setValueTabs] = useState<string>("Questions");
  const handleChangeTap = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValueTabs(newValue);
  };
  return (
    // <Paper className={classes.root}>
    //   <Tabs
    //     value={valueTabs}
    //     centered={true}
    //     textColor="primary"
    //     indicatorColor="primary"
    //     className={classes.tabs}
    //     onChange={handleChangeTap}
    //   >
    //     <Tab label="Questions" value="Questions" className={classes.tab}></Tab>
    //     <Tab label="Responses" value="Responses" className={classes.tab}></Tab>
    //   </Tabs>
    // </Paper>
    <></>
  );
}
