import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="d-flex min-vh-100">
      <Sidebar />

       <Outlet/>
    </div>
  );
}

export default Layout;