import { Link } from 'react-router-dom';
import './SpotTile.css'
const SpotTile = ({ spot }) => {
    return (
        <Link to={`/spots/${spot.id}`} className="spotLink">
            <div className="spotTile tooltip landingSpotTile" data-text={spot.name}>
                <div>
                    <img 
                        className="spotImage" 
                        alt={spot.name} 
                        src={spot.previewImage} 
                        /> 
                </div>
                <div className='spotInfo'>
                    <p className='city'>{spot.city}, {spot.state}</p>
               
                   <p className='rating'><i className="fa-solid fa-star"></i>{spot.avgRating || "New"}</p> 
               
                 </div>
                <p className='price'>${(Math.round(spot.price*100)/100).toFixed(2)} night</p>
                
            </div>
        </Link>
        
    )
}

export default SpotTile;