import * as React from "react";
import {FC, useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {IUserStore, IUserProfile} from 'types/user';
import {APIUser, API_USER} from 'utils/api';
import {isMobile} from 'react-device-detect';
import {SIDE_BAR, PPS_TEXT} from 'constants/profile-settings-page';
import {Text} from 'components/Text';
import {ioIGetDataUser} from 'types/common';
import {setNoneAuth} from 'store/actionsCreators/userActionCreator';

import './profile-settings-page.scss';

export const ProfileSettingsPage: FC = () => {

  const userStore: IUserStore = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState<IUserProfile>(null);
  const [sideBarState, setSideBarState] = useState(SIDE_BAR);
  const setSelectedSideBarElement = useCallback(
    (index: number) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setSideBarState({
        entries: sideBarState.entries.map((element, i) => {
          if(i === index) {
            element.isSelected = true;
            return element;
          } else {
            element.isSelected = false;
            return element;
          } 
        })
      });
  }, [sideBarState]);

  const onLoadPhotoHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }, []);

  useEffect(() => {
    APIUser.getMe(userStore.refreshToken).then(res => {
      if (ioIGetDataUser(res)) {
        setUserProfile(res.data);
      } else {
        dispatch(setNoneAuth());
      }
    });
  }, []);

	return(
    <>
      {!userStore.refreshToken && <Redirect to={'/login'} />}
      <div className={isMobile ? 'profile-settings-page-mob' : 'profile-settings-page'}>
        <div className={'content-wrapper F-R-SP'} >
          <div className={'side-bar'} >
            {sideBarState.entries.map((element, index) => (
              <div 
                key={index}
                className={
                  (element.isSelected ? 'selected' : '') +
                  ' side-bar-element'
                }
              >
                <div
                  onClick={setSelectedSideBarElement(index)}
                  className={'text'}
                >
                  <Text
                    size={'l'}
                    text={element.name}
                  />
                </div>
              </div>
            ))}
          </div>
          {sideBarState.entries[0].isSelected && 
            <div className={'content'} >
              <div className={'title F-R-S'} >
                <img 
                  src={API_USER + userProfile?.user.profile_image}
                  width={50}
                  height={50}
                  className={'photo'}
                />
                <div className={'F-C-SP'} >
                  <div className={'username-text'}>{userProfile?.user.username}</div>
                  <label 
                    className={'photo-label'}
                    htmlFor={'photo-uploader'}
                  >
                    {PPS_TEXT.change_photo}</label>
                  <input
                    type={'file'}
                    id={'photo-uploader'}
                    className={'photo-input'}
                    onChange={onLoadPhotoHandler}
                    accept={'image/jpeg,image/png,image/webp'}
                  />
                </div>
              </div>
              <div className={'ch-input-block'} >
                <div className={'ch-input-label'}>

                </div>
                <div className={'ch-input-label'}>
                  
                </div>
              </div>  
            </div>
          }
        </div>
      </div>
    </>
	);
}
