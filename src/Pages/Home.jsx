import "./Home.css";
import { MdAccessTime } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { LiaRobotSolid } from "react-icons/lia";
import { TbMathSymbols } from "react-icons/tb";
import { RiRobot2Line } from "react-icons/ri";
import { FaCode } from "react-icons/fa";
import { FaSignalMessenger } from "react-icons/fa6";
import { useEffect, useState } from "react";

const Home = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://nova-ai-backend.onrender.com/ask")
      .then((res) => res.text())
      .then((data) => {
        setMessage(data);
      });
  }, []);
  return (
    <div className="home">
      <div className="hero">
        <div className="desp">
          <h2>Welcome back, Nussaibah</h2>
          <p>
            You've mastered <strong>12 new concept </strong>
            this week Keep the Momentum going!
          </p>
          <p>{message}</p>
        </div>
      </div>
      <div className="row">
        <div className="row-1">
          <div className="data">
            <button>
              <MdAccessTime />
            </button>
            <h3>This week</h3>
          </div>
          <h3>Study Duration</h3>
          <h4>
            18.5 <span>hours</span>
          </h4>
        </div>
        <div className="row-2">
          <div className="data">
            <button>
              <IoIosStar />
            </button>
            <h3>Average Score</h3>
          </div>
          <h3>Mastery Level</h3>
          <h4>
            18.5 <span>hours</span>
          </h4>
        </div>

        <div className="row-3">
          <div className="data-1">
            <button>
              <LiaRobotSolid />
            </button>
            <h5>
              Your AI Tutor <span>Online & ready to help</span>
            </h5>
          </div>

          <h6>
            "Nussaibah,I noticed you're struggling with Ingeration by
            parts.Would You like a quick 5-minute refresher?"
          </h6>
        </div>
      </div>

      <div className="row-d">
        <div className="ass">
          <h4>
            Active Assignments <span>View all</span>
          </h4>
          <div className="ass-row">
            <div className="ass-row1">
              <h7>
                Advanced Calculus :Integration Theory{" "}
                <p>Due in 2days. Module 4</p>
              </h7>
            </div>

            <div className="ass-row2">
              <h7>
                Molecular Biology Lab Report <p>Due in 5days. Unit 7</p>
              </h7>
            </div>
            <div className="ass-row3">
              <h7>
                Renaissance Art History Essay <p>Due tomorrow .Final Project</p>
              </h7>
            </div>
          </div>
        </div>

        <div className="spec">
          <h2>Specialized Tutors</h2>
          <article>
            <h4>
              {" "}
              <button className="wrap">
                {" "}
                <TbMathSymbols />
              </button>
              Main Wizard
            </h4>
            <p>Algera,Calculus & Goemetry</p>
          </article>
          <article>
            <h4>
              <button className="wrap">
                <RiRobot2Line />
              </button>
              Linguish AI
            </h4>
            <p>Spanish,French & Manderan</p>
          </article>
          <article>
            <h4>
              <button className="wrap">
                <FaCode />
              </button>{" "}
              Code Mentor
            </h4>
            <p>Python,JS & Data Science</p>
          </article>
        </div>
      </div>
      <div className="msg">
        <p>Made by Nussy_codes 2026</p>
        <button className="msgw">
          <FaSignalMessenger />
        </button>
      </div>
    </div>
  );
};

export default Home;
