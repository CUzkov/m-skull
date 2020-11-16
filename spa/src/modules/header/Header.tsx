import * as React from "react";
import {FC, useState} from 'react'
import {Text} from 'components/text'
import ProfileIcon from 'assests/header/icons/profile.svg'
import CompassIcon from 'assests/header/icons/compass.svg'
import HomeIcon from 'assests/header/icons/home.svg'
import {Redirect} from 'react-router-dom'
import {HEADER_TITLE} from 'constants/header'

import './header.scss'

export const Header: FC = () => {

	const [isRedProfile, setIsRedProfile] = useState<boolean>(false);
	const [isRedMain, setIsRedMain] = useState<boolean>(false);
	const [isRedRecommended, setIsRedRecommended] = useState<boolean>(false);

	const onClickProfile = ():void => {
		setIsRedProfile(true);
	}
	const onClickMain = ():void => {
		setIsRedMain(true);
	}
	const onClickCompass = ():void => {
		setIsRedRecommended(true);
	}

	return(
		<>
			<div className={'Header' + ' F-R-SP'}>
				<Text text={HEADER_TITLE} color={'black'} onClick={onClickMain} size={'x'} />
				<div className={'icons F-R-SP'}>
					<div className={'profile'} onClick={onClickProfile} >
						<ProfileIcon />
					</div>
					<div className={'compass'} onClick={onClickCompass} >
						<CompassIcon />
					</div>
					<div className={'home'} onClick={onClickMain} >
						<HomeIcon />
					</div>
				</div>
			</div>
			{isRedProfile &&
				<Redirect to={'/profile'} />
			}
			{isRedMain &&
				<Redirect to={'/'} />
			}
			{isRedRecommended &&
				<Redirect to={'/recommended'} />
			}
		</>
	);
}