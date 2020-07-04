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
        this.postMoodChange = this.postMoodChange.bind(this);
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

    postMoodChange(e) {
        let name = e.target.name.split("-")[1];
        let isChecked = e.target.checked;
        this.setState((prevState) => {
            let postMood = Object.assign({}, prevState.postMood); // creating copy of state variable jasper
            postMood[name] = isChecked; // update the name property, assign a new value
            return { postMood }; // return new object jasper object
        });
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
                            <div className="col-sm-12">
                                <input
                                    type="checkbox"
                                    className="form-control form-control-lg"
                                    checked={this.state.memorablePost}
                                    onChange={this.memorablePostChange}
                                    name="memorablePost"
                                    style={{ display: "inline", width: "45px" }}
                                />
                                <h4 className="memorablePostLabel">Was today a memorable Day ?</h4>
                            </div>
                            {/* <div className="col-sm-10" style={{ paddingTop: "6px" }}>
                                
                            </div> */}
                        </div>
                    </div>
                    <div className="col-sm-8 create-post-right-section">
                        <CKEditor
                            editor={ClassicEditor}
                            data={this.state.postContent}
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
                        <div className="row mood-section">
                            <span>
                                <input
                                    type="checkbox"
                                    className="form-control form-control-lg"
                                    checked={this.state.postMood.angry}
                                    onChange={this.postMoodChange}
                                    name="mood-angry"
                                    id="angry"
                                />
                                <label htmlFor="angry" className="emoji">
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
                                    id="blessed"
                                />
                                <label htmlFor="blessed" className="emoji">
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
                                    id="bored"
                                />
                                <label htmlFor="bored" className="emoji">
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
                                    id="calm"
                                />
                                <label htmlFor="calm" className="emoji">
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
                                    id="crying"
                                />
                                <label htmlFor="crying" className="emoji">
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
                                    id="funny"
                                />
                                <label htmlFor="funny" className="emoji">
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
                                    id="happy"
                                />
                                <label htmlFor="happy" className="emoji">
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
                                    id="love"
                                />
                                <label htmlFor="love" className="emoji">
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
                                    id="sad"
                                />
                                <label htmlFor="sad" className="emoji">
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
                                    id="tired"
                                />
                                <label htmlFor="tired" className="emoji">
                                    <span role="img" aria-label="tired">
                                        🤒🩺
                                    </span>
                                </label>
                            </span>
                        </div>

                        {this.state.postHeader && this.state.postContent && (
                            <button value="submit" className="btn save-btn" onClick={this.onSubmit}>
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
