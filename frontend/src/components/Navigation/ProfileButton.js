import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logoutUser());
    };
    const ulClassName = 'profile-dropdown';
    return (
        <>
            <button>
                <i class="fa-regular fa-user" />
            </button>
            <ul className='profile-dropdown'>
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