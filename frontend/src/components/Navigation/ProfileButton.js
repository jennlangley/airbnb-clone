import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
        
        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            };
        };
        
        document.addEventListener('click', closeMenu);
        
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logoutUser());
        history.push('/')
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    return (
        <>
            <div onClick={openMenu} className='profileButton'>
                <i className="fa-solid fa-bars menuIcons"></i>
                <i className="fa-solid fa-circle-user menuIcons" />
            </div>
            {user && 
                <ul className={ulClassName} ref={ulRef}>
                    <li>Hello, {user.firstName}</li>
                    <li style={{borderBottom: "1px solid black"}}>{user.email}</li>
                    <li style={{borderBottom: "1px solid black"}} onClick={e => setShowMenu(false)}>
                        <Link to="/spots/current">
                            Manage Spots
                        </Link>
                    </li>
                    <li>
                        <span className="logoutButton" onClick={logout}>Log Out</span>
                    </li>
            </ul>}
            {!user && 
            <div id='buttonDropdown' className={ulClassName} onClick={e => setShowMenu(false)} ref={ulRef}>
                <LoginFormModal />
                <SignupFormModal />
            </div>
            }
            
        </>
    );
};

export default ProfileButton;