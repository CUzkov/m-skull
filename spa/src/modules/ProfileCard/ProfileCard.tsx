import * as React from "react";
import {FC, useState, useCallback, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {PROFILE_CARD_TEXT} from 'constants/profile-card';
import SettingsIcon from 'assests/profile-page/icons/settings.svg'
import {setNoneAuth} from 'store/actionsCreators/userActionCreator';
import {IIsFriendStruct} from 'types/friends';
import {APIUser} from 'utils/api';
import {IUserStore} from 'types/user';
import {ioIError} from 'types/common';
import {IUserFriendsStat} from 'types/friends';

import './profile-card.scss'

interface ProfileCardProps {
	name: string,
	photoPath: string,
	momentsQuantity: number,
	firstName: string,
	lastName: string,
	userNumber: number | undefined,
	status_ico: string,
	status: string
}

export const ProfileCard: FC<ProfileCardProps> = ({
	photoPath,
	name,
	momentsQuantity,
	lastName,
	firstName,
	userNumber,
	status_ico,
	status
}: ProfileCardProps) => {

	const [isRedProfileSettings, setIsRedProfileSettings] = useState<boolean>(false);
  const [userFriendsStat, setUserFriendsStat] = useState<IUserFriendsStat>(null);
  const [isFriendStruct, setIsFriendStruct] = useState<IIsFriendStruct>(null);
	const userStore: IUserStore = useSelector(state => state.user);
	const dispatch = useDispatch();
	const onLogout = useCallback(() => {
		dispatch(setNoneAuth());
	}, []);

	const refesh = () => {
		APIUser.getIsPurposeUserFriend(userNumber, userStore.id)
			.then(res => {
				if (!ioIError(res)) {
					setIsFriendStruct(res.data);
				}
			});
		APIUser.getUserFriendStat(userNumber)
			.then(res => {
				console.log('dwadad')
				if (!ioIError(res)) {
					setUserFriendsStat(res.data);
				}
			})
	};

	useEffect(() => {
		let isMounted = true;
		if(userNumber && isMounted) {
			refesh();
		} else {
			APIUser.getUserFriendStat(userStore.id)
				.then(res => {
					if (!ioIError(res) && isMounted) {
						setUserFriendsStat(res.data);
					}
				})
		}
		return () => { isMounted = false; };
	}, []);

	const onAddFriend = useCallback(() => {
		APIUser.changeFriends(userStore.refreshToken, 'add', userStore.id, userNumber)
			.then(res => {
				if (!ioIError(res)) {
					refesh();
				}
			})
	}, []);

	const onDelFriend = useCallback(() => {
		APIUser.changeFriends(userStore.refreshToken, 'del', userStore.id, userNumber)
			.then(res => {
				if (!ioIError(res)) {
					refesh();
				}
			})
	}, []);

	return(
		<>
			<div className={'profile-card' + ' F-R-SP'}>
				<img src={photoPath} alt=""/>
				<div className={'content F-C-SP'} >
					<div className={'F-R-SP'} >
						<div className={'user-status F-R-S'} >
              <div className={'username'}>
                {name}
              </div>
              <img src={status_ico} />
            </div>
						{!userNumber ? (
							<div style={{cursor: 'pointer'}} onClick={() => setIsRedProfileSettings(true)} >
								<SettingsIcon />
							</div>
						) : (
							<>
								{isFriendStruct?.confusing.isFriends && <button onClick={onDelFriend}>Удалить из друзей</button>}
								{isFriendStruct?.confusing.isHeSub && <button onClick={onAddFriend}>Принять заявку в друзья</button>}
								{isFriendStruct?.confusing.isWeSub && <button onClick={onDelFriend}>Отменить заявку в друзья</button>}
								{isFriendStruct?.confusing.isNotConf && <button onClick={onAddFriend}>Отправить заявку в друзья</button>}
							</>
						)}
					</div>
					<div className={'statistics F-R-SP'} >
						<div>{PROFILE_CARD_TEXT.mQuantity + ': ' + momentsQuantity}</div>
						<div>{PROFILE_CARD_TEXT.msQuantity + ': ' + userFriendsStat?.my_followers}</div>
						<div>{PROFILE_CARD_TEXT.fQuantity + ': ' + userFriendsStat?.my_friends}</div>
						<div>{PROFILE_CARD_TEXT.sQuantity + ': ' + userFriendsStat?.i_follow}</div>
					</div>
					<div>{`${firstName} ${lastName}`}</div>
					{!userNumber &&
						<div className={'F-R-SP'} >
							<div>{'Статус: ' + status}</div>
							<button onClick={onLogout}>Выйти</button>
						</div>
					}
				</div>
			</div>
			{isRedProfileSettings && <Redirect to={'/profile-settings'} /> }
		</>
	);
}
