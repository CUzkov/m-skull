import * as React from "react";
import {FC, useState, useCallback, useRef} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {APIUser, API_USER} from 'utils/api';
import {IUserProfileFind} from 'types/user';
import {ioIError} from 'types/common';
import {IUserStore} from 'types/user';

import './search-page.scss';

export const SearchPage: FC = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [users, setUsers] = useState<IUserProfileFind[]>(null);
  const inputRef = useRef(null);
  const userStore: IUserStore = useSelector(state => state.user);

  const inputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>):void => {
    setInputValue(e.target.value);
    if (e.target.value !== '') {
      APIUser.findFriends(e.target.value)
        .then(res => {
          if (!ioIError(res)) {
            setUsers(res.data);
          }
          else {
            setUsers([]);
          }
        })
    } else {
      setUsers([]);
    }
  }, [inputValue]);

	return(
    <div className={'search-page'}>
      <div className={'wrapper-search'}>
        <div className={'input-wrapper'} >
          <input 
            ref={inputRef}
            value={inputValue}
            onChange={inputOnChange}
            placeholder={'Начни вводить ник...'}
          />
        </div>
        <div className={'found-users F-R-SP'} >
          {users?.map((user, index) => (
            <Link to={userStore.id === Number(user.id) ? '/profile' : `/profile/${user.id}`} key={index}>
              <div className={'user-card F-R-S'} >
                <img src={API_USER + user.profile_image} />
                <div className={'nickname'} >{user.username}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {}
    </div>
	);
}
