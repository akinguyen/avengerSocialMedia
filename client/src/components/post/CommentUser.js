import React, { Component } from "react";
import ModalDeleteUserComment from "./ModalDeleteUserComment";
import { NavLink } from "react-router-dom";
export default class CommentUser extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header">
            {this.props.auth_user === this.props.user_id ? (
              <div class="nav-item float-right">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-toggle="modal"
                  data-target={`#modal${this.props.index}`}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <ModalDeleteUserComment
                  index={this.props.index}
                  post_id={this.props.post_id}
                  comment_id={this.props.comment_id}
                />
              </div>
            ) : null}
          </div>
          <div className="row">
            <div className="col-sm-4 col-md-3 col-lg-2 col-md-2">
              <div className="mt-4 ml-4 mb-4 ">
                <NavLink to={`/profile/id/${this.props.user_id}`}>
                  <img
                    src={this.props.avatar}
                    alt="Card image cap"
                    style={{ width: "100px" }}
                    className=" rounded-circle border border-dark d-inline"
                  />
                </NavLink>

                <h6 class="mt-2">{this.props.name}</h6>
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
            <div className="col-sm-8 col-md-9 col-lg-10 pl-5 pr-5 pb-4 pr-sm-5 pt-sm-4 pb-sm-4">
              <div
                className="card rounded border border-secondary p-sm-3"
                style={{ backgroundColor: "#f5f5f5" }}
              >
                <p>{this.props.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
