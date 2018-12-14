const isEmpty = data =>
  data === "undefined" ||
  data === null ||
  (typeof data === "object" && Object.keys(data).length === 0) ||
  (typeof data === "string" && data.trim().length === 0);

const initialState = {
  isAuthorized: false,
  user: {}
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USERS":
      return {
        ...state,
        isAuthorized: !isEmpty(action.user),
        user: action.user
      };
    default:
      return state;
  }
};
export default authReducer;
