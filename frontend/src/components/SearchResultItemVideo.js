import React from "react";
import { Col, Row } from "react-bootstrap";

import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

import defaultThumbnail from "../img/defaultVideoThumbnail.png";
import ProfilePic from "./ProfilePic";

const SearchResultItemVideo = ({ video }) => {
	const sliceDescription = () =>
		video.description.length > 150
			? video.description.slice(0, 150) + "..."
			: video.description;

	return (
		<ListGroup.Item>
			<Row>
				<Col xs={3}>
					<Link to={`/video/watch/${video.id}`} className="react-link">
						<img
							src={
								video.videoThumbnailUrl?.length > 0
									? video.videoThumbnailUrl
									: defaultThumbnail
							}
							style={{
								objectFit: "cover",
								width: "150px",
								height: "100px"
							}}
						/>
					</Link>
				</Col>
				<Col xs={9} className="text-left">
					<h5>
						<Link to={`/video/watch/${video.id}`} className="react-link">
							{video.title}
						</Link>
					</h5>

					<Row className="ml-1 my-3">
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

					<div>
						<ProfilePic src={video.user.profilePictureUrl} />
						<Link
							className="ml-4 react-link"
							to={`/${video.user.id}/profile`}
						>
							{video.user.username}
						</Link>
					</div>

					<p className="mt-3">{sliceDescription()}</p>
				</Col>
			</Row>
		</ListGroup.Item>
	);
};

export default SearchResultItemVideo;
