export interface IUserAuthData {
	username: string,
	password: string
}

export interface IUserStore {
	login: string,
	refreshToken: string
}

export interface IUserProfile {
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
