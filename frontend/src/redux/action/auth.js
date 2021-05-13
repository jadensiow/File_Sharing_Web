import backend_api from "../api/backend";

import types from "../types";
import {
  toastrError,
  toastrInfo,
  toastrSuccess,
} from "../../functions/toastrs";

// Register User
export const register =
  ({ firstName, lastName, username, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    try {
      const res = await backend_api.post("/api/users/register/", body, config);

      if (res && res.data?.success) {
        dispatch({
          type: types.REGISTER_COMPLETE,
          payload: res.data,
        });

        toastrSuccess("Registration Successful", "");
      } else if (res && !res.data?.success) {
        toastrError("Registration Failed", res.data.message);
        dispatch({
          type: types.REGISTER_FAIL,
          payload: res.data.message,
        });
      }
    } catch (err) {
      console.log(err);
      toastrError("Internal Server Error");

      dispatch({
        type: types.REGISTER_FAIL,
      });
    }
  };

// Login User
export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, password });

  try {
    const res = await backend_api.post("/api/users/login/", body, config);
    if (res.data) {
      if (res.data.success) {
        toastrSuccess("Logged in Successfuly");
        dispatch({
          type: types.LOGIN_COMPLETE,
          payload: res.data,
        });
      } else {
        toastrError("Login Failed", res.data.message);

        dispatch({
          type: types.LOGIN_FAIL,
          payload: res.data.message,
        });
      }
    }
  } catch (err) {
    toastrError("Internal Server Error");

    dispatch({
      type: types.LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: types.LOGOUT_COMPLETE,
  });

  toastrInfo("Logged out");
};
