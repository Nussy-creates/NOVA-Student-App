import "./Sidebar.css";
import { IoMdSchool } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { IoBookSharp } from "react-icons/io5";
import { PiHeadCircuitFill } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = ({ closeSidebar }) => {
  return (
    <div className="sidebar">
      <aside className="sdr">
        <button onClick={closeSidebar}>
          <IoClose />
        </button>
      </aside>
      <div className="name">
        <IoMdSchool className="sidebar-icon" />
        <div className="tittle">
          <h1 className="sidebar-title">EduFlow</h1>
          <p>ACADEMIC CURATOR</p>
        </div>
      </div>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/">
              {" "}
              <span> Home</span>
            </Link>{" "}
            <IoHome />
          </li>
          <li>
            <IoBookSharp />
            <Link to="MyCourses">
              {" "}
              <span> My Courses</span>
            </Link>
          </li>
          <li>
            <Link to="AITutor">
              <PiHeadCircuitFill /> <span> AI Tutor</span>
            </Link>
          </li>
          <li>
            <FaCalendarAlt />
            <Link to="LessonPlans">
              <span> Lesson Plans</span>
            </Link>
          </li>
          <li>
            <MdAnalytics />
            <Link to="Analysis">
              <span> Analysis</span>
            </Link>
          </li>
        </ul>
      </div>
      <button className="btn">New Research</button>
      <div className="bottom">
        <h2>Help center</h2>
        <h2>Log out</h2>
      </div>
    </div>
  );
};

export default Sidebar;
