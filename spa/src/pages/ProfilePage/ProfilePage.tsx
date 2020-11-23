import * as React from "react";
import {FC, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
 
import {ProfileCard} from 'modules/ProfileCard';
import {SMALL_MOMENTS} from '../../slabs/recomended';
import {SmallMoment} from 'components/SmallMoment';
import {Text} from 'components/Text';
import {IUserStore} from 'types/user';
import {APIUser} from 'utils/api';
import {API_USER} from 'utils/api';
import {IUserProfile} from 'types/user';

import './profile-page.scss';

export const ProfilePage: FC = () => {

  const userStore: IUserStore = useSelector(state => state.user);
  const [userProfile, setUserProfile] = useState<IUserProfile>(null);

  useEffect(() => {
    APIUser.getMe(userStore.refreshToken).then(res => setUserProfile(res.data.user));
  }, []);

	return(
    <>
      {!userStore.refreshToken ? (<Redirect to={'/login'} />) :
      (
        <div className={'profile-page'}>
          <div className={'content-wrapper'} >
            <ProfileCard 
              friendsQuantity={0}
              momentsQuantity={0}
              subsQuantity={0}
              mySubsQuantity={0}
              name={userProfile?.username}
              photoPath={API_USER + userProfile?.profile_image}
              firstName={userProfile?.first_name || ''}
              lastName={userProfile?.last_name || ''}
            />
            <div className={'line'} />
            <Text size={'l'} text={'Ваши публикации: '} />
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
    </>
	);
}