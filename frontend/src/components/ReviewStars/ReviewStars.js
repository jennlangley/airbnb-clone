import { useState } from "react";
import './ReviewStars.css';
const ReviewStars = () => {
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="reviewStars">
      {[...Array(5)].map((star, idx) => {  
        idx++      
        return (    
          <button
            type="button"
            key={idx}
            className={idx <= (hover || stars) ? "active" : "inactive"}
            onClick={() => setStars(idx)}
            onMouseEnter={() => setHover(idx)}
            onMouseLeave={() => setHover(stars)}
          >
          <span className="star">
            <i className="rating__star fas fa-star"></i>
          </span>  
        </button>      
        );
      })}
      Stars
    </div>
  );
};
export default ReviewStars;