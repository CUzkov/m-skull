import * as React from "react";
import {FC} from 'react';
import {Moment} from 'components/Moment';
import {MOMENTS} from '../../slabs/main'
import {isMobile} from 'react-device-detect'

import './main-page.scss';

export const MainPage: FC = () => {

	return(
		<div className={isMobile ? 'main-page-mobile' : 'main-page'}>
			<div className={'content-wrapper F-C-S'} >
				{MOMENTS.map((moment, index) => (
					<div className={'moment-wrapper'} >
						<Moment 
							author={moment.author}
							authorImgPath={moment.authorImgPath}
							comments={moment.comments}
							imgs={moment.imgs}
							isLiked={moment.isLiked}
							key={index}
						/>
					</div>					
				))}
			</div>
		</div>
	);
}