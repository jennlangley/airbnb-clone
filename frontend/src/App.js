import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotForm from "./components/SpotForm/SpotForm";
import SpotDetail from "./components/SpotDetail/SpotDetail";
import ManageSpots from "./components/ManageSpots/ManageSpots";
import * as sessionActions from './store/session';
import * as spotsActions from './store/spots';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreSession())
    dispatch(spotsActions.loadAllSpots()).then(() => setIsLoaded(true));
  }, [dispatch]);
  
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path='/spots/new'>
            <SpotForm />
          </Route>
          <Route path='/spots/current'>
            <ManageSpots />
          </Route>
          <Route path='/spots/:spotId'>
            <SpotDetail />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
