import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ChannelBanner from "../components/ChannelBanner";
import ProfilePic from "../components/ProfilePic";

import svgs from "../img/icons/svgs";
import EditIcon from "../img/icons/Edit.svg";

import { Col, Container, Row, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import "../css/ProfilePageStyles.css";
import { getProfileData } from "../redux/action/profileActions";
import Loader from "../components/Loader";
import {
  toastrError,
  toastrSuccess,
  toastrWarning,
} from "../functions/toastrs";
import apiurl from "../apiurl";
import { motion } from "framer-motion";
import { profileRouteTransition } from "../functions/routeAnimation";

import { editProfileAction } from "../redux/action/profileActions";

const ProfilePage = ({ match }) => {
  const { loading, userProfile } = useSelector((state) => state.userProfile);
  const { token, isAuthenticated, user } = useSelector((state) => state.auth);

  const [editing, setEditing] = useState(false);

  const [profileEdit, setProfileEdit] = useState({});

  const profileContainer = {
    borderRadius: "0.5rem",
    boxShadow: "0 0 0.5rem black",
    backgroundColor: "white",
    padding: "2rem 1rem",
  };

  const profilePicContainer = {
    position: "absolute",
    top: "10%",
    left: "5%",
  };

  const containerStyles = {
    maxWidth: "850px",
    margin: "2rem auto",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileData(match.params.userId));
  }, []);
  useEffect(() => {
    document.title = "Profile";
  }, []);
  useEffect(() => {
    setProfileEdit({
      firstName: userProfile?.firstName || "",
      lastName: userProfile?.lastName || "",
      username: userProfile?.username || "",
      email: userProfile?.email || "",
    });
    setEditing(false);
  }, [userProfile]);

  const onEditIconClick = (typeOfPicture) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.onchange = async (e) => {
      e.preventDefault();

      let selectedFile = e.target.files[0];

      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      formData.append("myFile", selectedFile, selectedFile.name);

      // Details of the uploaded file
      //console.log(selectedFile);

      for (let i of formData.entries()) {
        //console.log(i);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        // Request made to the backend api
        // Send formData object
        const response = await apiurl.post(
          `/api/users/upload/profilepicture/?pictureType=${typeOfPicture}`,
          formData,
          config
        );

        if (response.data.success) {
          //console.log(response.data);
          toastrSuccess("Profile Picture Changed", response.data.message);
        } else {
          toastrError("Error", response.data.message);
        }
      } catch (err) {
        toastrError("Error", err);
      }
    };
  };

  const formValueChange = (e) => {
    const name = e.target.name;

    //console.log(name);

    setProfileEdit((pe) => ({ ...pe, [name]: e.target.value }));
  };

  const profileEdited = () => {
    let toReturn = false;

    Object.keys(profileEdit).forEach((key) => {
      if (profileEdit[key].trim() !== userProfile[key].trim()) {
        toReturn = true;
        return;
      }
    });

    return toReturn;
  };

  const sendEditProfileRequest = () => {
    //console.log(profileEdited());
    if (!profileEdited()) {
      toastrWarning("No edit done");
      return;
    }

    dispatch(editProfileAction(token, user.id, profileEdit));
  };

  return (
    <Container style={containerStyles}>
      <Row style={{ position: "relative" }}>
        <ChannelBanner
          src={userProfile?.channelBannerUrl}
          height="300px"
          width="850px"
        />

        {isAuthenticated && (
          <div
            className="profile-edit-icon"
            onClick={() => onEditIconClick("channelBanner")}
          >
            <img src={EditIcon} />
          </div>
        )}

        <div style={profilePicContainer}>
          <ProfilePic
            src={userProfile?.profilePictureUrl}
            height="125px"
            width="125px"
            borderRadius="0.5rem"
          />

          {isAuthenticated && (
            <div
              className="profile-edit-icon"
              onClick={() => onEditIconClick("profilePicture")}
            >
              <img src={EditIcon} />
            </div>
          )}
        </div>
      </Row>

      <Row style={{ marginTop: "-1.5rem", position: "relative" }}>
        <Col sm={12} className="text-left">
          <div style={profileContainer}>
            {loading ? (
              <Loader />
            ) : (
              <div className="profile-card px-4">
                {isAuthenticated && (
                  <div
                    className="profile-card-edit-icon"
                    onClick={() => setEditing(true)}
                  >
                    {svgs.editIcon("black")}
                  </div>
                )}
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>First Name</Form.Label>
                    {editing ? (
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={profileEdit.firstName}
                        onChange={formValueChange}
                      />
                    ) : (
                      <p className="profile-edit">{userProfile.firstName}</p>
                    )}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Last Name</Form.Label>
                    {editing ? (
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={profileEdit.lastName}
                        onChange={formValueChange}
                      />
                    ) : (
                      <p className="profile-edit">{userProfile.lastName}</p>
                    )}
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Username</Form.Label>
                    {editing ? (
                      <Form.Control
                        type="text"
                        name="username"
                        value={profileEdit.username}
                        onChange={formValueChange}
                      />
                    ) : (
                      <p className="profile-edit">{userProfile.username}</p>
                    )}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Email</Form.Label>
                    {editing ? (
                      <Form.Control
                        type="text"
                        name="email"
                        value={profileEdit.email}
                        onChange={formValueChange}
                      />
                    ) : (
                      <p className="profile-edit">{userProfile.email}</p>
                    )}
                  </Form.Group>
                </Form.Row>
                {editing && (
                  <Form.Row>
                    <Button onClick={sendEditProfileRequest} variant="warning">
                      Edit Changes
                    </Button>
                  </Form.Row>
                )}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
