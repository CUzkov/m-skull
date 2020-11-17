import * as React from "react";
import {FC} from 'react';
import {SmallMoment} from 'components/SmallMoment';
import {SMALL_MOMENTS} from '../../slabs/recomended';

import './recomended-page.scss';

export const RecomendedPage: FC = () => {

	return(
		<div className={'recomended-page'}>
			<div className={'content-wrapper F-R-SP'}>
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
	);
}