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
	password: string,
	last_login: string,
	is_superuser: boolean,
	username: string,
	first_name: string,
	last_name: string,
	is_staff: boolean,
	is_active: boolean,
	date_joined: string,
	birthday: string | null,
	profile_image: string | null,
	status: string,
	likes: number,
	dislikes: number,
	email: string
}
