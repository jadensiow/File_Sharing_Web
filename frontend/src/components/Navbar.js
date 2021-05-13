import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import "../css/NavbarStyles.css";

import ListGroup from "react-bootstrap/ListGroup";
import svgs from "../img/icons/svgs";
import { logout } from "../redux/action/auth";
import SearchBar from "./SearchBar";
import ProfilePic from "./ProfilePic";

const Navbar = ({ history }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const logoutAction = () => {
    setShowProfileModal(false);
    dispatch(logout());
    history.push("/");
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <Link to="/" className="react-link">
          <h3>Share Your World</h3>
        </Link>
      </div>
      <div className="navbar-navlink">
        <Link className="nav-link react-link" to={`/home`}>
          Home
        </Link>
      </div>
      {isAuthenticated && (
        <div className="navbar-navlink">
          <Link className="nav-link react-link" to={`/${user.id}/channel`}>
            Channel
          </Link>
        </div>
      )}

      <SearchBar />

      {isAuthenticated && (
        <div className="nav-profile-container d-flex align-items-center">
          <div
            className="nav-profile-icon"
            onClick={() => setShowProfileModal(!showProfileModal)}
          >
            {isAuthenticated ? (
              <ProfilePic src={user.profilePictureUrl} navbar />
            ) : (
              svgs.profileIcon
            )}
            {svgs.dropdownIcon}
          </div>

          {showProfileModal && (
            <div className="nav-profile-modal">
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex align-items-center profile-list-group-item">
                  {svgs.settings}
                  <span className="ml-2">
                    <Link
                      to={`/${user.id}/profile`}
                      onClick={() => setShowProfileModal(false)}
                      className="react-link"
                    >
                      Profile
                    </Link>
                  </span>
                </ListGroup.Item>
                <ListGroup.Item
                  onClick={logoutAction}
                  className="d-flex align-items-center profile-list-group-item"
                >
                  {svgs.logout}
                  <span className="ml-2">
                    <Link to="" className="react-link">
                      Logout
                    </Link>
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default withRouter(Navbar);
