import * as React from "react";
import {FC, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {ProfileCard} from 'modules/ProfileCard';
import {SmallMoment} from 'components/SmallMoment';
import {APIUser, API_USER, API_MOMENT} from 'utils/api';
import {IUserProfile, IUserStore} from 'types/user';
import {ioIGetDataUser, ioIError} from 'types/common';
import {IMoment} from 'types/moments';
import {setNoneAuth} from 'store/actionsCreators/userActionCreator';

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
  const dispatch = useDispatch();
  const [moments, setMoments] = useState<IMoment[]>(null);

  if (!match?.params.id) {
    useEffect(() => {
      APIUser.getMe(userStore.refreshToken).then(res => {
        if (ioIGetDataUser(res)) {
          setUserProfile(res.data);
        } else {
          dispatch(setNoneAuth());
        }
      });
    }, []);
  } else {
    useEffect(() => {
      APIUser.getUserById(match?.params.id)
        .then((res) => {
          if (!ioIError(res)) {
            setUserProfile(res.data);
            setIsNotFound(false);
          } else {
            setIsNotFound(true);
          }
        });
    }, []);
  }

	useEffect(() => {
		APIUser.getUser(userStore.id)
			.then(res => {
				if (!ioIError(res)) {
					setMoments(res.results);
				}
			})
	}, []);

	return(
    <>
      {!userStore.refreshToken && <Redirect to={'/login'} />}
      {!isNoFound && (
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
              {moments?.map((moment, index) => (
                <div className={'moment-wrapper'} key={index} >
                  <SmallMoment
                    likesQuantity={moment.likes}
                    path={API_MOMENT + moment.image[0]}
                    isLiked={moment.isLiked}
                    id={moment.id}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {isNoFound && (
        <div>
          Not Found
        </div>
      )}
    </>
	);
}