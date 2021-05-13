import apiurl from "../../apiurl";
import types from "../types";
import { toastrError, toastrSuccess } from "../../functions/toastrs";

export const getProfileData = (userId) => async (dispatch) => {
  try {
    const { data } = await apiurl.get(`/api/users/${userId}/profile/`);

    setTimeout(() => {
      dispatch({
        type: types.PROFILE_DATA_SUCCESS,
        payload: data.profileInfo,
      });
    }, 1500);
  } catch (err) {
    console.log(err.message);
    toastrError("Error", "Something went wrong");
  }
};

export const editProfileAction =
  (token, userId, newInfo) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await apiurl.put(
        `/api/users/${userId}/profile/edit`,
        newInfo,
        config
      );
      console.log(data);
      if (data.success) {
        toastrSuccess("Profile edit success");
        dispatch({
          type: types.PROFILE_EDIT_SUCCESS,
          payload: data.profileInfo,
        });
      } else {
        toastrError("Error", data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

export const favouriteChannel = (token, channelInfo) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await apiurl.post(
      `/api/videos/subscribe/${channelInfo.user_id}/`,
      {},
      config
    );
    console.log(data);
    if (data.success) {
      toastrSuccess("Favourite success");
      dispatch({
        type: types.FAVOURITE_SUCCESS,
        payload: data.profileInfo,
      });
    } else {
      toastrError("Error", data.message);
    }
  } catch (err) {
    console.log(err);
  }
};
export const unfavouriteChannel = (token, channelInfo) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await apiurl.delete(
      `/api/videos/subscribe/${channelInfo.user_id}/delete/`,
      config
    );
    console.log(data);
    if (data.success) {
      toastrSuccess("Unfavourite success");
      dispatch({
        type: types.UNFAVOURITE_SUCCESS,
        payload: data.profileInfo,
      });
    } else {
      toastrError("Error", data.message);
    }
  } catch (err) {
    console.log(err);
  }
};
