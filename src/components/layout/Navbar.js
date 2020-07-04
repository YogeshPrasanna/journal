import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/home">
                        Home
                    </Link>
                </li> */}
                <li className="nav-item">
                    <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link">
                        <img
                            src={user.avatar}
                            alt="not found"
                            className="rounded-circle"
                            style={{ width: "25px", marginRight: "5px" }}
                            title="You must have a gravatar connected to youe email to display image"
                        />
                        Logout
                    </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-cust ">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        J O U R N A L
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-list"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                            />
                        </svg>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
