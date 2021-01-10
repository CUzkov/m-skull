import * as React from "react";
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {APIUser, API_MOMENT, API_USER} from 'utils/api';
import {IMoment} from 'types/moments';
import {ioIError} from 'types/common';
import {IUserProfile, IUserStore} from 'types/user';
import {useLike} from 'hooks/useLike';
import LikedIcon from 'assests/moment/icons/liked.svg';
import UnlikedIcon from 'assests/moment/icons/unliked.svg';

import './moment-page.scss';

interface IMomentPageProps {
  match?: any
}

export const MomentPage: FC<IMomentPageProps> = ({
  match
}: IMomentPageProps) => {

	const [moment, setMoment] = useState<IMoment>(null);
  const userStore: IUserStore = useSelector(state => state.user);
  const [userProfile, setUserProfile] = useState<IUserProfile>(null);
	const {isLikedState, toggleLike, setRealLike} = useLike({
    isLiked: moment?.isLiked,
    id: match?.params.id
  });

	useEffect(() => {
		APIUser.getMomentByIdUserid(match?.params.id, match?.params.userId)
			.then(res => {
				if (!ioIError(res)) {
					setMoment(res.data);
					setRealLike(res.data.isLiked);
					APIUser.getUserById(res.data.user_id)
						.then((res) => {
							if (!ioIError(res)) {
								setUserProfile(res.data);
							}
						});
				}
			})
	}, [])

	return(
		<div className={'moment-page'}>
			<div className={'content-wrapper F-R-SP'} >
				<img src={API_MOMENT + moment?.image[0]} className={'photo'} />
				<div className={'information F-C-S'}>
					<div className={'F-R-SP title'}>
						<div className={'icons'} >
              <div className={'icon'} onClick={toggleLike} >
                {isLikedState ? <LikedIcon /> : <UnlikedIcon />}
              </div> 
						</div>
						<Link to={`/profile/${moment?.user_id}`} >
							<div className={'F-R-S'} >
								<img src={API_USER + userProfile?.user.profile_image} />
								<div className={'author'}>{userProfile?.user.username}</div>
							</div>
						</Link>
					</div>
					<div>
						<hr/>
					</div>
					<div className={'description'}>
						{moment?.description}
					</div>
				</div>
			</div>
		</div>
	);
}
