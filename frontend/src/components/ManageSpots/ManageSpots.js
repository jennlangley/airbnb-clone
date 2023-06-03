import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ManageSpots.css';

const ManageSpots = () => {
    const user = useSelector(state => state.session.user);
    const userId = user.id
    const spots = useSelector(state => state.spots)
    const userSpots = Object.values(spots).filter(spot => spot.ownerId === userId)
    return (
    <div className='manageSpotsContainer'>
        <h1>Manage Your Spots</h1>
        <Link style={{textDecoration: 'none'}} to='/spots/new'>
            <div id='spotButton'>
                Create a New Spot
            </div>
        </Link>
        {userSpots && userSpots.map(spot => <div>{spot.ownerId}</div>)}
    </div>
    ) 
    }
export default ManageSpots;