import types from "../types";

export const watchVideoReducer = (state = {}, action) => {
  switch (action.type) {
    case types.WATCH_VIDEO_REMOVE:
      return {};

    case types.WATCH_VIDEO_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case types.WATCH_VIDEO_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };

    case types.ADD_COMMENT:
      const newComments = [action.payload, ...state.comments];

      return {
        ...state,
        comments: newComments,
      };
    case types.DELETE_COMMENT:
      const updateComments = [...state.comments];
      return {
        ...state,
        comments: updateComments.filter(
          (comment) => comment.id !== action.payload.id
        ),
      };

    case types.LIKE_DISLIKE_VIDEO: {
      const {
        user_likes_video,
        user_dislikes_video,
        like_adder,
        dislike_adder,
      } = action.payload;

      let newVideo = { ...state.video };
      newVideo.userLikesVideo = user_likes_video;
      newVideo.userDislikesVideo = user_dislikes_video;
      newVideo.likes += like_adder;
      newVideo.dislikes += dislike_adder;

      return {
        ...state,
        video: newVideo,
      };
    }

    case types.LIKE_DISLIKE_COMMENT: {
      const {
        id,
        user_likes_comment,
        user_dislikes_comment,
        like_adder,
        dislike_adder,
      } = action.payload;

      let newComments = state.comments.map((sComment) => {
        console.log("id = ", id, "commentId = ", sComment.id);
        if (sComment.id === id) {
          const newC = { ...sComment };

          newC.userLikesComment = user_likes_comment;
          newC.userDislikesComment = user_dislikes_comment;
          newC.likes += like_adder;
          newC.dislikes += dislike_adder;

          return newC;
        }
        return sComment;
      });

      return {
        ...state,
        comments: newComments,
      };
    }

    default:
      return state;
  }
};
