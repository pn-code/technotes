import DashFooter from "../components/dashboard/DashFooter";
import DashHeader from "../components/dashboard/DashHeader";
import Prefetch from "../features/auth/Prefetch";

export default function DashLayout() {
  return (
    <>
      <DashHeader />
      <Prefetch />
      <DashFooter />
    </>
  );
}
