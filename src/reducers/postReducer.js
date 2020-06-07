import { GET_CURRENT_USER_POSTS, POSTS_LOADING, CREATE_POST } from "../actions/types";

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
        case CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };
        default:
            return state;
    }
}
