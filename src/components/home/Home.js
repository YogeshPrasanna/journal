import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUsersPosts } from "../../actions/postActions";
import PostCards from "./PostCards";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        this.props.getCurrentUsersPosts();
    }

    render() {
        console.log(this.props.posts, this.state);

        return (
            <div className="container-fluid action-pages" style={{ padding: "15px" }}>
                <div class="card-deck">
                    {this.props.posts &&
                        this.props.posts.map((post) => {
                            return (
                                <PostCards
                                    postHeader={post.postHeader}
                                    postContent={post.postContent}
                                    tags={post.postHashtags}
                                />
                            );
                        })}
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

export default connect(mapStateToProps, { getCurrentUsersPosts })(Home);
