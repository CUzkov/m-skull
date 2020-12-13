export interface IUserAuthData {
	username: string,
	password: string
}

export function ioIUserAuthData(object: any): object is IUserAuthData {
	return 'username' in object;
}

export interface IUserStore {
	login: string,
	refreshToken: string,
	id: number
}

export interface IUserProfile {
	user: {
		id: string,
		last_login: string,
		username: string,
		first_name: string,
		last_name: string,
		date_joined: string,
		birthday: string | null,
		profile_image: string | null,
		status: string,
		likes: number,
		dislikes: number,
		email: string
	}
}

export interface IUserId {
	id: number
}