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
  MomentPage
} from '../pages'

import './app.scss'

export const App: FC = () => {
  return(
    <>
			<Router>
        <Header />
        <Route path="/login" exact render={() => <LoginPage />} />
        <Route path="/profile" exact render={() => <ProfilePage />} />
        <Route path="/" exact render={() => <MainPage />} />
        <Route path="/recomended" exact render={() => <RecomendedPage />} />
        <Route path="/moment" exact render={() => <MomentPage />} />
			</Router>    
    </>
  );
}