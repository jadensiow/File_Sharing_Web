import React from "react";
import { Link } from "react-router-dom";
import { getHomePageData } from "../redux/action/homepagevideoAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import moment from "moment";

const Home = () => {
	const users = useSelector(state => state.auth);
	console.log(users);
	const { loading, channelInfo } = useSelector(state => state.homepageInfo);
	console.log(channelInfo);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getHomePageData());
	}, []);
	return (
		<div>
			<h2>welcome to the Homepage</h2>
			{users.user ? <h3>Hello {users.user.firstName}</h3> : <h3>Hello Guest</h3>}
			{users.user ? <Link to={`/${users.user.id}/channel`}>My Channel</Link> : null}
			<Link to={`/${users.user.id}/profile`}>Profile</Link>
			<div className="allVideos">
				{loading
					? null
					: channelInfo.homepageInfo.map(video => {
							return (
								<Link key={video.id} to={`/video/watch/${video.id}`}>
									<div className="videos" key={video.datetime}>
										<h4>{video.title}</h4>
										<img
											src={video.videoThumbnailUrl}
											alt="Video-Image"
										/>
										<p>
											{moment(video.datetime).format("DD/MM/YYYY")}
										</p>
									</div>
								</Link>
							);
					  })}
			</div>
		</div>
	);
};

export default Home;
