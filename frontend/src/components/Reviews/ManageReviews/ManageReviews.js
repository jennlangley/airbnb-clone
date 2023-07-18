import { useDispatch } from 'react-redux'
import * as reviewsActions from '../../../store/reviews'
import './ManageReviews.css'
import { useEffect, useState } from 'react';

const ManageReviews = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    let reviews;
    useEffect(() => {
        const reviews = dispatch(reviewsActions.loadUserReviews()).then(() => setIsLoaded(true))
        console.log(reviews)
    }, [dispatch])
    
    
    return (
        isLoaded &&
        <h1>Manage Reviews</h1>

    );
}

export default ManageReviews;