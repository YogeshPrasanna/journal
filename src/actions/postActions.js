import axios from "axios";
import { GET_CURRENT_USER_POSTS, POSTS_LOADING } from "./types";

// Get Current Users POSTS_LOADING
export const getCurrentUsersPosts = () => (dispatch) => {
    dispatch(setPostsLoading());
    axios
        .get("/api/posts")
        .then((res) => {
            dispatch({
                type: GET_CURRENT_USER_POSTS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_CURRENT_USER_POSTS,
                payload: {},
            });
        });
};

// posts Loading
export const setPostsLoading = () => {
    return {
        type: POSTS_LOADING,
    };
};
