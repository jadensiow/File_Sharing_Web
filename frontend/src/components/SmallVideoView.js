import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import defaultThumbnail from "../img/defaultVideoThumbnail.png";
import moment from "moment";
import svgs from "../img/icons/svgs";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toastrError, toastrSuccess } from "../functions/toastrs";
import { deleteVideoAction, editVideoAction } from "../redux/action/channelActions";

const SmallVideoView = ({ video }) => {
	const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
	const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);

	const [videoEditInfo, setVideoEditInfo] = useState({
		title: video.title,
		description: video.description,
		newThumbnail: null
	});

	const dispatch = useDispatch();

	const restrictTitle = () =>
		video.title.length > 18 ? video.title.slice(0, 15) + "..." : video.title;

	const { token } = useSelector(state => state.auth);

	const deleteVideo = () => {
		dispatch(deleteVideoAction(token, video.id));
		setShowDeleteConfirmModal(false);
	};

	const uploadNewThumbnail = async config => {
		const formData = new FormData();
		formData.append(
			"newThumbnail",
			videoEditInfo.newThumbnail,
			videoEditInfo.newThumbnail.name
		);

		try {
			/*
            turning this to a post request as apparently Django does not read
            any files data from a PUT request  
            */
			const { data } = await axios.post(
				`/api/videos/${video.id}/edit/thumbnail`,
				formData,
				{ headers: { ...config.headers, "Content-Type": "multipart/form-data" } }
			);

			if (data.success) {
				toastrSuccess(data.message);

				return new Promise(resolve => resolve(data));
			} else {
				toastrError("Error", data.message);
			}
		} catch (err) {
			toastrError("Sorry");
		}
		setShowEditDetailsModal(false);
	};

	const sendEditVideoRequest = async () => {
		const config = {
			headers: {
				Authorization: "Bearer " + token
			}
		};

		try {
			const { data } = await axios.put(
				`/api/videos/${video.id}/edit/`,
				{
					title:
						videoEditInfo.title === video.title ? null : videoEditInfo.title,
					description:
						videoEditInfo.description === video.description
							? null
							: videoEditInfo.description
				},
				config
			);

			if (data.success) {
				toastrSuccess(data.message);
				if (videoEditInfo.newThumbnail) {
					const newVideoData = await uploadNewThumbnail(config);

					if (newVideoData) dispatch(editVideoAction(newVideoData));
				} else {
					dispatch(editVideoAction(data.video));
				}
			} else {
				toastrError("Error", data.message);
			}
		} catch (err) {
			toastrError("Sorry");
		}
		setShowEditDetailsModal(false);
	};

	return (
		<div className="videos">
			<Link
				key={video.id}
				to={`/video/watch/${video.id}`}
				style={{ textDecoration: "none", color: "black" }}
			>
				<div className="mb-3">
					<h4>{restrictTitle()}</h4>
					<img
						src={
							video.videoThumbnailUrl?.length > 0
								? video.videoThumbnailUrl
								: defaultThumbnail
						}
						alt="Video-Image"
					/>
				</div>
			</Link>

			<Row>
				<Col xs={8}>
					<p>{moment(video.datetime).format("DD/MM/YYYY")}</p>
				</Col>

				<Col xs={4}>
					<span className="mr-3" onClick={() => setShowEditDetailsModal(true)}>
						{svgs.editIcon("black")}
					</span>
					<span onClick={() => setShowDeleteConfirmModal(true)}>
						{svgs.deleteIcon()}
					</span>
				</Col>
			</Row>

			<Modal
				show={showDeleteConfirmModal}
				onHide={() => setShowDeleteConfirmModal(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Delete Video?
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Are you sure you want to delete video titled {video.title}?</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={deleteVideo}>
						Delete
					</Button>
					<Button
						variant="primary"
						onClick={() => setShowDeleteConfirmModal(false)}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal
				show={showEditDetailsModal}
				onHide={() => setShowEditDetailsModal(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Edit Details
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							placeholder="Ttile"
							value={videoEditInfo.title}
							onChange={e =>
								setVideoEditInfo(original => ({
									...original,
									title: e.target.value
								}))
							}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							rows="4"
							placeholder="Description"
							value={videoEditInfo.description}
							onChange={e =>
								setVideoEditInfo(original => ({
									...original,
									description: e.target.value
								}))
							}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Change Thumbnail</Form.Label>
						<Form.File
							onChange={e =>
								setVideoEditInfo(original => ({
									...original,
									newThumbnail: e.target.files[0]
								}))
							}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="warning" onClick={sendEditVideoRequest}>
						Submit Edit
					</Button>
					<Button
						variant="danger"
						onClick={() => setShowEditDetailsModal(false)}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default SmallVideoView;
