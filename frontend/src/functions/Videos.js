import React from "react";
import Video1 from "../img/Video1.mp4";

const Videos = () => {
  let vid = [Video1];
  let videos = vid[Math.floor(Math.random() * vid.length)];
  return (
    <div>
      <video src={videos} muted={true} loop={true} autoPlay={true} />
    </div>
  );
};

export default Videos;
