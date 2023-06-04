import { Link } from 'react-router-dom';

import DeleteModal from '../DeleteSpotModal/DeleteFormModal';
const ManageSpotTile = ({ spot }) => {

    return (
        <div id='manageSpotContainer'>
        <Link to={`/spots/${spot.id}`} className="spotLink">
            <div title={spot.name} className="spotTile">
                <div>
                        <img 
                            className="manageSpotImage" 
                            alt={spot.name} 
                            src="https://a0.muscache.com/im/pictures/0a73520d-5132-4423-8625-a1c17364dee2.jpg?im_w=720" 
                            /> 
                </div>
                <div className='spotInfo'>
                    <p className='city'>{spot.city}, {spot.state}</p>
               
                   <p className='rating'><i className="fa-solid fa-star"></i>{spot.avgRating || "New"}</p> 
               
                 </div>
                    <p className='price'>${spot.price} night</p>
                    </div>
                    </Link>
                    <div className='editButtons'>
                        <div>
                           <a href={`/spots/${spot.id}/edit`}>
                            <button style={{cursor: "pointer"}}>Update</button>
                        </a> 
                        </div>
                        <div>
                           <DeleteModal spotId={spot.id} /> 
                        </div>
                        
                    </div>
            </div>
        
    )
}

export default ManageSpotTile;