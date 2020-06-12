import {
    GET_CURRENT_USER_POSTS,
    POSTS_LOADING,
    CREATE_POST,
    DELETE_POST,
    EDIT_POST,
    SHOW_MODAL,
} from "../actions/types";

const initialState = {
    loading: false,
    showModal: false,
    editPostId: null,
    posts: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case POSTS_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_CURRENT_USER_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        case CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((el) => el._id !== action.payload),
            };
        case EDIT_POST:
            console.log(action.payload);
            return {
                ...state,
                posts: [...state.posts.filter((el) => el._id !== action.payload._id), action.payload],
            };
        case SHOW_MODAL:
            return {
                ...state,
                showModal: action.payload.shouldShowModal,
                editPostId: action.payload.postId,
            };
        default:
            return state;
    }
}
