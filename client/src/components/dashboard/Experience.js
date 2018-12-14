import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteExperience } from "../../actions/profileActions";
class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }
  render() {
    const experience = this.props.experience.map(e => (
      <tr key={e._id}>
        <td>{e.title}</td>
        <td>{e.company}</td>
        <td>{e.years}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, e._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteExperience }
)(withRouter(Experience));
