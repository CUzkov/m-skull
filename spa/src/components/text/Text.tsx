import * as React from "react";
import {ReactElement} from 'react'
import {FC} from 'react'

import './text.scss'
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
    case 'ml':
      sizeValue = 15;
      break;
    case 'm':
      sizeValue = 10;
      break;
    default:
      sizeValue = 20;
  }

  return(
    <span 
      className={'Text'}
      style={{
        color: `${color}`,
        cursor: onClick ? 'pointer' : '',
        fontSize: sizeValue 
      }}
      onClick={onClick} 
      >
      {text}
    </span>
  );
}