import * as React from "react";
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import {FC} from 'react'
import {Header} from '../modules/header'
import {
  LoginPage,
  MainPage,
  ProfilePage,
  RecomendedPage,
  MomentPage,
  ProfileSettingsPage
} from '../pages';
import {useDispatch} from 'react-redux';
import {setUserAuths} from 'store/actionsCreators/userActionCreator';

import './app.scss'

export const App: FC = () => {

  const dispatch = useDispatch();
  if (localStorage.getItem('login')) {
    dispatch(setUserAuths({
      login: localStorage.getItem('login'),
      refreshToken: localStorage.getItem('refreshToken')
    }))
  }

  return(
    <>
			<Router>
        <Header />
        <Route path="/login" exact render={() => <LoginPage />} />
        <Route path="/profile/:id" exact component={ProfilePage} />
        <Route path="/profile" exact render={() => <ProfilePage />} />
        <Route path="/" exact render={() => <MainPage />} />
        <Route path="/recomended" exact render={() => <RecomendedPage />} />
        <Route path="/profile-settings" exact render={() => <ProfileSettingsPage />} />
        <Route path="/moment" exact render={() => <MomentPage />} />
			</Router>    
    </>
  );
}