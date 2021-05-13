import types from "../types";

export const channelReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CHANNEL_DATA_REQUEST:
      return { loading: true };

    case types.CHANNEL_DATA_SUCCESS:
      return { loading: false, channelInfo: action.payload };

    case types.VIDEO_DELETED: {
      const newVideos = state.channelInfo.videos.filter(
        (v) => v.id !== action.payload
      );

      const newChannelInfo = { ...state.channelInfo, videos: newVideos };

      return {
        ...state,
        channelInfo: newChannelInfo,
      };
    }

    case types.VIDEO_DATA_EDITED: {
      const newVideos = state.channelInfo.videos.map((v) => {
        if (v.id === action.payload.id) {
          return action.payload;
        } else {
          return v;
        }
      });

      const newChannelInfo = { ...state.channelInfo, videos: newVideos };

      return {
        ...state,
        channelInfo: newChannelInfo,
      };
    }
    case types.ADD_SUB_SUCCESS: {
      const newChannelInfo = {
        ...state.channelInfo,
        subscribers: action.payload.subscribers,
      };

      return {
        ...state,
        channelInfo: newChannelInfo,
      };
    }
    case types.MINUS_SUB_SUCCESS: {
      const newChannelInfo = {
        ...state.channelInfo,
        subscribers: action.payload.subscribers,
      };

      return {
        ...state,
        channelInfo: newChannelInfo,
      };
    }
    default:
      return state;
  }
};
