import React from "react";

import { Col, Row } from "react-bootstrap";

import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

import ProfilePic from "./ProfilePic";

const SearchResultItemChannel = ({ channel }) => {
	console.log("channel = ", channel);
	return (
		<ListGroup.Item>
			<Row className="text-left">
				<Col xs={3}>
					<Link to={`/${channel.id}/channel`} className="react-link">
						<ProfilePic
							src={channel.user.profilePictureUrl}
							height="125px"
							width="125px"
							borderRadius="10px"
						/>
					</Link>
				</Col>

				<Col xs={9}>
					<Link to={`/${channel.id}/channel`} className="react-link">
						<h5>
							{channel.channel_name} ({channel.user.username})
						</h5>
					</Link>

					<Row className="ml-1 my-3">
						<h6 className="text-muted mr-2 mb-0">
							{channel.subscribers} subscribers{" "}
						</h6>
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
							{channel.views ? channel.views : 0} views
						</h6>
					</Row>

					<p>{channel.channel_description}</p>
				</Col>
			</Row>
		</ListGroup.Item>
	);
};

export default SearchResultItemChannel;
