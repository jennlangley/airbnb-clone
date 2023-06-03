import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import './Navigation.css';
const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <Link id='newSpot' to='/spots/new'>Create a New Spot</Link>
                <ProfileButton user={sessionUser} />
            </>
            
        );
    } else {
        sessionLinks = (
            <ProfileButton />
        );
    }
    return (
        <div className='navigationContainer'>
            <ul className='navigationList'>
                <li className='navigationLinks'>
                    <div className='homeButton'>
                    
                        <Link to='/'>
                        <img id='siteLogo' alt="Site logo" src={require("../../images/wherebnb.png")} />
                        </Link>
                    </div>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
        </div>
        
    );
}

export default Navigation;