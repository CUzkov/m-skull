import * as React from "react";
import {
	BrowserRouter as Router,
  Route,
  browserHistory
} from 'react-router-dom';
import {FC} from 'react'
import {useDispatch} from 'react-redux';

import {Header} from 'modules/header'
import {
  LoginPage,
  MainPage,
  ProfilePage,
  RecomendedPage,
  MomentPage,
  ProfileSettingsPage,
  SearchPage
} from 'pages';
import {setUserAuths} from 'store/actionsCreators/userActionCreator';
import {useModalWindow} from 'hooks/useModalWindow';
import {MomentCreatePopup} from 'modules/MomentCreatePopup';

import './app.scss'

export const App: FC = () => {

  const dispatch = useDispatch();
  if (localStorage.getItem('login')) {
    dispatch(setUserAuths({
      login: localStorage.getItem('login'),
      refreshToken: localStorage.getItem('refreshToken'),
      id: Number(localStorage.getItem('id'))
    }))
  }

  const {toggleModal, isOpen, closeWindow} = useModalWindow();

  return(
    <>
			<Router history={browserHistory} >
        <Header toggleModal={toggleModal} closeWindow={closeWindow} />
        <div>
          <Route path="/login" exact render={() => <LoginPage />} />
          <Route path="/profile/:id" exact render={(props) => <ProfilePage {...props}/>} />
          <Route path="/profile" exact render={() => <ProfilePage />} />
          <Route path="/" exact render={() => <MainPage />} />
          <Route path="/recomended" exact render={() => <RecomendedPage />} />
          <Route path="/profile-settings" exact render={() => <ProfileSettingsPage />} />
          <Route path="/moment/:id/:userId" exact render={(props) => <MomentPage {...props} />} />
          <Route path="/find-friends" exact render={() => <SearchPage />} />
          {isOpen && (
            <MomentCreatePopup 
              toggleModal={toggleModal}
            />
          )}
        </div>
			</Router>    
    </>
  );
}
