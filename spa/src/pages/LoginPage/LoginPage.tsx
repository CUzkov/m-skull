import * as React from "react";
import {FC, useState, useCallback} from 'react';
import {cn} from '@bem-react/classname';
import {useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Form, Field} from 'react-final-form';

import {APIUser} from 'utils/api';
import {setUserAuths} from 'store/actionsCreators/userActionCreator';
import {LOGIN_PAGE_TEXT} from 'constants/login-page';
import {IRegForm, ioIRegForm, ioIError} from 'types/common';
import {IUserAuthData, ioIUserAuthData} from 'types/user';

import './login-page.scss';

const cnLoginPage = cn('login-page');

export const LoginPage: FC = () => {

  const [isRedirectToMain, setIsRedirectToMain] = useState<boolean>(false);
  const [isLoginForm, setIsLoginFrom] = useState<boolean>(true);
  const dispatch = useDispatch();

  const submitHandler = (values: IRegForm | IUserAuthData, form: any): void => {
    if(isLoginForm) {
      if (ioIUserAuthData(values)) {
        APIUser.getToken(values).then(res => {
          if(res.refresh) {
            localStorage.setItem('login', values.username);
            localStorage.setItem('refreshToken', res.refresh);
            dispatch(setUserAuths({
              login: values.username,
              refreshToken: res.refresh
            }));
            setIsRedirectToMain(true);
          } else { alert('Неправильный логин или пароль!') }
        });
      }
    } else {
      if (ioIRegForm(values)) {
        if (
          values?.password == values?.repeat_password &&
          values?.username &&
          values?.last_name &&
          values?.first_name &&
          values?.repeat_password &&
          values?.password
        ) {
          APIUser.regUser(values)
            .then(res => {
              if (!ioIError(res)) {
                APIUser.getToken({
                  username: values.username,
                  password: values.password
                }).then(res => {
                  if(res.refresh) {
                    localStorage.setItem('login', values.username);
                    localStorage.setItem('refreshToken', res.refresh);
                    dispatch(setUserAuths({
                      login: values.username,
                      refreshToken: res.refresh
                    }));
                    setIsRedirectToMain(true);
                  } else { alert('Неправильный логин или пароль!') }
                });
              }
            });
        }
      }
    }
  };

  const toggleForms = useCallback(() => {
    setIsLoginFrom(!isLoginForm);
  }, [isLoginForm]);

	return(
    <>
      <div className={cnLoginPage()}>
        <div className={isLoginForm ? 'form-wrapper-login' : 'form-wrapper-reg'}>
          {isLoginForm ? (
            <Form
              onSubmit={submitHandler}
            >
              {props => (
                <form className={'form' + ' F-C-SP'} onSubmit={props.handleSubmit}>
                  <div>
                    <div className={'title'}>{LOGIN_PAGE_TEXT.login}</div>
                    <Field name={'username'}>
                      {props => (
                        <input 
                          {...props.input}
                        />
                      )}
                    </Field>
                  </div>
                  <div>
                    <div className={'title'}>{LOGIN_PAGE_TEXT.password}</div>
                    <Field name={'password'}>
                      {props => (
                        <input 
                          {...props.input}
                        />
                      )}
                    </Field>
                  </div>
                  <button type={'submit'}>{LOGIN_PAGE_TEXT.enter}</button>
                  <button type={'button'} onClick={toggleForms}>
                    {LOGIN_PAGE_TEXT.orReg}
                  </button>
                </form>
              )}
            </Form>
          ) : (
            <Form
              onSubmit={submitHandler}
            >
              {props => (
                <form className={'form' + ' F-C-SP'} onSubmit={props.handleSubmit}>
                  <div>
                    <div className={'title'}>{LOGIN_PAGE_TEXT.email}</div>
                    <Field name={'email'}>
                      {props => (
                        <input 
                          {...props.input}
                        />
                      )}
                    </Field>
                  </div>
                  <div>
                    <div className={'title'}>{LOGIN_PAGE_TEXT.login}</div>
                    <Field name={'username'}>
                      {props => (
                        <input 
                          {...props.input}
                        />
                      )}
                    </Field>
                  </div>
                  <div>
                    <div className={'title'}>{LOGIN_PAGE_TEXT.password}</div>
                    <Field name={'password'}>
                      {props => (
                        <input 
                          {...props.input}
                        />
                      )}
                    </Field>
                  </div>
                  <div>
                    <div className={'title'}>{LOGIN_PAGE_TEXT.repeat_password}</div>
                    <Field name={'repeat_password'}>
                      {props => (
                        <input 
                          {...props.input}
                        />
                      )}
                    </Field>
                  </div>
                  <div>
                    <div className={'title'}>{LOGIN_PAGE_TEXT.first_name}</div>
                    <Field name={'first_name'}>
                      {props => (
                        <input 
                          {...props.input}
                        />
                      )}
                    </Field>
                  </div>
                  <div>
                    <div className={'title'}>{LOGIN_PAGE_TEXT.last_name}</div>
                    <Field name={'last_name'}>
                      {props => (
                        <input 
                          {...props.input}
                        />
                      )}
                    </Field>
                  </div>
                  <button type={'submit'}>{LOGIN_PAGE_TEXT.enter}</button>
                  <button type={'button'} onClick={toggleForms}>
                    {LOGIN_PAGE_TEXT.orLogin}
                  </button>
                </form>
              )}
            </Form>
          )}
        </div>
      </div>
      {isRedirectToMain && <Redirect to={'/'} />}
    </>
	);
}