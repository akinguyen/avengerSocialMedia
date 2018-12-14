import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile, deleteProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileAction from "./ProfileAction";
import Experience from "./Experience";
import Education from "./Education";
class DashBoard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick(event) {
    this.props.deleteProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    //console.log("render");
    if (profile == null || loading == true) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted display-5">
              {" "}
              Welcome{" "}
              <Link to={`/profile/${profile.handle}`}>{profile.handle}</Link>
            </p>
            <ProfileAction />

            <Experience experience={profile.experience} />
            <div style={{ marginBottom: "60px" }} />
            <Education education={profile.education} />
            <div style={{ marginBottom: "60px" }} />
            <button
              type="button"
              onClick={this.onDeleteClick.bind(this)}
              class="btn btn-danger"
            >
              Delete Profile
            </button>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted display-5">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">DashBoard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteProfile }
)(DashBoard);
