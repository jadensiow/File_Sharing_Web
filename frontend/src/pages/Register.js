// https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up

import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";

// Redux
import { register } from "../redux/action/auth";
import { useSelector, useDispatch } from "react-redux";

import Videos from "../functions/Videos";
import "../css/register.css";
import { toastrError } from "../functions/toastrs";
import { motion } from "framer-motion";

import { registerRouteTransition } from "../functions/routeAnimation";

const Register = () => {
  // Tab title
  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  const dispatch = useDispatch();
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    cfmPassword: "",
  });
  let history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  const { firstName, lastName, username, email, password, cfmPassword } =
    registration;

  const onChange = (e) =>
    setRegistration({ ...registration, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== cfmPassword) {
      // get setAlert from actions which is store in the redux store
      toastrError("Registration failed, password do not match", "");
    } else {
      dispatch(register({ firstName, lastName, username, email, password }));
    }
  };

  return (
    <div>
      <motion.div
        variants={registerRouteTransition}
        initial="hidden"
        animate="show"
        exit="exit"
        className="outer-div"
      >
        <div className="backBtn">
          <span className="line tLine"></span>
          <span className="line mLine"></span>
          <span onClick={handleClick} className="label">
            Back
          </span>
          <span className="line bLine"></span>
        </div>
        <div className="showcase">
          <Videos />
        </div>
        <div className="loginBox">
          <h2>Sign Up</h2>
          <form>
            <p>First Name</p>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={(e) => onChange(e)}
              value={firstName}
            />
            <p>Last Name</p>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={(e) => onChange(e)}
              value={lastName}
            />
            <p>Username</p>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => onChange(e)}
              value={username}
            />
            <p>Email</p>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => onChange(e)}
              value={email}
            />
            <p>Password</p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => onChange(e)}
              value={password}
            />
            <p>Confirm Password</p>
            <input
              type="password"
              name="cfmPassword"
              placeholder="Confirm password"
              onChange={(e) => onChange(e)}
              value={cfmPassword}
            />
            <button onClick={(e) => onSubmit(e)}>Sign up</button>
            <br></br>
            <a href="/login">Already have an account? Sign in</a>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
