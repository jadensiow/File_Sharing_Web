import React from "react";
import { Link } from "react-router-dom";
import {
  getHomePageData,
  getUserData,
  getUserData2,
} from "../redux/action/homepagevideoAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import SmallVideoView from "../components/SmallVideoView";
import { motion } from "framer-motion";
import { homeRouteTransition } from "../functions/routeAnimation";

const Home = () => {
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);
  const { loading, channelInfo } = useSelector((state) => state.homepageInfo);
  const { subInfo } = useSelector((state) => state.subInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomePageData());
  }, []);
  useEffect(() => {
    dispatch(getUserData(token));
    dispatch(getUserData2(token));
  }, []);
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <div>
      <motion.div
        variants={homeRouteTransition}
        initial="hidden"
        animate="show"
        exit="exit"
        className="outer-div"
      >
        <h2>Welcome to the Homepage</h2>
        {isAuthenticated ? (
          <h3>Hello {user.firstName}</h3>
        ) : (
          <h3>Hello Guest</h3>
        )}
        {isAuthenticated ? (
          <Link to={`/${user.id}/channel`}>My Channel</Link>
        ) : null}
        <div className="row mt-3">
          <div className="col-3">
            {isAuthenticated ? <h4>Subscription</h4> : null}
            {isAuthenticated && subInfo?.subInfoChnl?.sub_chnl?.length > 0
              ? subInfo.subInfoChnl.sub_chnl.map((sub) => (
                  <Link
                    className="row d-flex justify-content-center"
                    to={`/${sub.id}/channel`}
                  >
                    {sub.channel_name}
                  </Link>
                ))
              : null}

            <h4>Recommendation</h4>
            {subInfo?.subInfo?.length > 1
              ? subInfo.subInfo.map((chnl) => (
                  <Link
                    className="row d-flex justify-content-center"
                    to={`/${chnl.fields.user}/channel`}
                  >
                    {chnl.fields.channel_name}
                  </Link>
                ))
              : null}
          </div>

          <div className="col-8">
            <div className="allVideos">
              {loading
                ? null
                : channelInfo.homepageInfo.map((video) => (
                    <SmallVideoView key={video.id} video={video} showUser />
                  ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
