import React from "react";
import { NavLink, Link } from "react-router-dom";
import ModalDelete from "./ModalDelete";

export default function PostItem(props) {
  return (
    <div className="container mb-5" width={{ width: "350px" }}>
      <div class="card">
        <div class="card-header">
          <ul class="nav nav-pills card-header-pills mr-auto">
            <li class="nav-item">
              <div class="nav-link active" href="#">
                Post
              </div>
            </li>

            <li class="ml-2 nav-item">
              <NavLink
                className="nav-link bg-primary text-white"
                to={`/post/id/${props.post_id}`}
              >
                Comment
                <span class="ml-2 badge badge-light">
                  {props.commentNumber}
                </span>
              </NavLink>
            </li>

            <li class="nav-item ml-auto">
              {props.auth_user === props.user_id ? (
                <div>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-toggle="modal"
                    data-target={`#modal${props.index}`}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <ModalDelete
                    post_id={props.post_id}
                    index={props.index}
                    onDeleteClick={props.onDeleteClick}
                  />
                </div>
              ) : null}
            </li>
          </ul>
        </div>

        <div className="card-img-top">
          <NavLink
            to={`/profile/id/${props.user_id}`}
            className="ml-2 mt-2 d-inline float-left"
          >
            <img
              src={props.avatar}
              alt="Card image cap"
              style={{ width: "100px" }}
              className=" rounded-circle mx-auto mt-2 border border-dark d-inline"
            />
          </NavLink>
          <div class="ml-2 mt-3 float-left">
            <h6 class="">{props.name}</h6>
            <h6 style={{ fontSize: "10px" }}>
              {"Date: " + props.date.substring(0, props.date.indexOf("T"))}
            </h6>
            <h6 style={{ fontSize: "10px" }}>
              {"Time: " +
                props.date.substring(
                  props.date.indexOf("T") + 1,
                  props.date.length - 8
                )}
            </h6>
          </div>
        </div>

        <div class="card-body mr-5" style={{ width: "auto" }}>
          <div className="container">
            <p className="mt-4 display-5">{props.text}</p>
          </div>
        </div>

        <div class="mt-5">
          <button
            type="button"
            onClick={event => props.onLikeClick(props.post_id, props.index)}
            className={
              props.likes.has(props.auth_user)
                ? "btn text-success"
                : "btn btn-grey"
            }
          >
            <i className="fas fa-thumbs-up" />

            <span class="badge badge-light ml-2">{props.likeNumber}</span>
          </button>
          <button
            type="button"
            class="btn btn-danger"
            onClick={event => props.onUnlikeClick(props.post_id, props.index)}
          >
            <i className="fas fa-thumbs-down" />
            <span class="badge badge-light">{""}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
