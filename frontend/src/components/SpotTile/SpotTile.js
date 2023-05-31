import { Link } from 'react-router-dom';
import './SpotTile.css'
const SpotTile = ({ spot }) => {
    return (
        <>  
            <div className="spotInfo">
                <Link to={`/spots/${spot.id}`}>
                    <img 
                        className="spotImage" 
                        alt={spot.name} 
                        src="https://a0.muscache.com/im/pictures/0a73520d-5132-4423-8625-a1c17364dee2.jpg?im_w=720" 
                        />
                </Link>
                <p>{spot.city}, {spot.state}</p>
                <p><i class="fa-solid fa-star"></i>{spot.avgRating || "New"}</p>
                <p>{spot.price} night</p>
            </div>
        </>
        
    )
}

export default SpotTile;