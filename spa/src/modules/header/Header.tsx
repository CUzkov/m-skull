import * as React from "react";
import {FC} from 'react'
import {Text} from 'components/Text'
import ProfileIcon from 'assests/header/icons/profile.svg'
import CompassIcon from 'assests/header/icons/compass.svg'
import HomeIcon from 'assests/header/icons/home.svg'
import {Link} from 'react-router-dom'
import {HEADER_TITLE} from 'constants/header'

import './header.scss'

export const Header: FC = () => {

	return(
		<>
			<div className={'Header' + ' F-R-SP'}>
				<Link to={'/'} >
					<Text text={HEADER_TITLE} color={'black'} size={'x'} />
				</Link>
				<div className={'icons F-R-SP'}>
					<Link to={'/'}>
						<div className={'home'} >
							<HomeIcon />
						</div>
					</Link>
					<Link to={'/recomended'} >
						<div className={'compass'} >
							<CompassIcon />
						</div>
					</Link>
					<Link to={'/profile'} >
						<div className={'profile'} >
							<ProfileIcon />
						</div>
					</Link>
				</div>
			</div>
		</>
	);
}