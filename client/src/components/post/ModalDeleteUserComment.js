import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postActions";
class ModalDeleteUserComment extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div class="modal fade" id={`modal${this.props.index}`}>
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Warning</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div class="modal-body">Are you sure to delete this comment</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={event => {
                  this.props.deleteComment(
                    this.props.post_id,
                    this.props.comment_id
                  );
                }}
              >
                Yes
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  post: state.post
});
export default connect(
  mapStateToProps,
  { deleteComment }
)(ModalDeleteUserComment);
