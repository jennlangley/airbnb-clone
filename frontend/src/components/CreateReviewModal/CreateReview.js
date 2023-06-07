import { useState } from 'react';
import * as reviewsActions from '../../store/reviews';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import './CreateReview.css';

const CreateReview = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    

    const handleSubmit = async () => {
        const newReview = {review, stars};
        await dispatch(reviewsActions.createReview(newReview, spotId))
    }
    return (
        <div id='createReviewContainer'>
            <h1>How was your stay?</h1>
            <textarea
            id='reviewText'
            placeholder='Leave your review here...'
            value={review}
            onChange={e => setReview(e.target.value)}
            />
            <div className="reviewStars">
                {[...Array(5)].map((star, idx) => {  
                    idx++      
                    return (    
                    <button
                        type="button"
                        id="starsButton"
                        key={idx}
                        className={idx <= (hover || stars) ? "active" : "inactive"}
                        onClick={() => setStars(idx)}
                        onMouseEnter={() => setHover(idx)}
                        onMouseLeave={() => setHover(stars)}
                    >
                    <span className="star">
                        <i className="rating__star fas fa-star"></i>
                    </span>  
                    </button>      
                    );
                })}
            Stars
            </div>
            <button type='submit' onClick={e => handleSubmit(e)} id='submitReviewButton'>Submit Your Review</button>
        </div>
    )
}

export default CreateReview;