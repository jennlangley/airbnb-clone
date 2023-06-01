import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import * as spotsActions from '../../store/spots';
const SpotDetail = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsloaded] = useState(false);
    const { spotId } = useParams();
    
    useEffect(() => {
        dispatch(spotsActions.loadSpotDetails(+spotId)).then(() => setIsloaded(true));
    }, [spotId, dispatch]);
    
    const spot = useSelector(state => state.spots[spotId]);

    return (
        isLoaded && (
            <>
                <h1>{spot.name}</h1>
                <h3>{spot.city}, {spot.state}, {spot.country}</h3>
                { spot.images && Object.values(spot.images).map(image => <img alt={`${spot.name} ${image.id}`} src={image.url}></img>)}
                <h2>Hosted by {spot.owner.firstName} {spot.owner.lastName}</h2>
               <p>{spot.description}</p>
               <div>
                    <h1>${spot.price} night</h1>

               </div>
            </>  
        )
        
    )
}

export default SpotDetail;