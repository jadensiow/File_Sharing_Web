import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import LikesDislikes from "./LikesDislikes";

import { toastrError, toastrInfo, toastrWarning } from "../functions/toastrs";

import { likeDislikeAction } from "../redux/action/likeDislikeActions";

const Video = ({ video }) => {
	const { token, user } = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const updateLikeDislike = likeOrDislike => {
		if (user.id === video.user.id) {
			toastrWarning(`You cannot ${likeOrDislike} your own video`);
			return;
		}

		dispatch(likeDislikeAction(token, likeOrDislike, "video", video.id));
	};

	// make use of video.js
	return (
		<div className="my-5">
			<Row className="mb-2">
				<h2>{video.title}</h2>
			</Row>

			<video
				id="my-video"
				className="video-js"
				controls
				preload="auto"
				width="640"
				height="264"
				poster={video.videoThumbnailUrl}
			>
				<source src={video.videoUrl} type="video/mp4" />
			</video>

			<Row className="mt-5">
				<div className="col col-5">
					<Row>
						<h6 className="text-muted mr-2 mb-0">{video.views} </h6>
						<div
							style={{
								height: "5px",
								width: "5px",
								borderRadius: "50%",
								backgroundColor: "darkgray",
								alignSelf: "center"
							}}
						></div>
						<h6 className="text-muted ml-2 mb-0">
							{video.uploaded_on.split(" ")[0]}
						</h6>
					</Row>
				</div>

				<div className="col col-5 d-flex justify-content-start">
					<LikesDislikes
						likes={video.likes}
						dislikes={video.dislikes}
						postLikeDislike={updateLikeDislike}
						userLikes={video.userLikesVideo}
						userDislikes={video.userDislikesVideo}
					/>
				</div>
			</Row>

			<hr />

			<Row>
				<Col xs={2}>
					<Row>
						<img
							className="rounded mb-3"
							src={video.user.profilePictureUrl}
							width="100"
							height="100"
							style={{ objectFit: "cover" }}
						/>
					</Row>

					<Row>
						<Link
							to={`/${video.user.id}/profile`}
							style={{ textDecoration: "none", color: "black" }}
						>
							<h6>{video.user.username}</h6>
						</Link>
					</Row>
				</Col>

				<Col xs={10}>
					<p className="text-left">{video.description}</p>
				</Col>
			</Row>
		</div>
	);
};

export default Video;
