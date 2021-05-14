import apiurl from "../../apiurl";
import { toastrInfo } from "../../functions/toastrs";
import types from "../types";

export const likeDislikeAction =
  (token, likeOrDislike, videoOrComment, videoId = null, commentId = null) =>
  async (dispatch) => {
    //console.log("like action is called ");

    let url = "";

    switch (videoOrComment) {
      case "video":
        url = `/api/videos/${videoId}/${likeOrDislike}/`;
        break;

      case "comment":
        url = `/api/videos/comments/${commentId}/${likeOrDislike}/`;
        break;

      default:
        break;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await apiurl.post(url, {}, config);

      if (data.success) {
        toastrInfo(data.message);

        let type =
          videoOrComment === "comment"
            ? types.LIKE_DISLIKE_COMMENT
            : types.LIKE_DISLIKE_VIDEO;

        let id = videoOrComment === "comment" ? commentId : videoId;

        const action = {
          type,
          payload: { id, ...data },
        };

        //console.log("actin = ", action);

        dispatch(action);
      }
    } catch (err) {
      //console.log(err);
    }
  };
