import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toastrError, toastrSuccess } from "../functions/toastrs";
import { Redirect, useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import Dropzone from "react-dropzone";
import axios from "axios";

const UploadVideo = ({ match }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [thumbnail, setThumbnail] = useState("");

  const [attachVid, setAttachVid] = useState("");
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const { channelInfo } = useSelector((state) => state.channelInfo);

  console.log(channelInfo);
  const history = useHistory();

  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value);
  };
  console.log(Object.keys(channelInfo).length === 0);
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
    console.log("data = ", apiResponse);

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
      const response = await axios.post(
        `/api/videos/${videoId}/upload/`,
        formDataVid,
        config
      );
      console.log(response);

      if (response.data.success) {
        console.log(response.data);
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
      const apiResponse = await axios.post(
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
    console.log(attachVid);
  };

  const uploadThumbnailFile = (files) => {
    setThumbnail(files);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}></div>

      <form>
        <Row>
          <h4 className="text-left">Upload Video</h4>
        </Row>
        <Row>
          <Dropzone onDrop={uploadVidFile} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "200px",
                  height: "100px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />+
              </div>
            )}
          </Dropzone>
          <div className="d-flex align-items-center">
            {attachVid ? attachVid[0].name : <p>Attach Video file</p>}
          </div>
        </Row>
        <Row>
          <h4 className="text-left">Upload Thumbnail</h4>
        </Row>
        <Row>
          <Dropzone
            onDrop={uploadThumbnailFile}
            multiple={false}
            maxSize={800000000}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "200px",
                  height: "100px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />+
              </div>
            )}
          </Dropzone>
          <div className="d-flex align-items-center">
            {thumbnail ? thumbnail[0].name : <p>Attach Thumbnail file</p>}
          </div>
        </Row>
        <br></br>
        <Row className="d-flex justify-content-between align-items-center">
          <label>Title</label>
          <input type="text" onChange={handleChangeTitle} value={title} />

          <label>Description</label>
          <input
            type="text"
            onChange={handleChangeDecsription}
            value={description}
          />
        </Row>
        {/* <select onChange={handleChangeOne}>
                    {Private.map((item, index) => (
                        <option key={index} value={item.value}>
                        {item.label}
                        </option>
                    ))}
                    </select> 
                */}
        <br></br>
        <Button onClick={onSubmit}>Submit</Button>
      </form>
    </div>
  );
};

export default UploadVideo;
