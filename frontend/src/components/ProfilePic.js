import React from "react";
import svgs from "../img/icons/svgs";
import defaultPic from "../img/defaultProfilePicture.jpg";

const ProfilePic = ({ src, navbar, width, height, borderRadius }) => {
	const imgSrc = src?.length > 0 ? src : defaultPic;

	return imgSrc === src && !navbar ? (
		<img
			src={imgSrc}
			width={width}
			height={height}
			style={{
				objectFit: "cover",
				borderRadius
			}}
		/>
	) : navbar ? (
		svgs.profileIcon
	) : (
		<img
			src={imgSrc}
			width={width}
			height={height}
			style={{
				objectFit: "cover",
				borderRadius
			}}
		/>
	);
};

ProfilePic.defaultProps = {
	width: "40px",
	height: "40px",
	borderRadius: "50%"
};

export default ProfilePic;
