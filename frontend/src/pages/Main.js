import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../css/main.css";
import Videos from "../functions/Videos";
import { motion } from "framer-motion";
import { mainRouteTransition } from "../functions/routeAnimation";

const Main = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <div>
      <motion.div
        variants={mainRouteTransition}
        initial="hidden"
        animate="show"
        exit="exit"
        className="outer-div"
      >
        <section className={open ? "showcase active" : "showcase"}>
          <header>
            <h2 className="logo">Home</h2>
            <div
              className={open ? "toggle active" : "toggle"}
              onClick={handleToggle}
            ></div>
          </header>
          <Videos />
          <div className="overlay"></div>
          <div className="text">
            <h2>File Hosting</h2>
            <h3>Upload now! </h3>
            <p>Upload your videos and enjoy content from others!!</p>
            <Link to="" onClick={handleToggle}>
              Explore
            </Link>
          </div>
        </section>
        <div className="menu">
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            {/* <li>
                        <Link to="/uploadtest">Upload Test</Link>
                    </li> */}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Main;
