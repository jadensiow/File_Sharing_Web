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
  const subInfoSelector = useSelector((state) => state.subInfo);
  const { userProfile } = useSelector((state) => state.userProfile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomePageData());
  }, []);
  useEffect(() => {
    dispatch(getUserData(token));
    dispatch(getUserData2(token));
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
        <br></br>
        <div className="row mt-3">
          <div className="col-2">
            {isAuthenticated ? <h3 className="row">Subscription</h3> : null}
            {userProfile?.loading
              ? null
              : userProfile.subscribedTo.map((sub) => (
                  <Link className="row" to={`/${sub}/channel`}>
                    {sub}
                  </Link>
                ))}

            <br></br>
            <h3>Recommendation</h3>
            {subInfoSelector?.loading
              ? null
              : subInfoSelector.subInfo.map((chnl) => (
                  <Link className="row" to={`/${chnl.fields.user}/channel`}>
                    {chnl.fields.channel_name}
                  </Link>
                ))}
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
