import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { toastrError, toastrSuccess } from "../functions/toastrs";

const Modal = (props) => {
  const [chnlName, setChnlName] = useState("");
  const [chnlDescription, setChnlDescription] = useState("");
  const { token } = useSelector((state) => state.auth);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(chnlName);
    props.setShowModal(false);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = JSON.stringify({
      channel_name: chnlName,
      channel_description: chnlDescription,
    });
    try {
      const res = await axios.post("/api/videos/channel/", body, config);
      console.log("res", res);
      console.log("testing");
      if (res.data) {
        toastrSuccess("Channel created");
        history.push(`/home`);
      }
    } catch (err) {
      toastrError("Error, channel not created");
    }
  };
  const styles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 100,
    padding: "3rem 4rem",
    backgroundColor: "white",
    borderRadius: "1rem",
    boxShadow: "0 0 20px black",
  };
  return (
    <div style={styles}>
      <form>
        <p>Channel Name</p>
        <input
          type="text"
          name="chnlName"
          placeholder="Channel Name"
          onChange={(e) => setChnlName(e.target.value)}
          value={chnlName}
        />
        <p>Channel Descriptions</p>
        <input
          type="text"
          name="chnlDescription"
          placeholder="Channel Description"
          onChange={(e) => setChnlDescription(e.target.value)}
          value={chnlDescription}
        />
        <button onClick={(e) => onSubmit(e)}>Create Channel</button>
      </form>
    </div>
  );
};

export default Modal;
