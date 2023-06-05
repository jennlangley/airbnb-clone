import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true);
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            const user = {
            username, firstName, lastName, email, password
            };
            return dispatch(sessionActions.signupUser(user))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                };
            });
        };
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };
    useEffect(() => {
      let disabled = true;
      if ((firstName && lastName && email)) {
        disabled = false;
      };
      if (username.length < 4) disabled = true;
      if (password.length < 6 || confirmPassword !== password) disabled = true;
      setDisabled(disabled);
    }, [username, firstName, lastName, email, password, confirmPassword])
    if (sessionUser) return <Redirect to='/' />;
    return (
        <div className="signupContainer">
          <h1 id="signUp">Sign Up</h1>
          {errors && 
            <ul id="signupErrors">
              {Object.values(errors).map((error, idx) => (<li className="errors" key={idx}>{error}</li>))}
            </ul>
          }
          
          <form onSubmit={handleSubmit} className="signupForm">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            <button disabled={disabled} id="signupButton" type="submit">Sign Up</button>
          </form>
        </div>
    )
};

export default SignupFormPage;