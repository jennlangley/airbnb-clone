import { useState } from 'react';
import * as reviewsActions from '../../store/reviews';
import { useDispatch } from 'react-redux';
import '../ReviewStars/ReviewStars';
import './CreateReview.css';
import ReviewStars from '../ReviewStars/ReviewStars';
const CreateReview = () => {
    const dispatch = useDispatch();
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0);
    return (
        <div id='createReviewContainer'>
            <h1>How was your stay?</h1>
            <textarea
            id='reviewText'
            placeholder='Leave your review here...'
            value={review}
            onChange={e => setReview(e.target.value)}
            />
            <ReviewStars />
            <button id='submitReviewButton'>Submit Your Review</button>
        </div>
    )
}

export default CreateReview;