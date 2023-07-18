import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import SpotTile from "../Spots/SpotTile/SpotTile";
import * as spotsActions from '../../store/spots';
import './LandingPage.css'

const LandingPage = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(spotsActions.loadAllSpots()).then(() => setIsLoaded(true));
    }, [dispatch]);
    const spots = useSelector(state => state.spots);
    return (
        <>
            {isLoaded &&
                (<div className="spotTiles">
                {spots && Object.values(spots).reverse().map(spot => <SpotTile key={spot.id} spot={spot}/>)}
                </div>)
            }
        </>
    );
}
export default LandingPage;