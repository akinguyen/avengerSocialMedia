import axios from "axios";
//Type: GET_PROFILE, PROFILE_LOADING, GET_ERROR

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => {
      if (res.data) {
        dispatch({
          type: "GET_PROFILE",
          profile: res.data
        });
      } else {
        dispatch({
          type: "GET_PROFILE",
          profile: {}
        });
      }
    })
    .catch(err => {
      dispatch({
        type: "GET_PROFILE",
        profile: {}
      });
    });
};

export const createProfile = (profile, history) => dispatch => {
  axios
    .post("/api/profile", profile)
    .then(res => {
      dispatch({
        type: "GET_ERRORS",
        errors: {}
      });
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        errors: err.response.data
      });
    });
};
//Profile Loading
export const setProfileLoading = () => {
  return {
    type: "PROFILE_LOADING"
  };
};

export const getProfileById = id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/user/" + id)
    .then(res => {
      dispatch({
        type: "GET_PROFILE_BY_ID",
        profile: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_PROFILE_BY_ID",
        profile: {}
      });
    });
};

export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/handle/" + handle)
    .then(res => {
      dispatch({
        type: "GET_PROFILE_BY_ID",
        profile: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_PROFILE_BY_ID",
        profile: {}
      });
    });
};
export const deleteProfile = history => dispatch => {
  axios
    .delete("/api/profile")
    .then(res => {
      dispatch({
        type: "SET_CURRENT_USERS",
        user: {}
      });
      dispatch({
        type: "GET_PROFILE",
        profile: {}
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_PROFILE",
        profile: {}
      });
    });
};

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res => {
      dispatch({
        type: "GET_PROFILES",
        profiles: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_PROFILES",
        profile: {}
      });
    });
};
export const addExperience = (exp, history) => dispatch => {
  axios
    .post("/api/profile/experience", exp)
    .then(res => {
      dispatch({
        type: "GET_ERRORS",
        errors: {}
      });
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        errors: err.response.data
      });
    });
};

export const addEducation = (edu, history) => dispatch => {
  axios
    .post("/api/profile/education", edu)
    .then(res => {
      dispatch({
        type: "GET_ERRORS",
        errors: {}
      });
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        errors: err.response.data
      });
    });
};
//Clear Profile

export const deleteExperience = id => dispatch => {
  axios
    .delete("/api/profile/experience/" + id)
    .then(res => {
      dispatch({
        type: "GET_PROFILE",
        profile: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        errors: err.response.data
      });
    });
};
export const deleteEducation = id => dispatch => {
  axios
    .delete("/api/profile/education/" + id)
    .then(res => {
      dispatch({
        type: "GET_PROFILE",
        profile: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        errors: err.response.data
      });
    });
};
export const clearCurrentProfile = () => {
  return {
    type: "CLEAR_CURRENT_PROFILE"
  };
};
