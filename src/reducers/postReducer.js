import { GET_CURRENT_USER_POSTS, POSTS_LOADING } from "../actions/types";

const initialState = {
    loading: false,
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
        default:
            return state;
    }
}
