import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import ModalDeleteComment from "./ModalDeleteComment";
class CommentItem extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="container mb-5" width={{ width: "350px" }}>
        <div class="card">
          <div class="card-header">
            <ul class="nav nav-pills card-header-pills mr-auto">
              <li class="nav-item">
                <NavLink class="nav-link active" to="/post">
                  New Feeds
                </NavLink>
              </li>

              <li class="nav-item ml-auto">
                {this.props.auth_user === this.props.user_id ? (
                  <div>
                    <button
                      type="button"
                      class="btn btn-danger"
                      data-toggle="modal"
                      data-target={`#modal${0}`}
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <ModalDeleteComment
                      post_id={this.props.post_id}
                      index={0}
                      onDeleteClick={this.props.onDeleteClick}
                      history={this.props.history}
                    />
                  </div>
                ) : null}
              </li>
            </ul>
          </div>

          <div className="card-img-top">
            <NavLink
              to={`/profile/id/${this.props.user_id}`}
              className="ml-2 mt-2 d-inline float-left"
            >
              <img
                src={this.props.avatar}
                alt="Card image cap"
                style={{ width: "100px" }}
                className=" rounded-circle mx-auto mt-2 border border-dark d-inline"
              />
            </NavLink>
            <div class="ml-2 mt-3 float-left">
              <h6 class="">{this.props.name}</h6>
              <h6 style={{ fontSize: "10px" }}>
                {"Date: " +
                  this.props.date.substring(0, this.props.date.indexOf("T"))}
              </h6>
              <h6 style={{ fontSize: "10px" }}>
                {"Time: " +
                  this.props.date.substring(
                    this.props.date.indexOf("T") + 1,
                    this.props.date.length - 8
                  )}
              </h6>
            </div>
          </div>

          <div class="card-body mr-5" style={{ width: "auto" }}>
            <div className="container">
              <p className="mt-4 display-5">{this.props.text}</p>
            </div>
          </div>

          <div class="mt-5">
            <button
              type="button"
              onClick={event =>
                this.props.onLikeClick(
                  this.props.post_id,
                  this.props.likes,
                  this.props.auth_user
                )
              }
              className={
                this.props.likes.has(this.props.auth_user)
                  ? "btn text-success"
                  : "btn btn-grey"
              }
            >
              <i className="fas fa-thumbs-up" />

              <span class="badge badge-light ml-2">
                {this.props.likeNumber}
              </span>
            </button>
            <button
              type="button"
              class="btn btn-danger"
              onClick={event =>
                this.props.onUnlikeClick(
                  this.props.post_id,
                  this.props.likes,
                  this.props.auth_user
                )
              }
            >
              <i className="fas fa-thumbs-down" />
              <span class="badge badge-light">{""}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentItem;
