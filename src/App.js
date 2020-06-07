import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/home/Home";

import "./App.css";

if (localStorage.jwtToken) {
    // set the auth token header auth
    setAuthToken(localStorage.jwtToken);
    // decode token and get user info and export default
    const decoded = jwt_decode(localStorage.jwtToken);
    // set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = "/login";
    }
}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Navbar />
                    <Route exact path="/" component={Landing} />
                    <div className="container-fluid" style={{ padding: 0 }}>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/home" component={Home} />
                    </div>
                    <Footer />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
