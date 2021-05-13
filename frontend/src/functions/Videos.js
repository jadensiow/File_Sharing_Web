import React from "react";
import Video1 from "../img/Video1.mp4";
import Video2 from "../img/Video2.mp4";
import Video3 from "../img/Video1.mp4";

const Videos = () => {
  let vid = [Video1, Video2, Video3];
  let videos = vid[Math.floor(Math.random() * vid.length)];
  return (
    <div>
      <video src={videos} muted={true} loop={true} autoPlay={true} />
    </div>
  );
};

export default Videos;
