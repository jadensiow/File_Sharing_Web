import axios from "axios";
import { toastrError, toastrSuccess } from "../../functions/toastrs";
import types from "../types";

export const postCommentAction =
  (token, videoId, commentText) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.post(
        `/api/videos/${videoId}/comments/`,
        { comment: commentText },
        config
      );

      if (data.success) {
        toastrSuccess("Successfully posted comment");
        dispatch({
          type: types.ADD_COMMENT,
          payload: data.comment,
        });
      } else {
        toastrError("Error", data.message);
      }
    } catch (err) {
      toastrError("Error", "There was some error posting the comment");
    }
  };
export const deleteCommentAction =
  (token, commentId, comment) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.delete(
        `/api/videos/comments/${commentId}/`,
        config
      );
      console.log(data);

      if (data.success) {
        toastrSuccess("Successfully deleted comment");
        dispatch({
          type: types.DELETE_COMMENT,
          payload: comment,
        });
      } else {
        toastrError("Error", data.message);
      }
    } catch (err) {
      console.log(err);
      toastrError("Error", "There was some error deleteing the comment");
    }
  };
export const editCommentAction = (comment) => (dispatch) => {
  console.log("comment in action edit = ", comment);
  dispatch({
    type: types.COMMENT_EDITED,
    payload: comment,
  });
};
