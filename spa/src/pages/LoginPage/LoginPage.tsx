import * as React from "react";
import {FC, useState, useCallback} from 'react';
import {cn} from '@bem-react/classname';
import {useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Text} from 'components/Text';

import {APIUser} from 'utils/api';
import {setUserAuths} from 'store/actionsCreators/userActionCreator';
import {LOGIN_PAGE_TEXT} from 'constants/login-page';

import './login-page.scss';

const cnLoginPage = cn('login-page');

export const LoginPage: FC = () => {

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRedirectToMain, setIsRedirectToMain] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onChangeLoginHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setLogin(e.target.value);
  }, [login]);
  const onChangePasswordHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  }, [login]);

  const submitHandler = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    APIUser.getToken({
      username: login,
      password: password
    }).then(res => {
      if(res.refresh) {
        localStorage.setItem('login', login);
        localStorage.setItem('refreshToken', res.refresh);
        dispatch(setUserAuths({
          login: login,
          refreshToken: res.refresh
        }));
        setIsRedirectToMain(true);
      } else { alert('Неправильный логин или пароль!') }
    })
  };

	return(
    <>
      <div className={cnLoginPage()}>
        <div className={'form-wrapper'} >
          <form className={'form' + ' F-C-SP'}>
            <div>
              <Text size={'l'} text={LOGIN_PAGE_TEXT.login} />
              <input
                type="text"
                value={login}
                onChange={onChangeLoginHandler}  
              />
            </div>
            <div>
              <Text size={'l'} text={LOGIN_PAGE_TEXT.password} />
              <input 
                type="password"
                value={password}
                onChange={onChangePasswordHandler}
              />
            </div>
            <input
              type="submit"
              value="Войти"
              onClick={submitHandler}
            />
          </form>
        </div>
      </div>
      {isRedirectToMain && <Redirect to={'/'} />}
    </>
	);
}