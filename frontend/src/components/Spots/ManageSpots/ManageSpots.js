import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import ManageSpotTile from './ManageSpotTile';
import * as spotsActions from '../../../store/spots';
import './ManageSpots.css';

const ManageSpots = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(spotsActions.loadAllSpots()).then(() => setIsLoaded(true));
    }, [dispatch]);
    const user = useSelector(state => state.session.user);
    const userId = user.id
    const spots = useSelector(state => Object.values(state.spots).filter(spot => spot.ownerId === +userId))
    
    let newSpotButton;
    if (!spots.length) {
        newSpotButton = (
            <Link id='spotButton' to='/spots/new'>Create a New Spot</Link>
        )
    } else {
        newSpotButton = (
            <></>
        )
    }
    return (
        <>  
            {isLoaded && <>
            <div id='manageSpotsHeader' className='manageSpotsContainer'>
                <h1>Manage Your Spots</h1>
                {newSpotButton}
            </div>
            <div className='manageSpotsContainer'>
                {spots && Object.values(spots).map(spot => <ManageSpotTile key={spot.id} spot={spot} />)}
            </div>
            </>}
        </>
    ) 
}
export default ManageSpots;