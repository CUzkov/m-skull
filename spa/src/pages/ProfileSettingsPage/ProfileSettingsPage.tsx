import * as React from "react";
import {FC, useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Form, Field} from 'react-final-form';

import {IUserStore, IUserProfile} from 'types/user';
import {APIUser, API_USER} from 'utils/api';
import {isMobile} from 'react-device-detect';
import {SIDE_BAR, PPS_TEXT} from 'constants/profile-settings-page';
import {ioIGetDataUser, ioIError, IChangeUserForm} from 'types/common';
import {setNoneAuth} from 'store/actionsCreators/userActionCreator';
import {statuses} from 'constants/status';

import './profile-settings-page.scss';

export const ProfileSettingsPage: FC = () => {

  const userStore: IUserStore = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState<IUserProfile>(null);
  const [sideBarState, setSideBarState] = useState(SIDE_BAR);

  const refreshProfile = () => {
    APIUser.getMe(userStore.refreshToken).then(res => {
      if (ioIGetDataUser(res)) {
        setUserProfile(res.data);
      } else {
        dispatch(setNoneAuth());
      }
    });
  }

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
    APIUser.changePhoto(userStore.refreshToken, e.target)
      .then((res) => {
        if (!ioIError(res)) {
          refreshProfile();
        }
      })
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [onLoadPhotoHandler]);

  const formHandlers = [
    {
      label: 'Изменить имя пользователя',
      default: userProfile?.user.username,
      name: 'username'
    },
    {
      label: 'Изменить имя',
      default: userProfile?.user.first_name,
      name: 'first_name'
    },
    {
      label: 'Изменить фамилию',
      default: userProfile?.user.last_name,
      name: 'last_name'
    },
  ];

  const onSubmitForm = useCallback((formValues: IChangeUserForm, form: any): void => {
    APIUser.changeUserData(userStore.refreshToken, formValues)
      .then((res) => {
        if (!ioIError(res)) {
          refreshProfile();
        }
        form.reset();
      });
  }, []);

  const onClickIcon = useCallback((index: number) => 
    (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      APIUser.changeUserData(
          userStore.refreshToken,
          {'status_ico': statuses[index]}
        )
        .then((res) => {
          if (!ioIError(res)) {
            refreshProfile();
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
                  <div style={{fontSize: 'var(--text-sm)'}}>
                    {element.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {sideBarState.entries[1].isSelected && 
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
              <Form 
                onSubmit={onSubmitForm}
              >
                {props => (
                  <>
                    <form onSubmit={props.handleSubmit}>
                      {formHandlers.map((element, index) => (
                        <Field name={element.name} key={element.label}>
                          {props => (
                            <div className={'ch-input-block'} >
                              <div className={'ch-input-label'}>
                                {element.label}
                              </div>
                              <div className={'ch-input-label'}>
                                <input 
                                  placeholder={element.default}
                                  {...props.input}
                                />
                              </div>
                            </div>
                          )}
                        </Field>
                      ))}
                      <button type="submit">Submit</button>
                    </form>
                  </>
                )}
              </Form>
            </div>
          }
          {sideBarState.entries[2].isSelected &&
            <div className={'content'} >
              <Form onSubmit={onSubmitForm}>
                {props => (
                  <form onSubmit={props.handleSubmit}>
                    <Field name={'email'}>
                      {props => (
                        <div className={'ch-input-block'} >
                          <div className={'ch-input-label'}>
                            {'Новая почта'}
                          </div>
                          <div className={'ch-input-label'}>
                            <input 
                              placeholder={userProfile?.user.email}
                              {...props.input}
                              type={'email'}
                            />
                          </div>
                        </div>
                      )}
                    </Field>
                    <button type="submit">Изменить</button>
                  </form>
                )}
              </Form>
            </div>
          }
          {sideBarState.entries[0].isSelected &&
            <div className={'content'} >
              <div className={'icons-table F-R-SP'}>
                {statuses.map((status, index) => (
                  <div key={index} >
                    <img
                      src={status}
                      className={userProfile?.user.status_ico === status ? 'active' : ''}
                      onClick={onClickIcon(index)}
                    />
                  </div>
                ))}
              </div>
              <Form onSubmit={onSubmitForm}>
                {props => (
                  <form onSubmit={props.handleSubmit}>
                    <Field name={'status'}>
                      {props => (
                        <div className={'ch-input-block'} >
                          <div className={'ch-input-label'}>
                            {'Новый статус'}
                          </div>
                          <div className={'ch-input-label'}>
                            <input 
                              placeholder={userProfile?.user.status}
                              {...props.input}
                            />
                          </div>
                        </div>
                      )}
                    </Field>
                    <button type="submit">Изменить</button>
                  </form>
                )}
              </Form>
            </div>
          }
        </div>
      </div>
    </>
	);
}
