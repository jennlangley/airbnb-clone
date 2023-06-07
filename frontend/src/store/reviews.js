import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/loadSpotReviews';
const DELETE_REVIEW = 'reviews/deleteReview';
const CREATE_REVIEW = 'reviews/createReview';

export const loadSpotReviewsAction = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    };
};
export const deleteReviewAction = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    };
};
export const createReviewAction = (review) => {
    return {
        type: CREATE_REVIEW,
        review
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
};
export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    const data = response.json();
    dispatch(deleteReviewAction(reviewId));
};
export const createReview = (review, spotId) => async (dispatch) => {
    console.log(spotId)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    })
    const newReview = await response.json();
    dispatch(createReview(newReview));
    return newReview; 
};

const reviewsReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD_REVIEWS:
            newState = {};
            action.reviews.forEach(review => newState[review.id] = review);
            return newState;
        case CREATE_REVIEW:
            newState[action.review.id] = action.review;
            return newState;
        case DELETE_REVIEW:
            delete newState[action.reviewId];
            return newState;
        default:
            return newState;
    };
};

export default reviewsReducer;