import {
	ITokens,
	IAccess,
	IAccessError,
	ioIAccessError
} from 'types/tokens';
import {IUserAuthData, IUserProfile, IUserId} from 'types/user';
import {IGetData, IError, ISucces, IChangeUserForm, IRegForm} from 'types/common';
import {IIsFriendStruct} from 'types/friends';

export const API_USER: string = 'http://127.0.0.1:8080';
const API_FRIEND: string = 'http://127.0.0.1:8082';
const API_MOMENT: string = 'http://127.0.0.1:8081';

export class APIUser {
	static getToken = async (body: IUserAuthData):Promise<ITokens> => {
		let response = await fetch(API_USER + '/api/token/', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			}
		});
		let responseJSON: Promise<ITokens> = response.json();
		return responseJSON;
	}
	static getAccessToken = async (token: string):Promise<IAccess | IAccessError> => {
		let response = await fetch(API_USER + '/api/token/refresh/', {
			method: 'POST',
			body: JSON.stringify({
				'refresh': token,
			}),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			}
		});
		let responseJSON: Promise<IAccess | IAccessError> = await response.json();
		return responseJSON;
	}
	static getMe = async (token: string):Promise<IGetData<IUserProfile> | IError> => {
		let response = await APIUser.getAccessToken(token)
			.then( async (accessToken) => {
				if (ioIAccessError(accessToken)) {
					if (accessToken.code === 'token_not_valid') {
						return {
							error: 'token_not_valid'
						}
					}
				} else {
					let response = await fetch(API_USER + '/api/users/me/', {
						method: 'GET',
						headers: {
							'Authorization': 'Bearer ' + accessToken.access
						}
					});
					return response.json();
				}
			});
		return response;
	}
	static changePhoto = async (token: string, img: any):Promise<ISucces | IError> => {
		let response = await APIUser.getAccessToken(token)
			.then( async (accessToken) => {
				if (ioIAccessError(accessToken)) {
					if (accessToken.code === 'token_not_valid') {
						return {
							error: 'token_not_valid'
						}
					}
				} else {
					const formData = new FormData();
					formData.append('file', img.files[0]);
					let response = await fetch(API_USER + '/api/users/chPhoto/', {
						method: 'POST',
						headers: {
							'Authorization': 'Bearer ' + accessToken.access
						},
						body: formData
					});
					return response.json();
				}
			});
		return response;
	}
	static changeUserData = async (token: string, userForm: IChangeUserForm):Promise<ISucces | IError> => {
		let response = await APIUser.getAccessToken(token)
			.then( async (accessToken) => {
				if (ioIAccessError(accessToken)) {
					if (accessToken.code === 'token_not_valid') {
						return {
							error: 'token_not_valid'
						}
					}
				} else {
					let response = await fetch(API_USER + '/api/users/update/', {
						method: 'PUT',
						headers: {
							'Authorization': 'Bearer ' + accessToken.access
						},
						body: JSON.stringify(userForm)
					});
					return response.json();
				}
			});
		return response;
	}
	static regUser = async (userForm: IRegForm):Promise<ISucces | IError> => {
		let response = await fetch(API_USER + '/api/users/create/', {
			method: 'POST',
			body: JSON.stringify(userForm),
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			}
		});
		let responseJSON: Promise<ISucces | IError> = response.json();
		return responseJSON;
	}
	static getUserById = async (userId: number):Promise<IGetData<IUserProfile> | IError> => {
		let response = await fetch(API_USER + `/api/users/${userId}/`);
		let responseJSON: Promise<IGetData<IUserProfile> | IError> = response.json();
		return responseJSON;
	}
	static getIsPurposeUserFriend = async (purposeId: number, userId: number):Promise<IGetData<IIsFriendStruct> | IError> => {
		let response = await fetch(API_FRIEND + `/api/friends/isFriend/${purposeId}/${userId}/`, {
			method: 'GET'
		});
		let responseJSON: Promise<IGetData<IIsFriendStruct> | IError> = response.json();
		return responseJSON;
	}
	static getUserId = async (username: string):Promise<IGetData<IUserId> | IError> => {
		let response = await fetch(API_USER + `/api/users/me/${username}/`);
		let responseJSON: Promise<IGetData<IUserId> | IError> = response.json();
		return responseJSON;
	}
	static changeFriends = async (token: string, type: 'add' | 'del', userId: number, purposeId: number):Promise<ISucces | IError> => {
		let response = await APIUser.getAccessToken(token)
			.then( async (accessToken) => {
				if (ioIAccessError(accessToken)) {
					if (accessToken.code === 'token_not_valid') {
						return {
							error: 'token_not_valid'
						}
					}
				} else {
					let response = await fetch(API_FRIEND + `/api/friends/update/${userId}/`, {
						method: 'PUT',
						headers: {
							'Authorization': 'Bearer ' + accessToken.access
						},
						body: JSON.stringify({
							user: {
								id: purposeId,
								status: type
							}
						})
					});
					return response.json();
				}
			});
		return response;
	}
}
