import { useSelector } from "react-redux";
import SpotTile from "../SpotTile/SpotTile";
import './LandingPage.css'


const LandingPage = () => {
    const spots = useSelector(state => state.spots)
    return (
        <div class="spotTiles">
        {Object.values(spots).map(spot => <SpotTile spot={spot}/>)}
        </div>
    );
}
export default LandingPage;