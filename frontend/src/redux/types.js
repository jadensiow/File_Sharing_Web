const types = Object.freeze({
	SET_ALERT: "SET_ALERT",
	REMOVE_ALERT: "REMOVE_ALERT",
	REGISTER_COMPLETE: "REGISTER_COMPLETE",
	REGISTER_FAIL: "REGISTER_FAIL",
	LOGIN_COMPLETE: "LOGIN_COMPLETE",
	LOGIN_FAIL: "LOGIN_FAIL",
	LOGOUT_COMPLETE: "LOGOUT_COMPLETE",
	UPLOAD_COMPLETE: "UPLOAD_COMPLETE",
	UPLOAD_FAIL: "UPLOAD_FAIL",
	PROFILE_DATA_REQUEST: "PROFILE_DATA_REQUEST",
	PROFILE_DATA_SUCCESS: "PROFILE_DATA_SUCCESS",
	PROFILE_DATA_FAIL: "PROFILE_DATA_FAIL",
	PROFILE_EDIT_SUCCESS: "PROFILE_EDIT_SUCCESS",
	WATCH_VIDEO_FETCH_REQUEST: "WATCH_VIDEO_FETCH_REQUEST",
	WATCH_VIDEO_FETCH_SUCCESS: "WATCH_VIDEO_FETCH_SUCCESS",
	WATCH_VIDEO_FETCH_FAIL: "WATCH_VIDEO_FETCH_FAIL",
	WATCH_VIDEO_REMOVE: "WATCH_VIDEO_REMOVE",
	CHANNEL_DATA_REQUEST: "CHANNEL_DATA_REQUEST",
	CHANNEL_DATA_SUCCESS: "CHANNEL_DATA_SUCCESS",
	CHANNEL_DATA_FAIL: "CHANNEL_DATA_FAIL",
	ADD_COMMENT: "ADD_COMMENT",
	LIKE_DISLIKE_VIDEO: "LIKE_DISLIKE_VIDEO",
	LIKE_DISLIKE_COMMENT: "LIKE_DISLIKE_COMMENT",
	HOME_PAGE_DATA_SUCCESS: "HOME_PAGE_DATA_SUCCESS",
	HOME_PAGE_DATA_REQUEST: "HOME_PAGE_DATA_REQUEST",
	VIDEO_DELETED: "VIDEO_DELETED",
	VIDEO_DATA_EDITED: "VIDEO_DATA_EDITED",
	DELETE_COMMENT: "DELETE_COMMENT",
	COMMENT_EDITED: "COMMENT_EDITED",
	FAVOURITE_SUCCESS: "FAVOURITE_SUCCESS",
	UNFAVOURITE_SUCCESS: "UNFAVOURITE_SUCCESS",
	ADD_SUB_SUCCESS: "ADD_SUB_SUCCESS",
	MINUS_SUB_SUCCESS: "MINUS_SUB_SUCCESS",
	ADD_VIEW_SUCCESS: "ADD_VIEW_SUCCESS",
	GET_USER_SUCCESS: "GET_USER_SUCCESS",
	GET_USER_SUCCESS2: "GET_USER_SUCCESS2"
});

export default types;
