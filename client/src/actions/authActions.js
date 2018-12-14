import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
export const registerUser = (user, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/users/register", user)
    .then(res => {
      dispatch({
        type: "GET_ERRORS",
        errors: { name: "", email: "", password: "" }
      });
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        errors: err.response.data
      });
    });
};

export const loginUser = user => dispatch => {
  axios
    .post("http://localhost:5000/api/users/login", user)
    .then(res => {
      const { token } = res.data;

      //Decode Token
      const decoded = jwt_decode(token);
      //Save Token to Local Storage
      localStorage.setItem("jwtToken", token);

      //Set Token to Auth header
      setAuthToken(token);

      dispatch({
        type: "GET_ERRORS",
        errors: { name: "", email: "", password: "" }
      });
      dispatch({
        type: "SET_CURRENT_USERS",
        user: decoded
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        errors: err.response.data
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch({
    type: "SET_CURRENT_USERS",
    user: {}
  });
};
