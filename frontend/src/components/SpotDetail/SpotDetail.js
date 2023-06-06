import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import './SpotDetail.css';
import * as spotsActions from '../../store/spots';
import * as reviewsActions from '../../store/reviews';
import Reviews from '../Reviews/Reviews';
import CreateReviewModal from '../CreateReviewModal/CreateReviewModal';
const SpotDetail = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsloaded] = useState(false);
    const { spotId } = useParams();
    let imageNumber = 1;
    useEffect(() => {
        dispatch(spotsActions.loadSpotDetails(+spotId)).then(
        dispatch(reviewsActions.loadSpotReviews(+spotId)))
        .then(() => setIsloaded(true));
    }, [spotId, dispatch]);
    
    const spot = useSelector(state => state.spots[spotId]);
    const reviews = useSelector(state => state.reviews)
    const reserveAlert = (e) => {
        alert("Feature coming soon!")
    }
    return (
        isLoaded && (
            <div className='spotDetailContainer'>
                <h1>{spot.name}</h1>
                <h3>{spot.city}, {spot.state}, {spot.country}</h3>
                <div className='spotImages'>
                    {spot.images && Object.values(spot.images).map(image => <img id={`detailImage${imageNumber++}`} className="detailImage" key={image.id} alt={`${spot.name} ${image.id}`} src="https://a0.muscache.com/im/pictures/0a73520d-5132-4423-8625-a1c17364dee2.jpg?im_w=720"></img>)}
                </div>
                <div id='spotDescription'>
                    <div id='hostedByAndDescription'>
                        <h2>Hosted by {spot.owner.firstName} {spot.owner.lastName}</h2>
                        <div id='descriptionPrice'>
                            <p>{spot.description}</p>
                        </div>
                    </div>
                    
                    <div id='spotPriceInfo'>
                        <div id='spotPrice'>
                        <h1 id='priceOnly'>${(Math.round(spot.price*100)/100).toFixed(2)} night</h1>
                        <p><i className="fa-solid fa-star"></i> {spot.avgRating || " New"} <span> { spot.numReviews? ("• " + spot.numReviews + " reviews") : ""}</span></p>
                        </div>
                        <div id='reserveContainer'>
                            <button id='reserveButton' onClick={reserveAlert}>Reserve</button>
                        </div>
                    </div>
                </div>
                
                <div id='reviewContainer'>
                    <div id='reviewOverview'>
                        <p><i className="fa-solid fa-star"></i> {spot.avgRating || " New"} <span> {spot.numReviews? (" • " + spot.numReviews + " reviews") : ""}</span></p>
                    </div>
                    <CreateReviewModal spotId={spotId} />
                    <p>Be the first to post your review!</p>
                    <div id='allReviews'>
                        {reviews && Object.values(reviews).map(review => <Reviews key={review.id} review={review} />)} 
                    </div>
                </div>
            </div>  
        )
        
    )
}

export default SpotDetail;