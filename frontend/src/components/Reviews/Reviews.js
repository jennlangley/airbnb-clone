import { useSelector } from 'react-redux';
import './Reviews.css';
const Reviews = ({ review }) => {
    const dateCreated = new Date(review.createdAt)
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
    const user = useSelector(state => state.session.user);
    console.log(user)
    const showDelete = review.userId === user.id
    console.log(showDelete)
    return (
        <div id="singleReview">
            <p>{review.User.firstName}</p>
            <p>{monthNames[dateCreated.getMonth()]} {dateCreated.getFullYear()}</p>
            <p>{review.review}</p>
            {showDelete && <button>Delete</button>}
        </div>
    )
}
export default Reviews;