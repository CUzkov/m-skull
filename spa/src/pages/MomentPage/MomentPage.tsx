import * as React from "react";
import {FC} from 'react';
import {MOMENTS} from '../../slabs/main';
import {Comment} from 'components/Comment';
import {Text} from 'components/Text'

import './moment-page.scss';

export const MomentPage: FC = () => {
	return(
		<div className={'moment-page'}>
			<div className={'content-wrapper F-R-SP'} >
				<img src={MOMENTS[0].imgs[0]} className={'photo'} />
				<div className={'comments F-C-S'} >
					<div className={'title'} >
						<Text size={'l'} text={'Автор: ' + MOMENTS[0].author} />
					</div>
					{/* {MOMENTS[0].comments.map((comment, index) => (
						<Comment 
							author={comment.author}
							authorImgPath={comment.authorImgPath}
							isLiked={comment.isLiked}
							isMaxHeight={true}
							likesQuantity={comment.likesQuantity}
							value={comment.value}
							key={index}
						/>
					))} */}
				</div>
			</div>
		</div>
	);
}