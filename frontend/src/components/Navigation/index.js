import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from '../LoginFormModal';
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
            <div>
                <LoginFormModal />
                <NavLink to='/signup'><button>Signup</button></NavLink>
            </div>
        );
    }
    return (
        <>
            <ul className='navigationList'>
                <li className='navigationLinks'>
                    <NavLink exact to='/'><i class="fa-solid fa-house"></i></NavLink>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
        </>
        
    );
}

export default Navigation;