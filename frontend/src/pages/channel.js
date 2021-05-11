import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../components/Modal";
import { useHistory } from "react-router-dom";

import { getChannelData } from "../redux/action/channelActions";
import { Link } from "react-router-dom";

import Loader from "../components/Loader";
import "../css/channel.css";
import SmallVideoView from "../components/SmallVideoView";

const Channel = ({ match }) => {
	const { user } = useSelector(state => state.auth);
	const [showModal, setShowModal] = useState(false);
	const { loading, channelInfo } = useSelector(state => state.channelInfo);

	const videoContainer = useRef(null);

	const dispatch = useDispatch();
	const history = useHistory();

	const handleClick = () => {
		history.push(`/${user.id}/channel/uploadvideo`);
	};

	useEffect(() => {
		console.log(videoContainer);
	}, [videoContainer.current]);

	useEffect(() => {
		dispatch(getChannelData(match.params.id));
	}, []);

	return (
		<div className="page">
			{loading ? (
				<div className="header">
					<h2>No Channel created</h2>
				</div>
			) : (
				<div className="header">
					<h2>Channel Name: {channelInfo.channel_name}</h2>
					<h3>Channel Description: {channelInfo.channel_description}</h3>
					<p>Subscribers: {channelInfo.subscribers}</p>
					<br></br>
					<button className="upload-link" onClick={handleClick}>
						Upload Video
					</button>
				</div>
			)}
			{loading && Number(match.params.id) === Number(user.id) ? (
				<div className="create-channel">
					{" "}
					<button
						onClick={() => {
							setShowModal(!showModal);
						}}
					>
						Create Channel
					</button>
					{showModal && <Modal setShowModal={setShowModal} />}{" "}
				</div>
			) : null}

			<div className="allVideos">
				{loading ? (
					<Loader />
				) : (
					channelInfo.videos.map(video => {
						return <SmallVideoView video={video} key={video.id} />;
					})
				)}
			</div>
		</div>
	);
};

export default Channel;
