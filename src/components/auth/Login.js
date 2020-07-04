import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/home");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/home");
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };

        this.props.loginUser(userData);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="login">
                <div className="auth-pages">
                    <div className="row no-gutters align-items-center">
                        <div className="col-sm-6">
                            <div className="landing">
                                <div className="dark-overlay landing-inner text-light">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-12 text-center">
                                                <h1
                                                    className={
                                                        window.screen.width > 641 ? "display-3 mb-4" : "display-4 md-4"
                                                    }
                                                >
                                                    J O U R N A L
                                                </h1>
                                                <p className="lead">
                                                    {" "}
                                                    This is your life - Lets keep a track of it and lets make it
                                                    memorable day by day
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Log In</h1>
                                <p className="lead text-center">Sign in to your Journal account</p>
                                <form onSubmit={this.onSubmit}>
                                    <TextFieldGroup
                                        type="email"
                                        error={errors.email}
                                        placeholder="Email Address"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        name="email"
                                    />
                                    <TextFieldGroup
                                        type="password"
                                        error={errors.password}
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        name="password"
                                    />
                                    <input type="submit" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
