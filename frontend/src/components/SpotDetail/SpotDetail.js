import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
const SpotDetail = () => {
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots[+spotId])

    return (
        <>
            <h1>{spot.name}</h1>
            <h3>{spot.city}, {spot.state}, {spot.country}</h3>
        </>
    )
}

export default SpotDetail;