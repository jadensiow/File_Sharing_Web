import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toastrError, toastrSuccess } from "../functions/toastrs";
import { Redirect, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Dropzone from "react-dropzone";
import apiurl from "../apiurl";
import svgs from "../img/icons/svgs";
import { motion } from "framer-motion";
import { uploadVidRouteTransition } from "../functions/routeAnimation";
import "../css/watchvideopage.css";

const UploadVideo = ({ match }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [thumbnail, setThumbnail] = useState("");

  const [attachVid, setAttachVid] = useState("");
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const { channelInfo } = useSelector((state) => state.channelInfo);
  useEffect(() => {
    document.title = "Upload";
  }, []);

  //console.log(channelInfo);
  const history = useHistory();

  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value);
  };
  //console.log(Object.keys(channelInfo).length === 0);
  const handleChangeDecsription = (event) => {
    setDescription(event.currentTarget.value);
  };
  if (
    Object.keys(channelInfo).length === 0 ||
    Number(match.params.id) !== Number(user.id)
  ) {
    return <Redirect to={`/${user.id}/channel/`} />;
  }
  const uploadVideo = async (apiResponse, config) => {
    //console.log("data = ", apiResponse);

    const videoId = apiResponse.data.videoId;

    let selectedVid = attachVid[0];
    let selectedThumbNail = thumbnail[0];

    const formDataVid = new FormData();

    formDataVid.append("myVid", selectedVid, selectedVid.name);
    formDataVid.append(
      "myThumbnail",
      selectedThumbNail,
      selectedThumbNail.name
    );

    try {
      // Request made to the backend api
      // Send formData object
      const response = await apiurl.post(
        `/api/videos/${videoId}/upload/`,
        formDataVid,
        config
      );
      //console.log(response);

      if (response.data.success) {
        //console.log(response.data);
        toastrSuccess("Video Uploaded", response.data.message);
        history.push(`/${user.id}/channel/`);
      } else {
        toastrError("Error", response.data.message);
      }
    } catch (err) {
      toastrError("Unable to upload, error occured", "");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const body = {
      title,
      description,
    };

    try {
      const apiResponse = await apiurl.post(
        "/api/videos/uploadTitle/",
        body,
        config
      );
      let { data } = apiResponse;

      if (data.success) {
        toastrSuccess("Title and description updated");
        uploadVideo(apiResponse, config);
      } else {
        toastrError("Error", data.message);
      }
    } catch (err) {
      toastrError("Error, channel not created");
    }
  };

  const uploadVidFile = (files) => {
    setAttachVid(files);
    //console.log(attachVid);
  };

  const uploadThumbnailFile = (files) => {
    setThumbnail(files);
  };

  return (
    <motion.div
      variants={uploadVidRouteTransition}
      initial="hidden"
      animate="show"
      exit="exit"
      className="outer-div"
    >
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}></div>

        <form>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h4 className="text-left">Upload Video</h4>
              <Dropzone
                onDrop={uploadVidFile}
                multiple={false}
                maxSize={800000000}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone-dropzone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    {svgs.uploadIcon("#2980b9", 50)}
                  </div>
                )}
              </Dropzone>
              <div className="d-flex align-items-center">
                {attachVid ? attachVid[0].name : <p>Attach Video file</p>}
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h4 className="text-left">Upload Thumbnail</h4>
              <Dropzone
                onDrop={uploadThumbnailFile}
                multiple={false}
                maxSize={800000000}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone-dropzone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    {svgs.uploadIcon("#2980b9", 50)}
                  </div>
                )}
              </Dropzone>
              <div>
                {thumbnail ? thumbnail[0].name : <p>Attach Thumbnail file</p>}
              </div>
            </div>
          </div>
          <div className="text-left">
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                value={title}
                style={{ border: "1px solid darkgray" }}
                onChange={handleChangeTitle}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                placeholder="Description"
                value={description}
                style={{ border: "1px solid darkgray" }}
                onChange={handleChangeDecsription}
              />
            </Form.Group>
          </div>

          <br></br>
          <Button onClick={onSubmit}>Submit</Button>
        </form>
      </div>
    </motion.div>
  );
};

export default UploadVideo;
