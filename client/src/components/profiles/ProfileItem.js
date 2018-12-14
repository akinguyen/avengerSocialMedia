import React, { Component } from "react";
import { NavLink } from "react-router-dom";
const isEmpty = data => {
  return (
    data === "undefined" ||
    data === null ||
    (typeof data === "object" && Object.keys(data).length === 0) ||
    (typeof data === "string" && data.trim().length === 0)
  );
};
export default class ProfileItem extends Component {
  render() {
    const profile = this.props.profile;
    const socialList = [];
    var skillList = [];
    if (profile.skills) {
      skillList = profile.skills.map(s => (
        <li class="list-inline-item">
          <i class="fas fa-check" />
          {s}
        </li>
      ));
    }
    if (profile.social) {
      if (!isEmpty(profile.social.youtube)) {
        socialList.push(
          <a
            className="fab fa-youtube"
            style={{
              marginRight: "20px",
              textDecoration: "none",
              fontSize: "40px",
              color: "red"
            }}
            href={profile.social.youtube}
            target="_blank"
          />
        );
      }
      if (!isEmpty(profile.social.facebook)) {
        socialList.push(
          <a
            style={{ fontSize: "40px", textDecoration: "none" }}
            className="fab fa-facebook"
            href={profile.social.facebook}
            target="_blank"
          />
        );
      }
    }

    return (
      <div class="card" style={{ width: "350px" }}>
        <img
          className="card-img-top rounded-circle mx-auto mt-2 border border-dark"
          src={profile.user.avatar}
          alt="Card image cap"
          style={{ width: "200px" }}
        />
        <div class="card-body">
          <h5 class="card-title text-center">{profile.user.name}</h5>
          <div class="icon-block text-center mb-4">{socialList}</div>
          <h5 class="card-title">Skills</h5>
          <ul class="list-inline mb-4">{skillList}</ul>
          <NavLink to={`/profile/${profile.handle}`} class="btn btn-primary">
            See Profile
          </NavLink>
        </div>
      </div>
    );
  }
}
