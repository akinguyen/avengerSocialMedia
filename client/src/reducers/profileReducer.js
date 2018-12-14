const intialState = {
  profile: null,
  profiles: null,
  loading: false
};

const profileReducer = (state = intialState, action) => {
  switch (action.type) {
    case "PROFILE_LOADING":
      return { ...state, loading: true };
    case "GET_PROFILE":
      return { ...state, profile: action.profile, loading: false };
    case "GET_PROFILES":
      return { ...state, profiles: action.profiles, loading: false };
    case "GET_PROFILE_BY_ID":
      return { ...state, profile: action.profile, loading: false };
    case "CLEAR_CURRENT_PROFILE":
      return { ...state, profile: {} };
    default:
      return state;
  }
};
export default profileReducer;
