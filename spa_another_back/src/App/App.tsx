import * as React from "react";
import {
	BrowserRouter as Router,
  Route,
  browserHistory
} from 'react-router-dom';
import {FC} from 'react';
import {useDispatch} from 'react-redux';

import {Header} from 'modules/header'
import {
  LoginPage,
  MainPage,
  ProfilePage,
  RecomendedPage,
  MomentPage,
  ProfileSettingsPage
} from 'pages';
import {setUserAuths} from 'store/actionsCreators/userActionCreator';
import {useModalWindow} from 'hooks/useModalWindow';
import {MomentCreatePopup} from 'modules/MomentCreatePopup';
import {storage} from '../firebase';

import './app.scss'

const config = {
  apiKey: "AAAAS8mAwCI:APA91bEkSUvbWcwD2jcd2HfPxTU17ItC-stpIgNDbcD1TOxC1IiKV94Te17WCtlHcH426IdMSzACSdUddzsmHezYx0u58d8I67gKO6UyPvysWHKsN_hcE8rnigDpPhjroj0YMqZrhPkZ",
  projectId: "noskool-sn",
  databaseURL: "gs://noskool-sn.appspot.com",
  authDomain: "noskool-sn.firebaseapp.com",
  // OPTIONAL
  // storageBucket: "STORAGE_BUCKET",
  // messagingSenderId: "MESSAGING_SENDER_ID"
};

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
          <Route path="/profile" exact render={() => <ProfilePage />} />
          {/* <Route path="/profile/:id" exact render={(props) => <ProfilePage {...props}/>} />
          <Route path="/" exact render={() => <MainPage />} />
          <Route path="/recomended" exact render={() => <RecomendedPage />} />
          <Route path="/profile-settings" exact render={() => <ProfileSettingsPage />} />
          <Route path="/moment/:id/:userId" exact render={(props) => <MomentPage {...props} />} /> */}
          {/* {isOpen && (
            <MomentCreatePopup 
              toggleModal={toggleModal}
            />
          )} */}
        </div>
      </Router> 
    </>
  );
}