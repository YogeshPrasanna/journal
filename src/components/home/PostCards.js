import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentUsersPosts, shouldShowModal } from "../../actions/postActions";
import { deletePost } from "../../actions/postActions";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import EditPostModalPopup from "./EditPostModalPopup";
// import ModalDialog from "react-bootstrap/ModalDialog";
// import Modal from "react-bootstrap/Modal";
// import ModalHeader from "react-bootstrap/ModalHeader";
// import ModalBody from "react-bootstrap/ModalBody";

class PostCards extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            showModal: false,
        };

        this.deletePost = this.deletePost.bind(this);
        this.editPost = this.editPost.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentUsersPosts();
    }

    deletePost(postId) {
        this.props.deletePost(postId);
    }

    editPost(postId) {
        this.props.shouldShowModal(true, postId);
        console.log(this.props);
    }

    render() {
        return (
            <>
                <EditPostModalPopup
                    show={this.props.showModal}
                    size="lg"
                    onHide={() => this.props.shouldShowModal(false)}
                />
                {this.props.posts.map((post) => {
                    const date = new Date(post.postDate);
                    const dateTimeFormat = new Intl.DateTimeFormat("en", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                    });
                    const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date);

                    return (
                        <div className="card bg-light" key={post._id} style={{ minWidth: "15rem" }}>
                            <div className="card-body custom-card">
                                <h4 className="custom-card-date">
                                    {`${day} ${month} ${year}`}

                                    <span
                                        onClick={() => this.deletePost(post._id)}
                                        style={{ float: "right", cursor: "pointer", paddingLeft: "10px" }}
                                        title="Delete"
                                    >
                                        <svg
                                            className="bi bi-trash-fill"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                                            />
                                        </svg>
                                    </span>
                                    <span
                                        onClick={() => this.editPost(post._id)}
                                        style={{ float: "right", cursor: "pointer" }}
                                        title="Edit"
                                    >
                                        <svg
                                            className="bi bi-pencil"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"
                                            />
                                        </svg>
                                    </span>
                                </h4>
                                <h5 className="card-title custom-card-header">{post.postHeader}</h5>
                                <div className="card-text custom-card-content">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={post.postContent}
                                        disabled={true}
                                        config={{
                                            toolbar: [],
                                        }}
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
                                    {/* {post.postContent} */}
                                </div>
                                <div className="custom-card-tags">
                                    {post.postHashtags.map((elem, i) => {
                                        return (
                                            <span
                                                key={i}
                                                style={{
                                                    color: "#fff",
                                                    backgroundColor: "#bdb3b1",
                                                    padding: "5px",
                                                    marginRight: "5px",
                                                    borderRadius: "5px",
                                                }}
                                            >
                                                #{elem}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    posts: state.post.posts,
    showModal: state.post.showModal,
});

export default connect(mapStateToProps, { getCurrentUsersPosts, deletePost, shouldShowModal })(PostCards);
