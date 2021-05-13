import axios from "axios";
import { toastrError } from "../../functions/toastrs";
import types from "../types";

export const getHomePageData = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/videos/homepageVid/`);
    setTimeout(() => {
      dispatch({
        type: types.HOME_PAGE_DATA_SUCCESS,
        payload: data,
      });
    }, 1500);

    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
};
export const getUserData = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data } = await axios.get("/api/videos/userdata/", config);
    console.log(data);
    if (data.success) {
      dispatch({
        type: types.GET_USER_SUCCESS,
        payload: data.profileInfo,
      });
      // uploadVideo(apiResponse, config);
    } else {
      toastrError("Error", data.message);
    }
  } catch (err) {
    toastrError("Error");
  }
};
export const getUserData2 = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data } = await axios.get("/api/videos/userdata2/", config);
    console.log(data);
    if (data) {
      dispatch({
        type: types.GET_USER_SUCCESS2,
        payload: data,
      });
      // uploadVideo(apiResponse, config);
    } else {
      toastrError("Error", data.message);
    }
  } catch (err) {
    toastrError("Error");
  }
};
