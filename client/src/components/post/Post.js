import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addPost,
  getPosts,
  deletePost,
  likePost,
  unlikePost
} from "../../actions/postActions";
import PostForm from "./PostForm";
import PostItem from "./PostItem";
import Spinner from "../common/Spinner";
class Post extends Component {
  constructor() {
    super();
    this.state = { text: "", errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onLikeClick = this.onLikeClick.bind(this);
    this.onUnlikeClick = this.onUnlikeClick.bind(this);
  }
  componentDidMount() {
    this.props.getPosts();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.post.post) {
      this.setState({ text: "" });
    }
  }
  onDeleteClick(event, post_id, index) {
    this.props.deletePost(post_id, index);
  }
  onLikeClick(post_id, index) {
    this.props.likePost(post_id, index);
  }
  onUnlikeClick(post_id, index) {
    this.props.unlikePost(post_id, index);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    const post = {
      text: this.state.text
    };
    this.props.addPost(post);
  }
  render() {
    var postList = [];
    var postForm;
    if (this.props.post.posts == null || this.props.post.loading) {
      postForm = <Spinner />;
    } else {
      postList = this.props.post.posts.map((post, index) => {
        return (
          <PostItem
            name={post.name}
            text={post.text}
            avatar={post.avatar}
            date={post.date}
            index={index}
            commentNumber={post.comment.length}
            likes={new Set(post.likes.map(l => l.user))}
            likeNumber={post.likes.length}
            post_id={post._id}
            user_id={typeof post.user !== "object" ? post.user : post.user._id}
            auth_user={this.props.auth.user.id}
            onDeleteClick={this.onDeleteClick}
            onLikeClick={this.onLikeClick}
            onUnlikeClick={this.onUnlikeClick}
          />
        );
      });
      postForm = <div>{postList}</div>;
    }

    return (
      <div>
        <div className="mb-4">
          {this.props.auth.isAuthorized ? (
            <PostForm
              errors={this.state.errors}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              text={this.state.text}
            />
          ) : (
            <h1 className="text-center">News Feed</h1>
          )}
        </div>
        {postForm}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { addPost, getPosts, deletePost, likePost, unlikePost }
)(Post);
