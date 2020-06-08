import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentUsersPosts } from "../../actions/postActions";
import { deletePost } from "../../actions/postActions";

class PostCards extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
        };
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentUsersPosts();
    }

    deletePost(postId) {
        console.log(postId);
        this.props.deletePost(postId);
    }

    render() {
        return this.props.posts.map((post) => {
            const date = new Date(post.postDate);
            const dateTimeFormat = new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "2-digit" });
            const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date);

            return (
                <div className="card bg-light" style={{ minWidth: "15rem" }}>
                    <div className="card-body custom-card">
                        <h4 className="custom-card-date">
                            {`${day} ${month} ${year}`}

                            <span
                                onClick={() => this.deletePost(post._id)}
                                style={{ float: "right", cursor: "pointer" }}
                                title="Delete"
                            >
                                <svg
                                    class="bi bi-trash-fill"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                                    />
                                </svg>
                            </span>
                        </h4>
                        <h5 className="card-title custom-card-header">{post.postHeader}</h5>
                        <p className="card-text custom-card-content">{post.postContent}</p>
                        <div className="custom-card-tags">
                            {post.postHashtags.map((elem) => {
                                return (
                                    <span
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
        });
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    posts: state.post.posts,
});

export default connect(mapStateToProps, { getCurrentUsersPosts, deletePost })(PostCards);
