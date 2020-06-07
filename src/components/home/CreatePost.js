import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../../actions/postActions";

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
        this.onSubmit = this.onSubmit.bind(this);
    }

    postHeaderChange(e) {
        this.setState({
            postHeader: e.target.value,
        });
    }

    postContentChange(e) {
        this.setState({
            postContent: e.target.value,
        });

        console.log(this.state);
    }

    memorablePostChange(e) {
        console.log(e.target);
        this.setState({
            memorablePost: e.target.checked,
        });
        console.log(this.state.memorablePost);
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

    render() {
        return (
            <div className="container-fluid create-post-section">
                <div className="row no-gutters">
                    <div className="col-sm-4 create-post-left-section pad15">
                        <h3> Hello {this.props.auth.user.name} !!</h3>
                        <h5> Hope it was a good day </h5>
                        <hr />
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Brief description of your day... !!"
                            value={this.state.postHeader}
                            onChange={this.postHeaderChange}
                            name="postHeader"
                        />

                        <div class="row" style={{ padding: "15px 0" }}>
                            <div className="col-sm-2">
                                <input
                                    type="checkbox"
                                    className="form-control form-control-lg"
                                    checked={this.state.memorablePost}
                                    onClick={this.memorablePostChange}
                                    name="memorablePost"
                                />
                            </div>
                            <div className="col-sm-10" style={{ paddingTop: "6px" }}>
                                <h4>Was today a memorable Day ?</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8 create-post-right-section pad15">
                        <textarea
                            className="form-control form-control-lg"
                            placeholder="Okay how good was your day !!"
                            onChange={this.postContentChange}
                            value={this.state.postContent}
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
