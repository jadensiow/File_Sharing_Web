import apiurl from "../apiurl";

const AuthToken = (token) => {
  if (token) {
    apiurl.defaults.headers.common["Authorization"] = token;
  } else {
    delete apiurl.defaults.headers.common["Authorization"];
  }
};

export default AuthToken;
