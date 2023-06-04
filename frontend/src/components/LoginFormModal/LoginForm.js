import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import '../LoginFormPage/LoginForm.css';
function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.setSession({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };
  const demoLogin = (e) => {
    return dispatch(sessionActions.setSession({
        credential: "Demo-lition",
        password: "password"
    }))
}
  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit} className="loginForm">
      <h1>Log In</h1>
      {errors && 
        <ul id="loginErrors">
          {Object.values(errors).map((error, idx) => (<li className="errors" key={idx}>{error}</li>))}
        </ul>
      }
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="Username or Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        <button type="submit"
          disabled={(credential.length < 4 || password.length < 6)}
          >
          Log In</button>
      </form>
      <button id="demoUser" onClick={demoLogin}>Demo User</button>  
    </div>
  );
}
export default LoginForm;