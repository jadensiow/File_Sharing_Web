import React from "react";
import defaultPic from "../img/defaultChannelBanner.jpg";

const ChannelBanner = ({ src, width, height, borderRadius, boxShadow }) => {
	const imgSrc = src.length > 0 ? src : defaultPic;

	return (
		<img
			src={imgSrc}
			width={width}
			height={height}
			style={{
				objectFit: "cover",
				borderRadius,
				boxShadow
			}}
		/>
	);
};

ChannelBanner.defaultProps = {
	width: "100%",
	height: "100%",
	borderRadius: "10px"
};

export default ChannelBanner;
