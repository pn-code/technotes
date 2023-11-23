import { Outlet } from "react-router-dom";
import Navbar from "../features/navigation/Navbar";

export default function RootLayout() {
  return (
    <main className="">
      <Navbar />
      <Outlet />
    </main>
  );
}
