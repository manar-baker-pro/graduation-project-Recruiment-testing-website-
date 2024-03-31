import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SummaryPage from "./summaryPage";
import CandidatesPage from "./candidatesPage";
import SettingsPage from "./settingsPage";
import styles from "../companyDshHome.module.css";

export default function ColorTabs() {
  const [activeTab, setActiveTab] = useState("Summary");

  const handleChange = (event:any, newValue:any) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Summary":
        return <SummaryPage />;
      case "Candidates":
        return <CandidatesPage />;
      case "Settings":
        return <SettingsPage />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.surveyDetailsContainer}>
      <h1
        className={styles.titleSection}
        style={{ marginBottom: "20px", marginLeft: "10px", fontSize: "28px" }}
      >
        React Web Developer
      </h1>
      <Box sx={{ zIndex: "0" }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          
          sx={{
            "& .MuiTabs-indicator": {
              background: "linear-gradient(#3f38a3, #3d4ddd)",
              height: 3,
              top: 0,
            },
            "@media (max-width: 600px)": {
              "& .MuiTab-root": {
                fontSize: "14px",
              },
            },
            // '& .MuiTabs-flexContainer': {
            //   flexWrap: 'wrap',
            // },
          }}
        >
          <Tab
            value="Summary"
            label="Summary"
            className={styles.responsiveTap}
            style={{
              margin: "0 10px",
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              backgroundColor: activeTab === "Summary" ? "white" : "#dadddd",
              textTransform: "capitalize",
              letterSpacing: "1px",
              fontSize: "14px",
            }}
          />
          <Tab
            value="Candidates"
            label="Candidates"
            style={{
              margin: "0 10px",
              backgroundColor:
                activeTab === "Candidates" ? "white" : "#dadddd",
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              textTransform: "capitalize",
              letterSpacing: "1px",
              fontSize: "14px",
            }}
          />
          <Tab
            value="Settings"
            label="Settings"
            style={{
              margin: "0 10px",
              backgroundColor:
                activeTab === "Settings" ? "white" : "#dadddd",
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              textTransform: "capitalize",
              letterSpacing: "1px",
              fontSize: "14px",
            }}
          />
        </Tabs>
        <div style={{ background: "#fff", width: "98%", marginLeft: "10px" }}>
          <Box>{renderTabContent()}</Box>
        </div>
      </Box>
    </div>
  );
}
