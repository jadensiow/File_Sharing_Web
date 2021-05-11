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
