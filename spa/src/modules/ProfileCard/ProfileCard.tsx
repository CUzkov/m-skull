import * as React from "react";
import {FC} from 'react'
import {ProfileCardDto} from 'models/ProfileCardDto'
import {Text} from 'components/Text'
import {PROFILE_CARD_TEXT} from 'constants/profile-card'

import './profile-card.scss'

interface ProfileCardProps extends ProfileCardDto {

}

export const ProfileCard: FC<ProfileCardProps> = ({
	photoPath,
	name,
	friendsQuantity,
	momentsQuantity,
	mySubsQuantity,
	subsQuantity
}: ProfileCardProps) => {
	return(
		<div className={'profile-card' + ' F-R-SP'}>
			<img src={photoPath} alt=""/>
			<div className={'content F-C-SP'} >
				<Text text={name} size={'x'} />
				<div className={'statistics F-R-SP'} >
					<Text size={'l'} text={PROFILE_CARD_TEXT.mQuantity + ': ' + momentsQuantity}/>
					<Text size={'l'} text={PROFILE_CARD_TEXT.msQuantity + ': ' + mySubsQuantity}/>
					<Text size={'l'} text={PROFILE_CARD_TEXT.fQuantity + ': ' + friendsQuantity}/>
				</div>
				<div>
					<Text size={'l'} text={'Усков Даниил'}/>
				</div>
			</div>
		</div>
	);
}