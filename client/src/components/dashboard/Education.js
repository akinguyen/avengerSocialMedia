import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteEducation } from "../../actions/profileActions";
class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }
  render() {
    const education = this.props.education.map(e => (
      <tr key={e._id}>
        <td>{e.school}</td>
        <td>{e.degree}</td>
        <td>{e.major}</td>
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
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Major</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteEducation }
)(withRouter(Education));
