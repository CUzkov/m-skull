import * as React from "react";
import {ReactElement, FC, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {MomentDto} from 'models/MomentDto'
import {Text} from 'components/Text'
import {Comment} from 'components/Comment'
import {Link} from 'react-router-dom'

import './moment.scss'

interface MomentProps extends MomentDto {

}

export const Moment: FC<MomentProps> = ({
  author,
  authorImgPath,
  comments,
  imgs,
  isLiked
}: MomentProps): ReactElement => {

  const [isLikedState, setIsLikedState] = useState<boolean>(isLiked);

  return(
    <div className={isMobile ? 'moment-mobile' : 'moment'} >
      <div className={'title F-R-S'} >
        <img src={authorImgPath} />
        <Text text={author} size={'l'} />
      </div>
      <Link to={'/moment'} >
        {imgs.length == 1 && <img src={imgs[0]} width={600} /> }
      </Link>
      {/* TODO добавить свайп картинок */}
      <div className={'icons'} >

      </div>
      <div className={'comments'} >
        {comments.slice(0, 3).map((comment, index) => (
          <Comment 
            author={comment.author}
            authorImgPath={comment.authorImgPath}
            isLiked={comment.isLiked}
            isMaxHeight={false}
            likesQuantity={comment.likesQuantity}
            value={comment.value}
            key={index}
          />
        ))}
      </div>
      <div className={'add-comment'} >

      </div>
    </div>
  );
}