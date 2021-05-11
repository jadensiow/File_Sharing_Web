import React, { useState } from "react";
import svgs from "../img/icons/svgs";
import _ from "lodash";

const LikesDislikes = ({
	likes,
	dislikes,
	size,
	postLikeDislike,
	userLikes,
	userDislikes
}) => {
	const [thumbsUpColor, setThumbsUpColor] = useState(() =>
		userLikes ? "#40A5FB" : "darkgray"
	);
	const [thumbsDownColor, setThumbsDownColor] = useState(() =>
		userDislikes ? "red" : "darkgray"
	);

	const debouncedLikesDislikes = _.debounce(param => {
		postLikeDislike(param);
	}, 1500);

	const changeColor = (upDown, color) => {
		switch (upDown) {
			case "up":
				setThumbsUpColor(color);
				break;

			case "down":
				setThumbsDownColor(color);
				break;

			default:
				break;
		}
	};

	return (
		<div>
			<div
				style={{
					width: size ? "100px" : "150px",
					display: "flex",
					justifyContent: "space-between",
					color: "darkgray"
				}}
			>
				<div
					className="d-flex align-items-center"
					style={{ height: "100%" }}
					onMouseOver={e => {
						changeColor("up", "#40A5FB");
						e.target.style.cursor = "pointer";
					}}
					onMouseLeave={() => {
						!userLikes && changeColor("up", "darkgray");
					}}
					onClick={() => debouncedLikesDislikes("like")}
				>
					<div>{svgs.thumbsUp(thumbsUpColor, size)}</div>{" "}
					<h6 className="mb-0" style={{ color: thumbsUpColor }}>
						{likes}
					</h6>
				</div>
				<div
					className="d-flex align-items-center"
					style={{ height: "100%" }}
					onMouseOver={e => {
						changeColor("down", "red");
						e.target.style.cursor = "pointer";
					}}
					onMouseLeave={() => {
						!userDislikes && changeColor("down", "darkgray");
					}}
					onClick={() => debouncedLikesDislikes("dislike")}
				>
					<div>{svgs.thumbsDown(thumbsDownColor, size)}</div>{" "}
					<h6 className="mb-0" style={{ color: thumbsDownColor }}>
						{dislikes}
					</h6>
				</div>
			</div>

			<div
				className="progress mt-2"
				style={{
					height: "4px",
					backgroundColor: likes === 0 && dislikes == 0 ? "darkgray" : "red"
				}}
			>
				<div
					className="progress-bar"
					role="progressbar"
					style={{
						width: (likes / (likes + dislikes)) * 100 + "%",
						backgroundColor: "#40A5FB"
					}}
				></div>
			</div>
		</div>
	);
};

export default LikesDislikes;
