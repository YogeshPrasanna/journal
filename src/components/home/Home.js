import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentUsersPosts } from "../../actions/postActions";
import PostCards from "./PostCards";
import CreatePost from "./CreatePost";

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
        return (
            <div className="container-fluid action-pages">
                <CreatePost user={this.props.user} />
                <div class="card-deck">
                    <PostCards />
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
