import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpotTile from "../SpotTile/SpotTile";
import * as spotsActions from '../../store/spots';
import './LandingPage.css'


const LandingPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(spotsActions.loadAllSpots())
    }, [dispatch])
    const spots = useSelector(state => state.spots)
    return (
        <div class="spotTiles">
        {Object.values(spots).map(spot => <SpotTile spot={spot}/>)}
        </div>
    );
}
export default LandingPage;