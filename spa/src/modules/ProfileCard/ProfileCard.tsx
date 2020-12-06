import * as React from "react";
import {FC, useState, useCallback} from 'react';
import {Redirect} from 'react-router-dom'; 

import {Text} from 'components/Text';
import {PROFILE_CARD_TEXT} from 'constants/profile-card';
import SettingsIcon from 'assests/profile-page/icons/settings.svg'
import {useDispatch} from 'react-redux';
import {setNoneAuth} from 'store/actionsCreators/userActionCreator';

import './profile-card.scss'

interface ProfileCardProps {
	name: string,
	photoPath: string,
	friendsQuantity: number,
	subsQuantity: number,
	mySubsQuantity: number,
	momentsQuantity: number,
	firstName: string,
	lastName: string
}

export const ProfileCard: FC<ProfileCardProps> = ({
	photoPath,
	name,
	friendsQuantity,
	momentsQuantity,
	mySubsQuantity,
	subsQuantity,
	lastName,
	firstName
}: ProfileCardProps) => {

	const [isRedProfileSettings, setIsRedProfileSettings] = useState<boolean>(false);
	const dispatch = useDispatch();
	const onLogout = useCallback(() => {
		dispatch(setNoneAuth());
	}, []);

	return(
		<>
			<div className={'profile-card' + ' F-R-SP'}>
				<img src={photoPath} alt=""/>
				<div className={'content F-C-SP'} >
					<div className={'F-R-SP'} >
						<Text text={name} size={'x'} />
						<div style={{cursor: 'pointer'}} onClick={() => setIsRedProfileSettings(true)} >
							<SettingsIcon />
						</div>
					</div>
					<div className={'statistics F-R-SP'} >
						<Text size={'l'} text={PROFILE_CARD_TEXT.mQuantity + ': ' + momentsQuantity}/>
						<Text size={'l'} text={PROFILE_CARD_TEXT.msQuantity + ': ' + mySubsQuantity}/>
						<Text size={'l'} text={PROFILE_CARD_TEXT.fQuantity + ': ' + friendsQuantity}/>
					</div>
					<div>
						<Text size={'l'} text={`${firstName} ${lastName}`}/>
					</div>
					<div className={'F-R-FE'} >
						<button onClick={onLogout}>Выйти</button>
					</div>
				</div>
			</div>
			{isRedProfileSettings && <Redirect to={'/profile-settings'} /> }
		</>
	);
}