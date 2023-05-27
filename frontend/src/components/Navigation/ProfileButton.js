import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';
const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logoutUser());
    };
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    return (
        <>
            <button onClick={() => setShowMenu(!showMenu)}>
                <i className="fa-regular fa-user" />
            </button>
            <ul className={ulClassName}>
                <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                <li>
                    <button onClick={logout}>Log Out</button>
                </li>
            </ul>
        </>
    );
};

export default ProfileButton;