import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentUsersPosts } from "../../actions/postActions";
// import ModalDialog from "react-bootstrap/ModalDialog";
import Modal from "react-bootstrap/Modal";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ModalHeader from "react-bootstrap/ModalHeader";
// import ModalBody from "react-bootstrap/ModalBody";

class PostCards extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            // modalShow: false,
        };
    }

    render() {
        const editedPost =
            (this.props.posts &&
                this.props.editPostId &&
                this.props.posts.filter((elem) => {
                    return elem._id === this.props.editPostId;
                })[0]) ||
            "";

        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h5 className="alert alert-danger">Past is Past!! Try not to change it</h5>
                        {editedPost.postHeader}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    {editedPost && (
                        <CKEditor
                            editor={ClassicEditor}
                            data={editedPost.postContent}
                            onInit={(editor) => {
                                // You can store the "editor" and use when it is needed.
                                console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log({ event, editor, data });
                                this.setState({
                                    postContent: data,
                                });
                            }}
                            onBlur={(event, editor) => {
                                console.log("Blur.", editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log("Focus.", editor);
                            }}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={this.props.onHide}>Close</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    posts: state.post.posts,
    editPostId: state.post.editPostId,
});

export default connect(mapStateToProps, { getCurrentUsersPosts })(PostCards);
