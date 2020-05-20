import { GET_ERRORS } from "./types";
import axios from "axios";

// Register User

export const registeruser = (userData, history) => (dispatch) => {
    axios
        .post("/signup", userData)
        .then((res) => {
            history.push("/login");
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            });
        });
};
