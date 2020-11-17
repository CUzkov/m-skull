import * as React from "react";
import {ReactElement, useState} from 'react'
import {FC} from 'react'
import {SmallMomentDto} from 'models/SmallMomentDto'
import {isMobile} from 'react-device-detect'
import CommentIcon from 'assests/small-moment/icons/comment.svg'
import LikeIcon from 'assests/small-moment/icons/like.svg'

import './small-moment.scss'

interface SmallMomentProps extends SmallMomentDto {

}

export const SmallMoment: FC<SmallMomentProps> = ({
  path,
  alt,
  referense,
  likesQuantity,
  commentsQuantity,
  isManyImg
}: SmallMomentProps): ReactElement => {

  const [isHover, setIsHover] = useState<boolean>(false);

  console.log('adwawd');

  return(
    <div className={isMobile ? 'small-moment-mobile' : 'small-moment'} >
      <img 
        src={path} 
        alt={alt} 
        className={'image'} 
        onMouseEnter={() => { setIsHover(true); }} 
        />
      {!isMobile && isHover &&
        <div 
          className={'hover-block F-C-C'} 
          onMouseLeave={() => { setIsHover(false); }}
          >
          <div className={'icons F-R-SP'} >
            <div className={'like F-R-SP'} onClick={() => {}}>
              <LikeIcon />
              {likesQuantity}
            </div>
            <div className={'comment F-R-SP'} onClick={() => {}} >
              <CommentIcon />
              {commentsQuantity}
            </div>
          </div>
        </div>
      }
    </div>
  );

}