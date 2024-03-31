import { Outlet } from "react-router-dom";
import TempDrweUserDash from "./tempDrweUserDash";

export default function USEERDASH() {
  return (
    <div>
      <TempDrweUserDash />
      <Outlet />
    </div>
  );
}
