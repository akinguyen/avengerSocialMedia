import axios from "axios";
export const addPost = post => dispatch => {
  dispatch({ type: "SET_LOADING" });
  axios
    .post("http://localhost:5000/api/posts/", post)
    .then(res => {
      dispatch({ type: "ADD_POST", post: res.data });
      dispatch({ type: "GET_ERRORS", errors: {} });
    })
    .catch(err => {
      dispatch({ type: "GET_ERRORS", errors: err.response.data });
      dispatch({ type: "UN_LOADING" });
    });
};
export const deletePost = (id, index) => dispatch => {
  dispatch({ type: "SET_LOADING" });
  axios
    .delete(`http://localhost:5000/api/posts/${id}`)
    .then(res => {
      dispatch({ type: "DELETE_POST", index: index });
      dispatch({ type: "UN_LOADING" });
    })
    .catch(err => {});
};
export const deleteSinglePost = (id, history) => dispatch => {
  dispatch({ type: "SET_LOADING" });
  axios
    .delete(`http://localhost:5000/api/posts/${id}`)
    .then(res => {
      history.push("/post");
      dispatch({ type: "UN_LOADING" });
    })
    .catch(err => {});
};
export const likePost = (id, index) => dispatch => {
  dispatch({ type: "SET_LOADING" });

  axios
    .post(`http://localhost:5000/api/posts/like/${id}`)
    .then(res => {
      dispatch({ type: "LIKE_POST", post: res.data, index: index });
      dispatch({ type: "UN_LOADING" });
    })
    .catch(err => {
      dispatch({ type: "GET_ERRORS", errors: err.response.data });
      dispatch({ type: "UN_LOADING" });
    });
};

export const unlikePost = (id, index) => dispatch => {
  dispatch({ type: "SET_LOADING" });

  axios
    .post(`http://localhost:5000/api/posts/unlike/${id}`)
    .then(res => {
      dispatch({ type: "LIKE_POST", post: res.data, index: index });
      dispatch({ type: "UN_LOADING" });
    })
    .catch(err => {
      dispatch({ type: "GET_ERRORS", errors: err.response.data });
      dispatch({ type: "UN_LOADING" });
    });
};

export const likeSinglePost = id => dispatch => {
  dispatch({ type: "SET_LOADING" });

  axios
    .post(`http://localhost:5000/api/posts/like/${id}`)
    .then(res => {
      dispatch({
        type: "LIKE_SINGLE_POST",
        post: res.data
      });
      dispatch({ type: "UN_LOADING" });
    })
    .catch(err => {
      dispatch({ type: "GET_ERRORS", errors: err.response.data });
      dispatch({ type: "UN_LOADING" });
    });
};
export const unlikeSinglePost = id => dispatch => {
  dispatch({ type: "SET_LOADING" });

  axios
    .post(`http://localhost:5000/api/posts/unlike/${id}`)
    .then(res => {
      dispatch({
        type: "UNLIKE_SINGLE_POST",
        post: res.data
      });
      dispatch({ type: "UN_LOADING" });
    })
    .catch(err => {
      dispatch({ type: "GET_ERRORS", errors: err.response.data });
      dispatch({ type: "UN_LOADING" });
    });
};
export const getPosts = () => dispatch => {
  dispatch({ type: "SET_LOADING" });
  axios
    .get("http://localhost:5000/api/posts/")
    .then(res => {
      dispatch({ type: "GET_POSTS", posts: res.data });
    })
    .catch(err => {
      dispatch({ type: "GET_ERRORS", errors: null });
    });
};

export const getPostById = id => dispatch => {
  dispatch({ type: "SET_LOADING" });
  axios
    .get("http://localhost:5000/api/posts/" + id)
    .then(res => {
      dispatch({
        type: "GET_POST_BY_ID",
        post: res.data
      });
      dispatch({ type: "UN_LOADING" });
    })
    .catch(err => {
      dispatch({
        type: "GET_POST_BY_ID",
        post: {}
      });
      dispatch({ type: "UN_LOADING" });
    });
};
export const deleteComment = (id, comment_id) => dispatch => {
  dispatch({ type: "SET_LOADING" });

  axios
    .delete("http://localhost:5000/api/posts/comment/" + id + "/" + comment_id)
    .then(res => {
      dispatch({
        type: "GET_POST_BY_ID",
        post: res.data
      });
      dispatch({ type: "UN_LOADING" });
    })
    .catch(err => {
      dispatch({
        type: "GET_POST_BY_ID",
        post: {}
      });
      dispatch({ type: "UN_LOADING" });
    });
};
export const addComment = (id, comment) => dispatch => {
  dispatch({ type: "SET_LOADING" });
  axios
    .post("http://localhost:5000/api/posts/comment/" + id, comment)
    .then(res => {
      dispatch({
        type: "GET_POST_BY_ID",
        post: res.data
      });
      dispatch({ type: "UN_LOADING" });
    })
    .catch(err => {
      dispatch({
        type: "GET_POST_BY_ID",
        post: {}
      });
      dispatch({ type: "UN_LOADING" });
    });
};
