import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import defaultBanner from "../img/defaultChannelBanner.jpg";
import defaultProfilePic from "../img/defaultProfilePicture.jpg";
import svgs from "../img/icons/svgs";
import EditIcon from "../img/icons/Edit.svg";

import { Col, Container, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "../css/ProfilePageStyles.css";
import { getProfileData } from "../redux/action/profileActions";
import Loader from "../components/Loader";
import { toastrError, toastrSuccess } from "../functions/toastrs";
import axios from "axios";

const ProfilePage = ({ match }) => {
  const { loading, userProfile } = useSelector((state) => state.userProfile);
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  console.log(userProfile);
  const [profileEdit, setProfileEdit] = useState({
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    username: userProfile?.username || "",
    email: userProfile?.email || "",
  });

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

  const profilePicStyles = {
    objectFit: "cover",
    borderRadius: "0.5rem",
  };

  const containerStyles = {
    maxWidth: "850px",
    margin: "2rem auto",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileData(match.params.userId));
  }, []);

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
      console.log(selectedFile);

      for (let i of formData.entries()) {
        console.log(i);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        // Request made to the backend api
        // Send formData object
        const response = await axios.post(
          `/api/users/upload/profilepicture/?pictureType=${typeOfPicture}`,
          formData,
          config
        );

        if (response.data.success) {
          console.log(response.data);
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

    console.log(name);

    setProfileEdit((pe) => ({ ...pe, [name]: e.target.value }));
  };

  return (
    <Container style={containerStyles}>
      <Row style={{ position: "relative" }}>
        <Image
          src={
            userProfile?.channelBannerUrl?.length > 0
              ? userProfile?.channelBannerUrl
              : defaultBanner
          }
          rounded
          height="300px"
          width="850px"
          style={profilePicStyles}
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
          <Image
            src={
              userProfile?.profilePictureUrl?.length > 0
                ? userProfile?.profilePictureUrl
                : defaultProfilePic
            }
            rounded
            height="125px"
            width="125px"
            style={profilePicStyles}
          />

          {isAuthenticated && (
            <div
              className="profile-edit-icon"
              onClick={() => onEditIconClick("profilePicture")}
            >
              <img src={EditIcon} />
            </div>
          )}

          {isAuthenticated && (
            <Row className="mt-3 ml-2">
              <Button type="button" variant="danger" className="btn-danger">
                Subscribe
              </Button>
            </Row>
          )}
        </div>
      </Row>

      <Row style={{ marginTop: "-1.5rem", position: "relative" }}>
        <Col sm={12}>
          <div style={profileContainer}>
            {loading ? (
              <Loader />
            ) : (
              <div className="profile-card">
                {isAuthenticated && (
                  <div className="profile-card-edit-icon">
                    {svgs.editIcon("black")}
                  </div>
                )}
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>FirstName</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={profileEdit.firstName}
                      onChange={formValueChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>LastName</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={profileEdit.lastName}
                      onChange={formValueChange}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={profileEdit.username}
                      onChange={formValueChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={profileEdit.email}
                      onChange={formValueChange}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Channel Name</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Form.Row>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
