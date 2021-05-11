// https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in

import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/action/auth";
import Videos from "../functions/Videos";
import { Link } from "react-router-dom";
import "../css/login.css";

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const { username, password } = formData;

  // to enable both to be typed
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // run login function in actions/auth
    dispatch(login(username, password));
  };
  let history = useHistory();

  const handleClick = () => {
    history.push("/");
  };
  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <div className="backBtn">
        <span className="line tLine"></span>
        <span className="line mLine"></span>
        <span onClick={handleClick} href="/" className="label">
          Back
        </span>
        <span className="line bLine"></span>
      </div>
      <div className="showcase">
        <Videos />
      </div>
      <div id="loginBox">
        <h2>Login</h2>
        <form>
          <p>Username</p>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => onChange(e)}
            value={username}
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => onChange(e)}
            value={password}
          />
          <button onClick={(e) => onSubmit(e)}>Sign in</button>

          <br></br>
          <Link to={"/register"}>Don't have an account? Sign Up Now!</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
