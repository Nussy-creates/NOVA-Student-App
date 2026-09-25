import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`layout ${open ? "sidebar-open" : ""}`}>
      {open && <Sidebar closeSidebar={() => setOpen(false)} />}

      <div className="main-area">
        <Navbar openSidebar={() => setOpen(true)} />

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
