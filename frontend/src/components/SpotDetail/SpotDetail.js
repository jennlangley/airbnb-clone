import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import './SpotDetail.css';
import * as spotsActions from '../../store/spots';
const SpotDetail = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsloaded] = useState(false);
    const { spotId } = useParams();
    
    useEffect(() => {
        dispatch(spotsActions.loadSpotDetails(+spotId)).then(() => setIsloaded(true));
    }, [spotId, dispatch]);
    
    const spot = useSelector(state => state.spots[spotId]);
    const reserveAlert = (e) => {
        alert("Feature coming soon!")
    }
    console.log(spot)
    return (
        isLoaded && (
            <div className='spotDetailContainer'>
                <h1>{spot.name}</h1>
                <h3>{spot.city}, {spot.state}, {spot.country}</h3>
                <div className='spotImages'>
                    {spot.images && Object.values(spot.images).map(image => <img className="detailImage" key={image.id} alt={`${spot.name} ${image.id}`} src="https://a0.muscache.com/im/pictures/0a73520d-5132-4423-8625-a1c17364dee2.jpg?im_w=720"></img>)}
                </div>
                <div id='spotDescription'>
                    <h2>Hosted by {spot.owner.firstName} {spot.owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                
               <div id='spotPriceInfo'>
                    <div id='spotPrice'>
                    <h1>${spot.price} night</h1>
                    <p><i className="fa-solid fa-star"></i>{spot.avgRating || "New"} <span>• {spot.numReviews || 0 } reviews</span></p>
                    </div>
                    <div id='reserveContainer'>
                        <button id='reserveButton' onClick={reserveAlert}>Reserve</button>
                    </div>
                    
                </div>
            </div>  
        )
        
    )
}

export default SpotDetail;