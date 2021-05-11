import axios from "axios";

const AuthToken = token => {
	// https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests

	// in order to have all axios request have authorization without always attaching the header for it
	if (token) {
		axios.defaults.headers.common["Authorization"] = token;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
};

export default AuthToken;
