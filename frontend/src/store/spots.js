import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = 'spots/loadAllSpots';
const CREATE_SPOT = 'spots/createSpot';
const DELETE_SPOT = 'spots/deleteSpot';
const LOAD_SPOT_DETAILS = 'spots/loadSpotDetails';

export const loadAllSpotsAction = (spots) => {
    return {
        type: LOAD_ALL_SPOTS,
        spots
    };
};
export const loadSpotDetailsAction = (spot) => {
    return {
        type: LOAD_SPOT_DETAILS,
        spot
    };
};
export const createSpotAction = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    };
};
export const deleteSpotAction = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    };
};

export const loadAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    const spots = await response.json();
    dispatch(loadAllSpotsAction(spots.Spots));
    return spots;
};
export const createSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot)
    });
    const newSpot = await response.json();
    if (response.ok) {
        dispatch(createSpotAction(newSpot));
        return newSpot;
    };
};
export const createSpotImage = (url, preview, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        body: JSON.stringify({url, preview})
    });
    const image = response.json();
    if (response.ok) {
        return image;
    }
}
export const deleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteSpotAction(spotId))
    };
};
export const loadSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const spot = await response.json();
    if (response.ok) {
        dispatch(loadSpotDetailsAction(spot));
        return spot;
    };
};

const spotsReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case LOAD_ALL_SPOTS:
            action.spots.forEach(spot => newState[spot.id] = spot);
            return newState;
        case CREATE_SPOT:
            newState[action.spot.id] = action.spot;
            return newState;
        case DELETE_SPOT:
            delete newState[action.spotId]
            return newState;
        case LOAD_SPOT_DETAILS:
            newState[action.spot.id].owner = action.spot.Owner;
            newState[action.spot.id].images = {};
            action.spot.SpotImages.forEach(image => newState[action.spot.id].images[image.id] = image);
            return newState;
        default:
            return newState;
    };
};

export default spotsReducer;