import types from "../types";

export const userProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case types.PROFILE_DATA_REQUEST:
			return { loading: true };

		case types.PROFILE_DATA_SUCCESS:
			return { loading: false, userProfile: action.payload };

		default:
			return state;
	}
};
