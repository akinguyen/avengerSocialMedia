import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthorized, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" to="/dashboard">
            Dashboard
          </NavLink>
        </li>
        <li>
          <a
            className="nav-link"
            href=""
            onClick={this.onLogoutClick.bind(this)}
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have email"
            />
            Log out
          </a>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav mx-auto mt-lg-0">
        <li>
          <NavLink className="nav-link" style={{}} to="/register">
            Sign up
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" style={{}} to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-lg mb-4 navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">
          <img
            src="https://legendaorui.files.wordpress.com/2012/08/avengerings.gif"
            style={{ width: "40px" }}
            alt="Avenger"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <NavLink className="nav-link" to="/profile">
                Developers <span class="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/post">
                News Feed
              </NavLink>
            </li>
          </ul>
          {isAuthorized ? authLinks : guestLinks}
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
