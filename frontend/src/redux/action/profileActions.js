import axios from "axios";
import { toastrError } from "../../functions/toastrs";
import types from "../types";

export const getProfileData = userId => async dispatch => {
	try {
		const { data } = await axios.get(`/api/users/${userId}/profile/`);

		setTimeout(() => {
			dispatch({
				type: types.PROFILE_DATA_SUCCESS,
				payload: data.profileInfo
			});
		}, 1500);

		console.log(data);
	} catch (err) {
		console.log(err.message);
		toastrError("Error", "Something went wrong");
	}
};
