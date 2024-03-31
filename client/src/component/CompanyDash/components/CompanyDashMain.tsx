import React from "react";
import TEMPDROWER from "./tempDrower";
import { Outlet } from "react-router-dom";

export default function CompanyDashMain() {
  return (
    <div>
      <TEMPDROWER />
      <Outlet/>
    </div>
  );
}
