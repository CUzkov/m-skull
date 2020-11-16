import * as React from "react";
import {ReactElement} from 'react'
import {FC} from 'react'
import {cn} from '@bem-react/classname'

import './text.scss'

const cnText = cn('Text');

interface TextProps {
  text: string;
  color?: string;
  onClick?: () => void;
  size: string;
}

export const Text: FC<TextProps> = ({
  text,
  color,
  onClick,
  size
}: TextProps): ReactElement => {

  let sizeValue;
  switch (size) {
    case 'x':
      sizeValue = 30;
      break;
    case 'l':
      sizeValue = 20;
      break;
    case 'm':
      sizeValue = 10;
      break;
    default:
      sizeValue = 20;
  }

  return(
    <div 
      className={cnText()} 
      style={{
        color: `${color}`,
        cursor: onClick ? 'pointer' : '',
        fontSize: sizeValue 
      }}
      onClick={onClick} 
      >
      {text}
    </div>
  );
}