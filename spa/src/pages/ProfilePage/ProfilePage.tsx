import * as React from "react";
import {FC} from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
 
import {PROFILE} from '../../slabs/profile-page';
import {ProfileCard} from 'modules/ProfileCard';
import {SMALL_MOMENTS} from '../../slabs/recomended';
import {SmallMoment} from 'components/SmallMoment';
import {Text} from 'components/Text';
import {IUserStore} from 'types/user';
import {APIUser} from 'utils/api';

import './profile-page.scss';

export const ProfilePage: FC = () => {

  const userStore: IUserStore = useSelector(state => state.user);
  APIUser.getMe(userStore.refreshToken).then(res => {
    console.log(res)
  })

	return(
    <>
      {!userStore.refreshToken ? (<Redirect to={'/login'} />) :
      (
        <div className={'profile-page'}>
          <div className={'content-wrapper'} >
            <ProfileCard 
              friendsQuantity={PROFILE.friendsQuantity}
              momentsQuantity={PROFILE.momentsQuantity}
              mySubsQuantity={PROFILE.mySubsQuantity}
              name={PROFILE.name}
              photoPath={PROFILE.photoPath}
              subsQuantity={PROFILE.subsQuantity}
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