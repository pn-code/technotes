import { Outlet } from "react-router-dom";
import DashHeader from "../components/dashboard/DashHeader";

export default function DashLayout() {
  return (
    <>
      <DashHeader />
      <div>
        <Outlet />
      </div>
    </>
  );
}
