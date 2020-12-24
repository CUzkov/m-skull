import * as React from "react";
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {SmallMoment} from 'components/SmallMoment';
import {IMoment} from 'types/moments';
import {ioIError} from 'types/common';
import {IUserStore} from 'types/user';
import {APIUser, API_MOMENT} from 'utils/api';

import './recomended-page.scss';

export const RecomendedPage: FC = () => {

	const [moments, setMoments] = useState<IMoment[]>(null);
  const userStore: IUserStore = useSelector(state => state.user);

	useEffect(() => {
		APIUser.getAllMoments(userStore.id)
			.then(res => {
				if (!ioIError(res)) {
					setMoments(res.results);
				}
			})
	}, []);

	return(
		<div className={'recomended-page'}>
			<div className={'content-wrapper F-R-SP'}>
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
	);
}