import * as React from "react";
import {ReactElement} from 'react'
import {FC} from 'react'

import './text.scss'
interface TextProps {
  text: string;
  color?: string;
  onClick?: () => void;
  size: string;
  className?: string;
}

export const Text: FC<TextProps> = ({
  text,
  color,
  onClick,
  size,
  className
}: TextProps): ReactElement => {

  let sizeValue;
  switch (size) {
    case 'xl':
      sizeValue = 30;
      break;
    case 'l':
      sizeValue = 20;
      break;
    case 'm':
      sizeValue = 15;
      break;
    case 's':
      sizeValue = 10;
      break;
    default:
      sizeValue = 20;
  }

  return(
    <span 
      className={`${className} Text`}
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