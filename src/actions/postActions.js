import axios from "axios";
import { GET_CURRENT_USER_POSTS, POSTS_LOADING, CREATE_POST } from "./types";

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

// Create a new Post
export const createPost = (postData) => (dispatch) => {
    axios
        .post("/api/posts", postData)
        .then((res) => {
            console.log(res);
            dispatch({
                type: CREATE_POST,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: CREATE_POST,
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
