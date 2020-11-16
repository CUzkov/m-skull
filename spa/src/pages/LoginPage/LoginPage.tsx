import * as React from "react";
import {FC} from 'react';
import {cn} from '@bem-react/classname';

import './login-page.scss';

const cnLoginPage = cn('login-page');

export const LoginPage: FC = () => {

  const submitHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

	return(
		<div className={cnLoginPage()}>
      <div className={'form-wrapper'} >
        <form action="" className={'form' + ' F-C-SP'}>
          <input type="email" name="" id=""/>
          <input type="password" name="" id=""/>
          <input type="submit" value="Войти" onClick={submitHandler}/>
        </form>
      </div>
		</div>
	);
}