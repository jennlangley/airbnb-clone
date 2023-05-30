
import './SpotTile.css'
const SpotTile = ({ spot }) => {
    return (
        <>  
            <div className="spotInfo">
                <img className="spotImage" alt={spot.name} src="https://a0.muscache.com/im/pictures/0a73520d-5132-4423-8625-a1c17364dee2.jpg?im_w=720" />
                <p>{spot.city}, {spot.state}</p>
                <p>{spot.price} night</p>
                <i class="fa-solid fa-star"></i>
                <p>{spot.avgRating || "New"}</p>
            </div>
        </>
        
    )
}

export default SpotTile;