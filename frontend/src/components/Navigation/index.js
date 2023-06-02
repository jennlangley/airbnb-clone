import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import './Navigation.css';
const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
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
                        <NavLink exact to='/'><i class="fa-solid fa-house"></i></NavLink>
                    </div>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
        </div>
        
    );
}

export default Navigation;