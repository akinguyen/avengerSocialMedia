import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profileActions";
class AddEducation extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      school: "",
      degree: "",
      major: "",
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
    const edu = {
      school: this.state.school,
      major: this.state.major,
      degree: this.state.degree
    };
    this.props.addEducation(edu, this.props.history);
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
              <h1 className="text-center">Add your education</h1>
              <hr />
              <small className="d-block pb-3">* = required field</small>
            </div>
          </div>

          <TextFieldGroup
            header="School"
            placeholder="School name"
            name="school"
            value={this.state.school}
            onChange={this.onChange}
            error={errors.school}
            type="text"
            icon="fa fa-user"
          />
          <TextFieldGroup
            header="Degree"
            placeholder="Degree"
            name="degree"
            value={this.state.degree}
            onChange={this.onChange}
            error={errors.degree}
            type="text"
            icon="fab fa-react"
          />
          <TextFieldGroup
            header="Major"
            placeholder="Major"
            name="major"
            value={this.state.major}
            onChange={this.onChange}
            error={errors.major}
            type="text"
            icon="fab fa-react"
            required={false}
          />

          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <button type="submit" className="btn btn-success">
                <i className="fa fa-user-plus" /> Add Education
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
  { addEducation }
)(withRouter(AddEducation));
