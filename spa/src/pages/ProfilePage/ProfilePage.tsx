import * as React from "react";
import {FC, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {ProfileCard} from 'modules/ProfileCard';
import {APIUser, API_USER, API_MOMENT} from 'utils/api';
import {IUserProfile, IUserStore} from 'types/user';
import {ioIGetDataUser, ioIError} from 'types/common';
import {IMoment} from 'types/moments';
import { Gallery } from 'components/Gallery';

import './profile-page.scss';

interface IProfilePageProps {
  match?: any
}

export const ProfilePage: FC<IProfilePageProps> = ({
  match
}: IProfilePageProps) => {

  const userStore: IUserStore = useSelector(state => state.user);
  const [userProfile, setUserProfile] = useState<IUserProfile>(null);
  const [isNoFound, setIsNotFound] = useState<boolean>(false);
  const [moments, setMoments] = useState<IMoment[]>(null);

  useEffect(() => {
    let isMounted = true;
    if (!match?.params.id) {
      APIUser.getMe(userStore.refreshToken).then(res => {
        if (ioIGetDataUser(res) && isMounted) {
          setUserProfile(res.data);
        }
      });
    } else {
      APIUser.getUserById(match?.params.id)
        .then((res) => {
          if (!ioIError(res)) {
            if (isMounted) {
              setUserProfile(res.data);
              setIsNotFound(false);
            }
          } else {
            if (isMounted) {
              setIsNotFound(true);
            }
          }
        });
    }
    APIUser.getUser(!match?.params.id ? userStore.id : match?.params.id)
      .then(res => {
        if (!ioIError(res) && isMounted) {
          setMoments(res.results);
        }
      });
    return () => { isMounted = false };
  }, []);

	return(
    <>
      {!userStore?.refreshToken && <Redirect to={'/login'} />}
      {!isNoFound ? (
        <div className={'profile-page'}>
          <div className={'content-wrapper'} >
            <ProfileCard 
              momentsQuantity={0}
              name={userProfile?.user.username}
              photoPath={API_USER + userProfile?.user.profile_image}
              firstName={userProfile?.user.first_name || ''}
              lastName={userProfile?.user.last_name || ''}
              userNumber={match?.params.id}
            />
            <div className={'line'} />
            <div style={{fontSize: 'var(--text-sm)'}}>
              {!match?.params.id ? 'Ваши публикации: ' : 'Публикации пользователя: '}
            </div>
            <div className={'moments F-R-SP'} >
              <Gallery 
                moments={moments}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          Not Found
        </div>
      )}
    </>
	);
}
