import "./Nabar.css";
import { TiThMenu } from "react-icons/ti";
import { IoMdNotifications } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Navbar = ({ openSidebar }) => {
  return (
    <div className="topbar">
      <button onClick={openSidebar}>
        <TiThMenu />
      </button>
      <div className="topbar-left">
        <h1 className="sidebar-title">EduFlow</h1>
        <ul>
          <li>Dashboard</li>
        </ul>
      </div>
      <div className="topbar-rgt">
        <IoMdNotifications />
        <IoSettings />
        <CgProfile />
      </div>
    </div>
  );
};

export default Navbar;
