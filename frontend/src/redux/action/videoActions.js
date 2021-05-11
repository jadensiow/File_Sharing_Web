import axios from "axios";
import { toastrError } from "../../functions/toastrs";
import types from "../types";

export const fetchVideoById = (videoId, userId) => async dispatch => {
	try {
		dispatch({
			type: types.WATCH_VIDEO_FETCH_REQUEST
		});

		const { data } = await axios.get(`/api/videos/watch/${videoId}`, {
			params: { userId }
		});

		if (!data.success) {
			toastrError("Error", data.message);
		} else {
			console.log(data);
			dispatch({
				type: types.WATCH_VIDEO_FETCH_SUCCESS,
				payload: data
			});
		}
	} catch (err) {
		console.log(err);
		toastrError("Error", "Something went wrong trying to fetch the video");
	}
};
