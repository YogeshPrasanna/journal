import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registeruser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
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
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        };

        this.props.registeruser(newUser, this.props.history);
        console.log(newUser);
    }

    render() {
        const { errors } = this.state;
        console.log(errors);

        return (
            <div className="register">
                <div className="auth-pages">
                    <div className="row no-gutters align-items-center">
                        <div className="col-sm">
                            <div className="landing">
                                <div className="dark-overlay landing-inner text-light">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-12 text-center">
                                                <h1 className="display-3 mb-4">J O U R N A L</h1>
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
                        <div className="col-sm">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Sign Up</h1>
                                <p className="lead text-center">Create your Journal account</p>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <TextFieldGroup
                                        type="text"
                                        error={errors.name}
                                        placeholder="Name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        name="name"
                                    />
                                    <small className="form-text text-muted">
                                        This site uses Gravatar so if you want a profile image, use a Gravatar email
                                    </small>
                                    <TextFieldGroup
                                        type="email"
                                        error={errors.email}
                                        placeholder="Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />

                                    <TextFieldGroup
                                        type="password"
                                        error={errors.password}
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    <TextFieldGroup
                                        type="password"
                                        error={errors.password2}
                                        placeholder="Confirm Password"
                                        name="password2"
                                        value={this.state.password2}
                                        onChange={this.onChange}
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

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { registeruser })(withRouter(Register));
