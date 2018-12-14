import React, { Component } from "react";
import { loginUser } from "../../actions/authActions";
import { connect } from "react-redux";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
class Login extends Component {
  constructor() {
    super();
    this.state = { email: "", password: "", errors: {} };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthorized) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthorized) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(event) {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <form className="form-horizontal" role="form" onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <h2 className="text-center">Hello Avenger</h2>
              <hr />
            </div>
          </div>

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
                <i className="fa fa-user-plus" /> Log in
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
  { loginUser }
)(withRouter(Login));
