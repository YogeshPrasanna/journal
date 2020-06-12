import axios from "axios";
import { GET_CURRENT_USER_POSTS, POSTS_LOADING, CREATE_POST, DELETE_POST, EDIT_POST, SHOW_MODAL } from "./types";

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

// edit a post
export const editPost = (id, updatedData) => (dispatch) => {
    axios
        .put(`/api/posts/${id}`, updatedData)
        .then((res) => {
            dispatch({
                type: EDIT_POST,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: EDIT_POST,
                payload: {},
            });
        });
};

// delete a post
export const deletePost = (id) => (dispatch) => {
    axios
        .delete(`/api/posts/${id}`)
        .then((res) => {
            console.log(res);
            dispatch({
                type: DELETE_POST,
                payload: id,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: DELETE_POST,
                payload: {},
            });
        });
};

export const shouldShowModal = (shouldShowModal, postId) => (dispatch) => {
    return dispatch({
        type: SHOW_MODAL,
        payload: { shouldShowModal, postId },
    });
};

// posts Loading
export const setPostsLoading = () => {
    return {
        type: POSTS_LOADING,
    };
};
