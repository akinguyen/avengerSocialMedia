import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profileActions";
class AddExperience extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      title: "",
      company: "",
      years: "",
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
    const exp = {
      title: this.state.title,
      company: this.state.company,
      years: this.state.years
    };
    this.props.addExperience(exp, this.props.history);
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
              <h1 className="text-center">Add your experience</h1>
              <hr />
              <small className="d-block pb-3">* = required field</small>
            </div>
          </div>

          <TextFieldGroup
            header="Title"
            placeholder="Job title"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
            error={errors.title}
            type="text"
            icon="fa fa-user"
          />
          <TextFieldGroup
            header="Company"
            placeholder="Company name"
            name="company"
            value={this.state.company}
            onChange={this.onChange}
            error={errors.company}
            type="text"
            icon="fab fa-react"
          />
          <TextFieldGroup
            header="Years"
            placeholder="Working years"
            name="years"
            value={this.state.years}
            onChange={this.onChange}
            error={errors.years}
            type="text"
            icon="fab fa-react"
            required={false}
          />

          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <button type="submit" className="btn btn-success">
                <i className="fa fa-user-plus" /> Add Experience
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
  { addExperience }
)(withRouter(AddExperience));
