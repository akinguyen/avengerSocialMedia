import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { addComment } from "../../actions/postActions";
import classnames from "classnames";
class CommentForm extends Component {
  constructor() {
    super();
    this.state = { text: "" };
  }
  render() {
    console.log(this.props.auth.isAuthorized);
    return (
      <div className="container mb-5" width={{ width: "350px" }}>
        <div class="card">
          <div class="card-header bg-primary text-white">Comment</div>

          <div class="card-body" style={{ width: "auto" }}>
            <div className="container">
              <textarea
                style={{ width: "100%", height: "150px" }}
                value={this.state.text}
                onChange={e => {
                  this.setState({ text: e.target.value });
                }}
                name="text"
                id="comment"
                autofocus
                placeholder="Enter your comment"
                className="border border-info"
                required
              />
            </div>
            <button
              type="button"
              className="btn btn-brand btn-success mt-3"
              onClick={event => {
                this.props.addComment(this.props.post_id, {
                  text: this.state.text,
                  user: this.props.auth.user.id,
                  name: this.props.auth.user.name,
                  avatar: this.props.auth.user.avatar
                });
              }}
            >
              Enter Comment
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});
export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
