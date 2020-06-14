import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../../actions/postActions";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.

class CreatePost extends Component {
    constructor() {
        super();
        this.state = {
            postHeader: "",
            postContent: "",
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
        };

        this.postHeaderChange = this.postHeaderChange.bind(this);
        this.postContentChange = this.postContentChange.bind(this);
        this.memorablePostChange = this.memorablePostChange.bind(this);
        this.handleHashtagsChange = this.handleHashtagsChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    postHeaderChange(e) {
        this.setState({
            postHeader: e.target.value,
        });
    }

    handleHashtagsChange(postHashtags) {
        this.setState({ postHashtags });
    }

    postContentChange(e) {
        this.setState({
            postContent: e.target.value,
        });

        //console.log(this.state);
    }

    memorablePostChange(e) {
        console.log(e.target);
        this.setState({
            memorablePost: e.target.checked,
        });
        //console.log(this.state.memorablePost);
    }

    onSubmit() {
        this.props.createPost(this.state);
        this.setState({
            postHeader: "",
            postContent: "",
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
        });
    }

    inputProps() {
        return {
            placeholder: "Hashtags",
        };
    }

    render() {
        return (
            <div className="container-fluid create-post-section">
                <div className="row no-gutters">
                    <div className="col-sm-4 create-post-left-section pad15">
                        <h3 style={{ display: "inline-block" }}> Hello {this.props.auth.user.name}, &nbsp; </h3>
                        <h5 style={{ display: "inline-block" }}> Hope it was a good day </h5>
                        <hr />
                        <input
                            type="text"
                            className="form-control form-control-md"
                            placeholder="Brief description of your day... !!"
                            value={this.state.postHeader}
                            onChange={this.postHeaderChange}
                            name="postHeader"
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
                        </div>
                    </div>
                    <div className="col-sm-8 create-post-right-section">
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            config={{
                                placeholder: "Okay how good was your day !!",
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                //console.log({ event, editor, data });
                                this.setState({
                                    postContent: data,
                                });
                            }}
                        />

                        {this.state.postHeader && this.state.postContent && (
                            <button value="submit" onClick={this.onSubmit}>
                                Save
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    posts: state.post.posts,
});

export default connect(mapStateToProps, { createPost })(CreatePost);
