import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
import profileReducer from "../../reducers/profileReducer";
import ProfileItem from "./ProfileItem";
class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    if (profiles == null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        const profileList = profiles.map(p => (
          <div className="card-deck">
            <ProfileItem profile={p} />
          </div>
        ));
        profileItems = (
          <div>
            <div className="container">
              <div className="row">
                <div className="card-deck">{profileList}</div>
              </div>
            </div>
          </div>
        );
      } else {
        profileItems = <h4>No profiles found</h4>;
      }
    }
    return <div>{profileItems}</div>;
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
