import { Link } from 'react-router-dom';
import DeleteModal from '../../Modals/DeleteSpotModal/DeleteFormModal';
const ManageSpotTile = ({ spot }) => {

    return (
        <div id='manageSpotContainer'>
        <Link to={`/spots/${spot.id}`} className="spotLink">
            <div className="spotTile tooltip manageSpotTile" data-text={spot.name}>
                <div>
                        <img 
                            className="manageSpotImage" 
                            alt={spot.name} 
                            src={spot.previewImage} 
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
                            <button id='manageSpotButton'>Update</button>
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