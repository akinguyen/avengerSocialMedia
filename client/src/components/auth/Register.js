import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { withRouter } from "react-router";
import TextFieldGroup from "../common/TextFieldGroup";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthorized) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(event) {
    event.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    this.props.registerUser(newUser, this.props.history);
  }

  onChange(event) {
    switch (event.target.name) {
      case "name":
        this.setState({
          name: event.target.value
        });
        break;
      case "email":
        this.setState({
          email: event.target.value
        });
        break;
      default:
        this.setState({
          password: event.target.value
        });
        break;
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <form className="form-horizontal" role="form" onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <h2 className="text-center">Register New Avenger</h2>
              <hr />
            </div>
          </div>

          <TextFieldGroup
            header="Name"
            placeholder="Enter your name"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
            type="text"
            icon="fa fa-user"
          />
          <TextFieldGroup
            header="Email Address"
            placeholder="you@example.com"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
            type="text"
            icon="fa fa-at"
          />

          <TextFieldGroup
            header="Password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
            type="password"
            icon="fa fa-key"
          />

          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <button type="submit" className="btn btn-success">
                <i className="fa fa-user-plus" /> Register
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
