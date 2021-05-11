import axios from "axios";
import { toastrError, toastrSuccess } from "../../functions/toastrs";
import types from "../types";

export const getChannelData = userId => async dispatch => {
	try {
		const { data } = await axios.get(`/api/videos/${userId}/channel/`);
		setTimeout(() => {
			dispatch({
				type: types.CHANNEL_DATA_SUCCESS,
				payload: data
			});
		}, 1500);

		console.log(data);
	} catch (err) {
		console.log(err.message);
	}
};

export const deleteVideoAction = (token, videoId) => async dispatch => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	try {
		const { data } = await axios.delete(`/api/videos/${videoId}/delete/`, config);

		if (data.success) {
			toastrSuccess("Video Deleted");
			dispatch({
				type: types.VIDEO_DELETED,
				payload: videoId
			});
		} else {
			toastrError("Error", data.message);
		}
	} catch (err) {
		toastrError("Sorry");
	}
};

export const editVideoAction = video => dispatch => {
	dispatch({
		type: types.VIDEO_DATA_EDITED,
		payload: video
	});
};
