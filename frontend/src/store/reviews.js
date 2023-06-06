import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/loadSpotReviews';

export const loadSpotReviewsAction = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    };
};


export const loadSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const reviews = await response.json();
    dispatch(loadSpotReviewsAction(reviews.Reviews));
    return reviews;
};
export const loadUserReviews = () => async (dispatch) => {
    const response = await csrfFetch('/api/reviews/current');
    const reviews = await response.json();
    return reviews.Reviews;
}

const reviewsReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD_REVIEWS:
            newState = {};
            action.reviews.forEach(review => newState[review.id] = review);
            return newState;
        default:
            return newState;
    };
};

export default reviewsReducer;