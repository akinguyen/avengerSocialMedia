const initialState = {};
const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ERRORS":
      return { ...action.errors };
    default:
      return state;
  }
};
export default errorReducer;
