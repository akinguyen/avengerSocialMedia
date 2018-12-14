const initialState = {
  post: {},
  posts: null,
  loading: false
};
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POST_BY_ID":
      return { ...state, post: action.post, loading: false };
    case "LIKE_SINGLE_POST":
      return { ...state, post: action.post };
    case "UNLIKE_SINGLE_POST":
      return { ...state, post: action.post };
    case "LIKE_POST":
      var posts = [
        ...state.posts.slice().splice(0, action.index),
        action.post,
        ...state.posts.slice().splice(action.index + 1)
      ];
      return { ...state, posts: posts };
    case "ADD_POST":
      const posts = [...state.posts];
      posts.unshift(action.post);
      return { ...state, posts: posts, loading: false };
    case "DELETE_POST":
      var posts = state.posts.slice();
      posts.splice(action.index, 1);
      return { ...state, posts: posts };
    case "GET_POSTS":
      return { ...state, posts: action.posts, loading: false };
    case "SET_LOADING":
      return { ...state, loading: true };
    case "UN_LOADING":
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default postReducer;
