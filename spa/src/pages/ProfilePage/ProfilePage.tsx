import * as React from "react";
import {FC, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
 
import {ProfileCard} from 'modules/ProfileCard';
import {SMALL_MOMENTS} from '../../slabs/recomended';
import {SmallMoment} from 'components/SmallMoment';
import {Text} from 'components/Text';
import {APIUser, API_USER} from 'utils/api';
import {IUserProfile, IUserStore} from 'types/user';
import {ioIGetDataUser, ioIError} from 'types/common';
import {IIsFriendStruct} from 'types/friends';
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

	return(
    <>
      {!userStore.refreshToken && <Redirect to={'/login'} />}
      {!isNoFound && (
        <div className={'profile-page'}>
          <div className={'content-wrapper'} >
            <ProfileCard 
              friendsQuantity={0}
              momentsQuantity={0}
              subsQuantity={0}
              mySubsQuantity={0}
              name={userProfile?.user.username}
              photoPath={API_USER + userProfile?.user.profile_image}
              firstName={userProfile?.user.first_name || ''}
              lastName={userProfile?.user.last_name || ''}
              userNumber={match?.params.id}
            />
            <div className={'line'} />
            <Text size={'l'} text={!match?.params.id ? 'Ваши публикации: ' : 'Публикации пользователя: '} />
            <div className={'moments F-R-SP'} >
              {SMALL_MOMENTS.map((moment, index) => (
                <div className={'moment-wrapper'} key={index} >
                  <SmallMoment
                    commentsQuantity={moment.commentsQuantity}
                    isManyImg={moment.isManyImg}
                    likesQuantity={moment.likesQuantity}
                    path={moment.path}
                    referense={moment.referense}
                    alt={moment.alt}
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