import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModalCustom from "../components/ModalCustom";
import { useHistory } from "react-router-dom";
import svgs from "../img/icons/svgs";
import { toastrWarning } from "../functions/toastrs";
import { addSubCount, minusSubCount } from "../redux/action/channelActions";

import { getChannelData } from "../redux/action/channelActions";
import {
  favouriteChannel,
  unfavouriteChannel,
} from "../redux/action/profileActions";
import Loader from "../components/Loader";
import "../css/channel.css";
import SmallVideoView from "../components/SmallVideoView";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/Container";
import ChannelBanner from "../components/ChannelBanner";
import _ from "lodash";
import { motion } from "framer-motion";
import { channelRouteTransition } from "../functions/routeAnimation";

const Channel = ({ match }) => {
  const { token, user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const { userProfile } = useSelector((state) => state.userProfile);

  const { loading, channelInfo } = useSelector((state) => state.channelInfo);

  let changeColor;
  const videoContainer = useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    history.push(`/${user.id}/channel/uploadvideo`);
  };
  console.log(channelInfo);
  console.log(userProfile);
  const favouriteChnl = () => {
    if (channelInfo.user_id === user.id) {
      toastrWarning(`You cannot favourite your own video`);
      return;
    } else if (userProfile?.subscribedTo?.includes(Number(match.params.id))) {
      dispatch(unfavouriteChannel(token, channelInfo));
      dispatch(minusSubCount(token, channelInfo));
    } else {
      dispatch(favouriteChannel(token, channelInfo));
      dispatch(addSubCount(token, channelInfo));
    }
  };
  const debouncedFavourites = _.debounce((param) => {
    favouriteChnl(param);
  }, 500);

  userProfile && userProfile?.subscribedTo?.includes(Number(match.params.id))
    ? (changeColor = "red")
    : (changeColor = "grey");
  useEffect(() => {
    console.log(videoContainer);
  }, [videoContainer.current]);

  useEffect(() => {
    dispatch(getChannelData(match.params.id));
  }, []);
  const containerStyles = {
    maxWidth: "850px",
    maxHeigth: "300px",
    margin: "2rem auto",
    position: "relative",
    padding: 0,
  };
  useEffect(() => {
    document.title = "Channel";
  }, []);
  return (
    <div>
      <motion.div
        variants={channelRouteTransition}
        initial="hidden"
        animate="show"
        exit="exit"
        className="outer-div"
      >
        <Container style={containerStyles}>
          <ChannelBanner src={user.channelBannerUrl} />

          <div
            style={{
              position: "absolute",
              backgroundColor: "rgba(0,0,0,0.5)",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              borderRadius: "10px",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {Object.keys(channelInfo).length === 0 ? (
              <div>
                <h2>You do not have a channel</h2>
                <p>Create a Channel</p>
                <Button
                  onClick={() => {
                    setShowModal(!showModal);
                  }}
                >
                  {svgs.plus()} <span className="ml-2">Create Channel</span>
                </Button>
                <ModalCustom
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              </div>
            ) : (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2>{channelInfo.channel_name}</h2>
                <p>{channelInfo.channel_description}</p>
                <h3>Subscribers: {channelInfo.subscribers}</h3>
                {Number(match.params.id) === user.id ? (
                  <Button
                    variant="info"
                    className="upload-link"
                    onClick={handleClick}
                  >
                    {svgs.uploadIcon()} Upload Video
                  </Button>
                ) : (
                  <Button
                    // change this variant to a differnt one "secondary"
                    // if the user is subscribed
                    variant="danger"
                    onClick={debouncedFavourites}
                  >
                    {/* 
                                    you can change Subscribe -> Subscribed and inver the colors 
                                    i.e. btn (danger -> secondary) and changeColor (gray -> red)
                                    or any other colors you like
                                    */}
                    Subscribe {svgs.favouriteIcon(`${changeColor}`)}
                  </Button>
                )}
              </div>
            )}
          </div>
        </Container>

        <div className="allVideos">
          {loading ? (
            <Loader />
          ) : (
            channelInfo.videos.map((video) => {
              return <SmallVideoView video={video} key={video.id} />;
            })
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Channel;
