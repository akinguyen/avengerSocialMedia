import React from "react";
import profileReducer from "../../reducers/profileReducer";
const isEmpty = data => {
  return (
    data === "undefined" ||
    data === null ||
    (typeof data === "object" && Object.keys(data).length === 0) ||
    (typeof data === "string" && data.trim().length === 0)
  );
};
export default function ProfileHeader(props) {
  var skillList = [];
  var socialList = [];
  if (props.profile.social) {
    if (!isEmpty(props.profile.social.youtube)) {
      socialList.push(
        <a
          className="fab fa-youtube text-primary"
          style={{
            marginRight: "20px",
            textDecoration: "none",
            fontSize: "40px"
          }}
          href={props.profile.social.youtube}
          target="_blank"
        />
      );
    }
    if (!isEmpty(props.profile.social.facebook)) {
      socialList.push(
        <a
          style={{ fontSize: "40px", textDecoration: "none" }}
          className="fab fa-facebook text-primary"
          href={props.profile.social.facebook}
          target="_blank"
        />
      );
    }
  }
  if (props.profile.skills) {
    skillList = props.profile.skills.map(s => (
      <li class="list-inline-item" style={{ fontSize: "20px" }}>
        <i class="fas fa-check" />
        {s}
      </li>
    ));
  }
  var experience = [];
  var education = [];

  if (props.profile.education && props.profile.education.length > 0) {
    var edu_keys = Object.keys(props.profile.education[0]);
    education = props.profile.education.map((e, i) => {
      return (
        <div key={i} class="card mb-3">
          <div class="card-body">
            <h5 class="card-title" style={{ color: "#00008B" }}>
              School
            </h5>
            <p class="card-text">{e[edu_keys[1]]}</p>
            <h5 class="card-title" style={{ color: "#00008B" }}>
              Degree
            </h5>
            <p class="card-text">{e[edu_keys[2]]}</p>
            <h5 class="card-title" style={{ color: "#00008B" }}>
              Major
            </h5>
            <p class="card-text">{e[edu_keys[3]]}</p>
          </div>
        </div>
      );
    });
  }
  if (props.profile.experience && props.profile.experience.length > 0) {
    var keys = Object.keys(props.profile.experience[0]);
    experience = props.profile.experience.map((e, i) => {
      console.log(e[keys[1]]);
      return (
        <div key={i} class="card mb-3">
          <div class="card-body">
            <h5 class="card-title" style={{ color: "#00008B" }}>
              Title
            </h5>
            <p class="card-text">{e[keys[1]]}</p>
            <div />
            <h5 class="card-title" style={{ color: "#00008B" }}>
              Company
            </h5>
            <p class="card-text">{e[keys[2]]}</p>
            <div />
            <h5 class="card-title" style={{ color: "#00008B" }}>
              Years
            </h5>
            <p class="card-text">{e[keys[3]]}</p>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <div class="card bg-success mb-3">
        <div>
          <div
            class="img-fluid"
            alt="Responsive image"
            style={{
              maxWidth: "100%",
              height: "470px",
              backgroundImage: `url(${"https://wallpapercave.com/wp/wp2552360.jpg"})`
            }}
          />
          <div
            style={{ marginTop: "70px" }}
            className="card-img-overlay text-center"
          >
            <img
              src={props.profile.user.avatar}
              class="rounded-circle border border-dark"
              style={{ width: "200px" }}
            />
            <h2 style={{ color: "white" }}>
              {props.profile.user.name + `  (${props.profile.handle})`}
            </h2>
            <div class="icon-block text-center mb-4">{socialList}</div>
          </div>
        </div>

        <div class="card-body">
          <h3 className="text-center">Skills</h3>
          <div class="card-text text-center">{skillList}</div>
          <div class="card-text" />
        </div>
      </div>
      <div class="card-deck">
        <div class="card bg-info" style={{ width: "350px" }}>
          <div class="card-body">
            <h4 class="card-title text-center text-white">Experience</h4>
            {experience}
          </div>
        </div>

        <div class="card bg-info" style={{ width: "350px" }}>
          <div class="card-body">
            <h4 class="card-title text-center text-white">Education</h4>
            {education}
          </div>
        </div>
      </div>
    </div>
  );
}
