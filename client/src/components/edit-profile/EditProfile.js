import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

import { createProfile, getCurrentProfile } from "../../actions/profileActions";

const isEmpty = data => {
  return (
    data === "undefined" ||
    data === null ||
    (typeof data === "object" && Object.keys(data).length === 0) ||
    (typeof data === "string" && data.trim().length === 0)
  );
};
class EditProfile extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      handle: "",
      skills: "",
      youtube: "",
      facebook: "",
      errors: {}
    };
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile) {
      if (nextProps.profile.profile) {
        const skills = !isEmpty(nextProps.profile.profile.skills)
          ? nextProps.profile.profile.skills.join(",")
          : "";
        const handle = !isEmpty(nextProps.profile.profile.handle)
          ? nextProps.profile.profile.handle
          : "";
        const youtube = !isEmpty(nextProps.profile.profile.social.youtube)
          ? nextProps.profile.profile.social.youtube
          : "";
        const facebook = !isEmpty(nextProps.profile.profile.social.facebook)
          ? nextProps.profile.profile.social.facebook
          : "";
        const profile = { handle, skills, youtube, facebook };
        this.setState(profile);
      }
    }
  }
  onSubmit(event) {
    event.preventDefault();
    const profile = {
      handle: this.state.handle,
      skills: this.state.skills,
      youtube: this.state.youtube,
      facebook: this.state.facebook
    };
    this.props.createProfile(profile, this.props.history);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <form className="form-horizontal" role="form" onSubmit={this.onSubmit}>
          <NavLink className="btn btn-primary" exact path to="/dashboard">
            Go Back
          </NavLink>
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <h1 className="text-center">Edit your Avenger Profile</h1>
              <hr />
              <small className="d-block pb-3">* = required field</small>
            </div>
          </div>

          <TextFieldGroup
            header="Profile Handle"
            placeholder="Enter your handle"
            name="handle"
            value={this.state.handle}
            onChange={this.onChange}
            error={errors.handle}
            type="text"
            icon="fa fa-user"
          />
          <TextFieldGroup
            header="Skills"
            placeholder="Please use comma seperated values (eg. HTML,CSS,JS,C++ )"
            name="skills"
            value={this.state.skills}
            onChange={this.onChange}
            error={errors.skills}
            type="text"
            icon="fab fa-react"
          />
          <TextFieldGroup
            header="Youtube"
            placeholder="http://"
            name="youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={""}
            type="text"
            icon="fab fa-youtube"
            required={false}
          />

          <TextFieldGroup
            header="Facebook"
            placeholder="http://"
            name="facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={""}
            type="text"
            icon="fab fa-facebook"
            required={false}
          />

          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <button type="submit" className="btn btn-success">
                <i className="fa fa-user-plus" /> Edit Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
