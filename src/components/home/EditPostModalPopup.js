import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentUsersPosts, editPost } from "../../actions/postActions";
import Modal from "react-bootstrap/Modal";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.

class PostCards extends Component {
    constructor(props) {
        super(props);

        const editedPost =
            (props.posts &&
                props.editPostId &&
                props.posts.filter((elem) => {
                    return elem._id === props.editPostId;
                })[0]) ||
            "";

        this.state = {
            posts: [],
            postId: editedPost._id || "",
            postContent: editedPost.postContent || "",
            postHeader: editedPost.postHeader || "",
            postMood: editedPost.postMood || {
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
            postHashtags: editedPost.postHashtags || [],
            memorablePost: editedPost.memorablePost || false,
            postDate: editedPost.postDate,
            // modalShow: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.memorablePostChange = this.memorablePostChange.bind(this);
        this.handleHashtagsChange = this.handleHashtagsChange.bind(this);
        this.postMoodChange = this.postMoodChange.bind(this);
    }

    onSubmit(e) {
        e.stopPropagation();
        this.props.editPost(this.state.postId, {
            postHeader: this.state.postHeader,
            postContent: this.state.postContent,
            postMood: this.state.postMood,
            postHashtags: this.state.postHashtags,
            memorablePost: this.state.memorablePost,
            postDate: new Date(this.state.postDate),
        });
        this.props.onHide();
        console.log(this.state.postContent, "form submitted");
    }

    onChange(e) {
        console.log(e.target.value);
        this.setState({
            postHeader: e.target.value,
        });
    }

    memorablePostChange(e) {
        console.log("$$$$$$$$", e.target.checked);
        this.setState({
            memorablePost: e.target.checked,
        });
    }

    postMoodChange(e) {
        let name = e.target.name.split("-")[1];
        let isChecked = e.target.checked;
        this.setState((prevState) => {
            let postMood = Object.assign({}, prevState.postMood); // creating copy of state variable jasper
            postMood[name] = isChecked; // update the name property, assign a new value
            return { postMood }; // return new object jasper object
        });
    }

    componentDidUpdate(nextProps, nextState) {
        // console.log("compnentDidUpdate : ", nextProps, nextState);
        console.log(nextProps.editPostId, this.state.postId);

        const editedPost =
            (nextProps.posts &&
                nextProps.editPostId &&
                nextProps.posts.filter((elem) => {
                    return elem._id === nextProps.editPostId;
                })[0]) ||
            "";

        if (editedPost) {
            console.log(nextProps.editPostId, this.state.postId);
            if (nextProps.editPostId !== this.state.postId)
                return this.setState({
                    postId: editedPost._id,
                    postHeader: editedPost.postHeader,
                    postContent: editedPost.postContent,
                    postMood: editedPost.postMood,
                    postHashtags: editedPost.postHashtags,
                    memorablePost: editedPost.memorablePost,
                    postDate: editedPost.postDate,
                });
        }
    }

    handleHashtagsChange(postHashtags) {
        this.setState({ postHashtags });
    }

    inputProps() {
        return {
            placeholder: "Hashtags",
        };
    }

    // static getDerivedStateFromProps(props, state) {
    //     console.log("--------------");
    //     const editedPost =
    //         (props.posts &&
    //             props.editPostId &&
    //             props.posts.filter((elem) => {
    //                 return elem._id === props.editPostId;
    //             })[0]) ||
    //         "";

    //     if (state.postHeader) {
    //         return;
    //     }

    //     if (editedPost) {
    //         return {
    //             postId: editedPost._id,
    //             postHeader: editedPost.postHeader,
    //             postContent: editedPost.postContent,
    //             postMood: editedPost.postMood,
    //             postHashtags: editedPost.postHashtags,
    //             memorablePost: editedPost.memorablePost,
    //         };
    //     }
    //     console.log(props, state);
    // }

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
                                name="postHeader"
                            />
                            <CKEditor
                                editor={ClassicEditor}
                                data={editedPost.postContent}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    this.setState({
                                        postContent: data,
                                    });
                                }}
                            />
                            <div className="row" style={{ padding: "15px 0" }}>
                                <div className="col-sm-12" style={{ paddingTop: "6px", marginBottom: "15px" }}>
                                    <TagsInput
                                        value={this.state.postHashtags}
                                        onChange={this.handleHashtagsChange}
                                        inputProps={this.inputProps()}
                                    />
                                </div>
                                <div className="col-sm-2">
                                    <input
                                        type="checkbox"
                                        className="form-control form-control-lg"
                                        checked={this.state.memorablePost}
                                        onChange={this.memorablePostChange}
                                        name="memorablePost"
                                    />
                                </div>
                                <div className="col-sm-10" style={{ paddingTop: "6px" }}>
                                    <h4>Was today a memorable Day ?</h4>
                                </div>
                                <div className="row mood-section">
                                    <span>
                                        <input
                                            type="checkbox"
                                            className="form-control form-control-lg"
                                            checked={this.state.postMood.angry}
                                            onChange={this.postMoodChange}
                                            name="mood-angry"
                                            id="edited-angry"
                                        />
                                        <label htmlFor="aedited-angry" className="emoji">
                                            <span role="img" aria-label="angry">
                                                😠😡
                                            </span>
                                        </label>
                                    </span>
                                    <span>
                                        <input
                                            type="checkbox"
                                            className="form-control form-control-lg"
                                            checked={this.state.postMood.blessed}
                                            onChange={this.postMoodChange}
                                            name="mood-blessed"
                                            id="edited-blessed"
                                        />
                                        <label htmlFor="edited-blessed" className="emoji">
                                            <span role="img" aria-label="blessed">
                                                😇🛕
                                            </span>
                                        </label>
                                    </span>
                                    <span>
                                        <input
                                            type="checkbox"
                                            className="form-control form-control-lg"
                                            checked={this.state.postMood.bored}
                                            onChange={this.postMoodChange}
                                            name="mood-bored"
                                            id="edited-bored"
                                        />
                                        <label htmlFor="edited-bored" className="emoji">
                                            <span role="img" aria-label="bored">
                                                🥱💤
                                            </span>
                                        </label>
                                    </span>
                                    <span>
                                        <input
                                            type="checkbox"
                                            className="form-control form-control-lg"
                                            checked={this.state.postMood.calm}
                                            onChange={this.postMoodChange}
                                            name="mood-calm"
                                            id="edited-calm"
                                        />
                                        <label htmlFor="edited-calm" className="emoji">
                                            <span role="img" aria-label="calm">
                                                😌🧘🏼‍♂️
                                            </span>
                                        </label>
                                    </span>
                                    <span>
                                        <input
                                            type="checkbox"
                                            className="form-control form-control-lg"
                                            checked={this.state.postMood.crying}
                                            onChange={this.postMoodChange}
                                            name="mood-crying"
                                            id="edited-crying"
                                        />
                                        <label htmlFor="edited-crying" className="emoji">
                                            <span role="img" aria-label="crying">
                                                😢😭
                                            </span>
                                        </label>
                                    </span>
                                    <span>
                                        <input
                                            type="checkbox"
                                            className="form-control form-control-lg"
                                            checked={this.state.postMood.funny}
                                            onChange={this.postMoodChange}
                                            name="mood-funny"
                                            id="edited-funny"
                                        />
                                        <label htmlFor="edited-funny" className="emoji">
                                            <span role="img" aria-label="funny">
                                                🥳🤩
                                            </span>
                                        </label>
                                    </span>
                                    <span>
                                        <input
                                            type="checkbox"
                                            className="form-control form-control-lg"
                                            checked={this.state.postMood.happy}
                                            onChange={this.postMoodChange}
                                            name="mood-happy"
                                            id="edited-happy"
                                        />
                                        <label htmlFor="edited-happy" className="emoji">
                                            <span role="img" aria-label="happy">
                                                😀🙂
                                            </span>
                                        </label>
                                    </span>
                                    <span>
                                        <input
                                            type="checkbox"
                                            className="form-control form-control-lg"
                                            checked={this.state.postMood.love}
                                            onChange={this.postMoodChange}
                                            name="mood-love"
                                            id="edited-love"
                                        />
                                        <label htmlFor="edited-love" className="emoji">
                                            <span role="img" aria-label="love">
                                                😍❤️
                                            </span>
                                        </label>
                                    </span>
                                    <span>
                                        <input
                                            type="checkbox"
                                            className="form-control form-control-lg"
                                            checked={this.state.postMood.sad}
                                            onChange={this.postMoodChange}
                                            name="mood-sad"
                                            id="edited-sad"
                                        />
                                        <label htmlFor="edited-sad" className="emoji">
                                            <span role="img" aria-label="sad">
                                                😞😟
                                            </span>
                                        </label>
                                    </span>
                                    <span>
                                        <input
                                            type="checkbox"
                                            className="form-control form-control-lg"
                                            checked={this.state.postMood.tired}
                                            onChange={this.postMoodChange}
                                            name="mood-tired"
                                            id="edited-tired"
                                        />
                                        <label htmlFor="edited-tired" className="emoji">
                                            <span role="img" aria-label="tired">
                                                🤒🩺
                                            </span>
                                        </label>
                                    </span>
                                </div>
                            </div>
                        </form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {this.state.postHeader && this.state.postContent && (
                        <button type="submit" className="btn save-btn" onClick={this.onSubmit}>
                            Save
                        </button>
                    )}
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
