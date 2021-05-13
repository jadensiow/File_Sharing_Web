import React from "react";
import svgs from "../img/icons/svgs";
import defaultPic from "../img/defaultProfilePicture.jpg";

const ProfilePic = ({ src, navbar, width, height, borderRadius }) => {
	return src.length > 0 ? (
		<img
			src={src}
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
		defaultPic
	);
};

ProfilePic.defaultProps = {
	width: "40px",
	height: "40px",
	borderRadius: "50%"
};

export default ProfilePic;
