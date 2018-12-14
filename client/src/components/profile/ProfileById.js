import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileHeader from "./ProfileHeader";
class ProfileById extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getProfileById(this.props.match.params.id);
  }

  render() {
    const { profile, loading } = this.props.profile;
    var header;
    if (profile == null || loading) {
      header = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        header = <ProfileHeader profile={profile} />;
      } else {
        header = <h4>No profiles found</h4>;
      }
    }
    return (
      <div>
        <div>{header}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfileById }
)(ProfileById);
