import * as React from "react";
import {ReactElement, FC, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {CommentDto} from 'models/CommentDto'
import {Text} from 'components/Text'
import UnlikedIcon from 'assests/moment/icons/unlike.svg'
import LikedIcon from 'assests/moment/icons/liked.svg'
import {Link} from 'react-router-dom'

import './comment.scss'

interface CommentProps extends CommentDto {
  isMaxHeight: boolean
}

export const Comment: FC<CommentProps> = ({
  author,
  authorImgPath,
  isLiked,
  likesQuantity,
  value,
  isMaxHeight
}: CommentProps): ReactElement => {

  return(
    <div 
      className={(isMobile ? 'comment-mobile' : 'comment') + ' F-R-S'} 
      style={{height: isMaxHeight ? 'min-content' : ''}}
      >
      <div className={'like'} >
        {isLiked ? <LikedIcon /> : <UnlikedIcon />}
      </div>
      <div className={'content F-R-S'} >
        <Link to={'/profile'} >
          <img src={authorImgPath} style={{cursor: 'pointer'}} />
        </Link>
        <Text text={author + ':  '} size={'ml'} />
        <Text text={value} size={'ml'} />
      </div>
    </div>
  );
}