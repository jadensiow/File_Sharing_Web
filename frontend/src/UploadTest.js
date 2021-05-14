import React, { useState } from "react";
import { useSelector } from "react-redux";
import apiaxios from "../src/apiurl";
import {
  toastrError,
  toastrInfo,
  toastrSuccess,
  toastrWarning,
} from "./functions/toastrs";
import useSendUserHome from "./hooks/useSendUserHome";

const UploadTest = ({ match }) => {
  useSendUserHome(match);

  const [selectedFile, setSelectedFile] = useState(null);
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const [url, setUrl] = useState("");

  const uplaodTheFile = async (e) => {
    e.preventDefault();
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
      const response = await apiaxios.post(
        "api/users/upload/profilepicture",
        formData,
        config
      );

      if (response.data) {
        //console.log(response.data);
        setUrl(response.data.url);
        toastrSuccess("Yay", response.data.message);
      }
    } catch (err) {
      toastrError("Error", err);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgb(40, 45, 50)",
        color: "white",
      }}
    >
      {url.length > 0 && <img src={url} />}
      <form
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <input
          name="filename"
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        {/* <input type="text" onChange={e => setSelectedFile(e.target.value)} /> */}
        <button type="submit" onClick={uplaodTheFile} disabled={!selectedFile}>
          submit
        </button>
      </form>
    </div>
  );
};

export default UploadTest;
