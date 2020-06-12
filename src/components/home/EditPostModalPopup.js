import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentUsersPosts, editPost } from "../../actions/postActions";
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
            postId: "",
            postContent: "",
            postHeader: "",
            postMood: {
                happy: false,
                sad: false,
                funny: false,
                tired: false,
                bored: false,
                love: false,
                blessed: false,
                crying: false,
                angry: false,
                calm: false,
            },
            postHashtags: [],
            memorablePost: false,
            // modalShow: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.stopPropagation();
        this.props.editPost(this.state.postId, {
            postHeader: this.state.postHeader,
            postContent: this.state.postContent,
            postMood: this.state.postMood,
            postHashtags: this.state.postHashtags,
            memorablePost: this.state.memorablePost,
            postDate: new Date(),
        });
        this.props.onHide();
        this.setState({
            postHeader: "",
            postContent: "",
        });

        console.log(this.state.postContent, "form submitted");
    }

    onChange(e) {
        console.log(e.target.value);
        this.setState({
            postHeader: e.target.value,
        });
    }

    static getDerivedStateFromProps(props, state) {
        const editedPost =
            (props.posts &&
                props.editPostId &&
                props.posts.filter((elem) => {
                    return elem._id === props.editPostId;
                })[0]) ||
            "";

        if (state.postHeader) {
            return;
        }

        if (editedPost) {
            return {
                postId: editedPost._id,
                postHeader: editedPost.postHeader,
                postContent: editedPost.postContent,
                postMood: editedPost.postMood,
                postHashtags: editedPost.postHashtags,
                memorablePost: editedPost.memorablePost,
            };
        }
        console.log(props, state);
    }

    render() {
        const editedPost =
            (this.props.posts &&
                this.props.editPostId &&
                this.props.posts.filter((elem) => {
                    return elem._id === this.props.editPostId;
                })[0]) ||
            "";

        // if (editedPost) {
        //     this.setState({
        //         postHeader: editedPost.postHeader,
        //     });
        // }

        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h5 className="alert alert-danger">Past is Past!! Try not to change it</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    {editedPost && (
                        <form onSubmit={this.onSubmit}>
                            <input
                                type="text"
                                value={this.state.postHeader}
                                className="form-control form-control-lg"
                                onChange={this.onChange}
                                name="postHeader1"
                            />
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
                        </form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" onClick={this.onSubmit}>
                        Close
                    </button>
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

export default connect(mapStateToProps, { getCurrentUsersPosts, editPost })(PostCards);
