import { useSelector } from 'react-redux';
import './Reviews.css';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
const Reviews = ({ review, spotId }) => {
 
    const dateCreated = new Date(review.createdAt);
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    const user = useSelector(state => state.session.user);
    const showDelete = review.userId === user.id;

    return (
        <div id="singleReview">
            <p>{review.User.firstName}</p>
            <p>{monthNames[dateCreated.getMonth()]} {dateCreated.getFullYear()}</p>
            <p>{review.review}</p>
            {showDelete && <DeleteReviewModal reviewId={review.id} spotId={spotId} />}
        </div>
    )
}
export default Reviews;