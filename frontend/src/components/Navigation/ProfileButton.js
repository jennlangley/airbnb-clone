import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from '../../store/session';

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    const buttonClass = "buttonDropdown profile-dropdown" + (showMenu ? "" : " hidden");
    return (
        <>
            <div onClick={openMenu} className='profileButton'>
                <i class="fa-solid fa-bars menuIcons"></i>
                <i className="fa-solid fa-circle-user menuIcons" />
            </div>
            {user && 
                <ul className={ulClassName} ref={ulRef}>
                    <li>Hello, {user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <span className="logoutButton" onClick={logout}>Log Out</span>
                    </li>
            </ul>}
            {!user && 
            <div className={`${buttonClass}`} onClick={openMenu} ref={ulRef}>
                <LoginFormModal />
                <SignupFormModal />
            </div>
            }
            
        </>
    );
};

export default ProfileButton;