import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { createProfile } from "../../actions/profileActions";
class CreateProfile extends Component {
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <h1 className="text-center">Create your Avenger Profile</h1>
              <hr />
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form action="" />
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
                <i className="fa fa-user-plus" /> Submit
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
  { createProfile }
)(withRouter(CreateProfile));
