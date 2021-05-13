import Channel from "./pages/channel";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Main from "./pages/Main";
import ProfilePage from "./pages/ProfilePage";
import Register from "./pages/Register";
import SearchResults from "./pages/SearchResults";
import UploadVideo from "./pages/UploadVideo";
import WatchVideoPage from "./pages/WatchVideoPage";
import UploadTest from "./UploadTest";

const routes = [
	{
		name: "index",
		route: "/",
		component: Main
	},
	{
		name: "login",
		route: "/login",
		component: Login
	},
	{
		name: "register",
		route: "/register",
		component: Register
	},
	{
		name: "profile",
		route: "/:userId/profile",
		component: ProfilePage
	},
	{
		name: "homepage",
		route: "/home",
		component: Home
	},
	{
		name: "channel_page",
		route: "/:id/channel",
		component: Channel
	},
	{
		name: "upload_test",
		route: "/uploadtest",
		component: UploadTest
	},
	{
		name: "upload_video",
		route: "/:id/channel/uploadvideo",
		component: UploadVideo
	},
	{
		name: "watch_video_page",
		route: "/video/watch/:videoId",
		component: WatchVideoPage
	},
	{
		name: "search_results",
		route: "/search",
		component: SearchResults
	}
];

export const publicRoutes = ["/", "/login", "/register", "/video/watch/:videoId"];

export default routes;
