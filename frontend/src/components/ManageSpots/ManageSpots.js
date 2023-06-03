import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ManageSpotTile from './ManageSpotTile';
import './ManageSpots.css';

const ManageSpots = () => {
    const user = useSelector(state => state.session.user);
    const userId = user.id
    const spots = useSelector(state => Object.values(state.spots).filter(spot => spot.ownerId === +userId))
    let newSpotButton;
    if (spots.length) {
        newSpotButton = (
            <Link id='spotButton' to='/spots/new'>Create a New Spot</Link>
        )
    } else {
        newSpotButton = (
            <></>
        )
    }
    if (spots) 
    return (
    <>  <div id='manageSpotsHeader' className='manageSpotsContainer'>
            <h1>Manage Your Spots</h1>
            {newSpotButton}
        </div>
        
        <div className='manageSpotsContainer'>
            {spots && Object.values(spots).map(spot => <ManageSpotTile key={spot.id} spot={spot} />)}
        </div>
    </>
        
    ) 
    }
export default ManageSpots;