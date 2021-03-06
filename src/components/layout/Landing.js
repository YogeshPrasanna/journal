import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Footer from "./Footer";

class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/home");
        }
    }

    render() {
        return (
            <div className="landing landing-mob">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className={window.screen.width > 641 ? "display-3 mb-4" : "display-4 md-4"}>
                                    J O U R N A L
                                </h1>
                                <p className="lead">
                                    {" "}
                                    This is your life - Lets keep a track of it and lets make it memorable day by day
                                </p>
                                <hr />
                                <Link to="/register" className="btn btn-lg btn-info mr-2">
                                    Sign Up
                                </Link>
                                <Link to="/login" className="btn btn-lg btn-light">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
