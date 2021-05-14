import React, { useState } from "react";
import apiurl from "../apiurl";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { toastrError, toastrSuccess } from "../functions/toastrs";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ModalCustom = ({ showModal, setShowModal }) => {
  const [chnlName, setChnlName] = useState("");
  const [chnlDescription, setChnlDescription] = useState("");
  const { token } = useSelector((state) => state.auth);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    //console.log(chnlName);
    setShowModal(false);
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
      const res = await apiurl.post("/api/videos/channel/", body, config);
      //console.log("res", res);
      //console.log("testing");
      if (res.data) {
        toastrSuccess("Channel created");
        history.push(`/home`);
      }
    } catch (err) {
      toastrError("Error, channel not created");
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Channel Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Channel Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Channel Name"
            onChange={(e) => setChnlName(e.target.value)}
            value={chnlName}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Channel Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="4"
            placeholder="Channel Description"
            onChange={(e) => setChnlDescription(e.target.value)}
            value={chnlDescription}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={(e) => onSubmit(e)}>
          Submit Edit
        </Button>
        <Button variant="danger" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCustom;
