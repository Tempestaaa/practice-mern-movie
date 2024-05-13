import { Outlet } from "react-router";
import Navigation from "../pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className="min-h-svh bg-slate-950 text-white">
      <Navigation />
      <ToastContainer />
      <Outlet />
    </div>
  );
};

export default Layout;
