import * as reviewsActions from '../../../store/reviews';
import * as spotsActions from '../../../store/spots';
import { useDispatch } from 'react-redux';
import './DeleteReview.css';
const DeleteReview = ({ reviewId, spotId }) => {
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(reviewsActions.deleteReview(reviewId))
        return dispatch(spotsActions.loadSpotDetails(spotId))
    };
    return (
        <>
            <h1>Confirm Delete</h1>
            Are you sure you want to delete this review?
            <button id='confirmDelete' onClick={e => onSubmit(e)}>Yes (Delete Review)</button>
        </>
    )
}
export default DeleteReview;