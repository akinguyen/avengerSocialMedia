import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import classnames from "classnames";
import { addPost } from "../../actions/postActions";

const isEmpty = data => {
  return (
    data === "undefined" ||
    data === null ||
    (typeof data === "object" && Object.keys(data).length === 0) ||
    (typeof data === "string" && data.trim().length === 0)
  );
};
class PostForm extends Component {
  constructor() {
    super();
  }
  componentDidMount() {}

  render() {
    const errors = this.props.errors;
    return (
      <div className="container">
        <form
          className="form-horizontal"
          role="form"
          onSubmit={this.props.onSubmit}
        >
          <NavLink className="btn btn-primary" exact path to="/dashboard">
            Go Back
          </NavLink>
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <h1 className="text-center">News Feed</h1>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 field-label-responsive" />
            <div className="col-md-6">
              <div className="form-group">
                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                  <div
                    className="input-group-addon"
                    style={{ width: " 2.6rem" }}
                  >
                    <i className="fab fa-react" />
                  </div>
                  <textarea
                    value={this.props.text}
                    onChange={e => this.props.onChange(e)}
                    rows="5"
                    name="text"
                    id="comment"
                    autofocus
                    placeholder="Enter your feeling"
                    className={classnames("form-control", {
                      "is-invalid": errors.text
                    })}
                  />
                  <div class="invalid-feedback">{errors.text}</div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-control-feedback">
                <span className="text-danger align-middle" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <button type="submit" className="btn btn-success">
                <i className="fa fa-user-plus" /> Post
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default PostForm;
