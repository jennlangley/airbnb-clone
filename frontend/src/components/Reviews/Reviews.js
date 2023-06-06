// import { useDispatch } from "react-redux";

const Reviews = ({ review }) => {
    
    return (
        <div id="singleReview">
            <p>{review.User.firstName}</p>
            <p>{review.review}</p>
        </div>
    )
}
export default Reviews;