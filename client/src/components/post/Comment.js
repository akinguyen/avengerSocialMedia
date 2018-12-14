import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  getPostById,
  deleteSinglePost,
  likeSinglePost,
  unlikeSinglePost
} from "../../actions/postActions";
import { connect } from "react-redux";
import CommentItem from "./CommentItem";
import Spinner from "../common/Spinner";
import CommentForm from "./CommentForm";
import CommentUser from "./CommentUser";
class Comment extends Component {
  componentDidMount() {
    this.props.getPostById(this.props.match.params.id);
  }
  onDeleteClick(event, post_id) {
    this.props.deleteSinglePost(post_id, this.props.history);
  }
  onLikeClick(post_id) {
    this.props.likeSinglePost(post_id);
  }
  onUnlikeClick(post_id) {
    this.props.unlikeSinglePost(post_id);
  }
  render() {
    var postForm;
    if (
      Object.keys(this.props.post.post).length == 0 ||
      this.props.post.loading
    ) {
      postForm = <Spinner />;
    } else {
      if (Object.keys(this.props.post.post).length > 0) {
        postForm = (
          <div>
            <div>
              <CommentItem
                history={this.props.history}
                name={this.props.post.post.name}
                text={this.props.post.post.text}
                avatar={this.props.post.post.avatar}
                date={this.props.post.post.date}
                index={0}
                likes={new Set(this.props.post.post.likes.map(l => l.user))}
                likeNumber={this.props.post.post.likes.length}
                post_id={this.props.post.post._id}
                user_id={
                  typeof this.props.post.post.user !== "object"
                    ? this.props.post.post.user
                    : this.props.post.post.user._id
                }
                auth_user={this.props.auth.user.id}
                onDeleteClick={this.onDeleteClick.bind(this)}
                onLikeClick={this.onLikeClick.bind(this)}
                onUnlikeClick={this.onUnlikeClick.bind(this)}
              />
            </div>
            {this.props.auth.isAuthorized ? (
              <div>
                <CommentForm post_id={this.props.post.post._id} />
              </div>
            ) : (
              <h1 className="text-center mb-3">Comments</h1>
            )}

            {this.props.post.post.comment.map((c, index) => {
              return (
                <CommentUser
                  auth_user={this.props.auth.user.id}
                  post_id={this.props.post.post._id}
                  comment_id={c._id}
                  index={index}
                  user_id={c.user}
                  avatar={c.avatar}
                  text={c.text}
                  name={c.name}
                  date={c.date}
                />
              );
            })}
          </div>
        );
      }
    }
    return <div>{postForm}</div>;
  }
}
const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getPostById, deleteSinglePost, likeSinglePost, unlikeSinglePost }
)(withRouter(Comment));
