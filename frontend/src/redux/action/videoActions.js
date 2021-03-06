import apiurl from "../../apiurl";
import { toastrError } from "../../functions/toastrs";
import types from "../types";

export const fetchVideoById = (videoId, userId) => async (dispatch) => {
  try {
    dispatch({
      type: types.WATCH_VIDEO_FETCH_REQUEST,
    });

    const { data } = await apiurl.get(`/api/videos/watch/${videoId}`, {
      params: { userId },
    });

    if (!data.success) {
      toastrError("Error", data.message);
    } else {
      dispatch({
        type: types.WATCH_VIDEO_FETCH_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    //console.log(err);
    toastrError("Error", "Something went wrong trying to fetch the video");
  }
};
