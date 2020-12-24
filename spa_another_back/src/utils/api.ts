import {ITokens, IAccess} from 'types/tokens';
import {IUserAuthData, IUserProfile, IUserId} from 'types/user';
import {IGetData, IError, ISucces, IChangeUserForm, IRegForm, ioIError} from 'types/common';
import {IIsFriendStruct, IUserFriendsStat} from 'types/friends';
import {ICreateMomentSlab} from 'types/moments';
import {IMoment, IPaginationResponse} from 'types/moments';

export let API_USER: string = '';
let API_FRIEND: string = '';
export let API_MOMENT: string = '';

const API = 'http://127.0.0.1:9999';

export class APIUser {
	static getToken = async (body: IUserAuthData):Promise<ITokens | IError> => {
		let response = await fetch(API + '/api/auth/auth/', {
			method: 'POST',
			body: JSON.stringify(body),
			mode: "cors"
		});
		let responseJSON: Promise<ITokens | IError> = response.json();
		return responseJSON;
	}
	static getAccessToken = async (token: string, userId: number):Promise<IAccess | IError> => {
		let response = await fetch(API + '/api/auth/refresh/', {
			method: 'POST',
			body: JSON.stringify({
				'refresh_token': token,
				'user_id': userId
			}),
			mode: "cors"
		});
		let responseJSON: Promise<IAccess | IError> = await response.json();
		return responseJSON;
	}
	static getMe = async (userId: number):Promise<IUserProfile | IError> => {
		let response = await fetch(API + `/api/users/${userId}/`, {
			method: 'GET',
			mode: 'cors'
		});
		let responseJSON: Promise<IUserProfile | IError> = response.json();
		return responseJSON;
	}
	// static changePhoto = async (token: string, img: any):Promise<ISucces | IError> => {
	// 	let response = await APIUser.getAccessToken(token)
	// 		.then( async (accessToken) => {
	// 			if (ioIAccessError(accessToken)) {
	// 				if (accessToken.code === 'token_not_valid') {
	// 					return {
	// 						error: 'token_not_valid'
	// 					}
	// 				}
	// 			} else {
	// 				const formData = new FormData();
	// 				formData.append('file', img.files[0]);
	// 				let response = await fetch(API_USER + '/api/users/chPhoto/', {
	// 					method: 'POST',
	// 					headers: {
	// 						'Authorization': 'Bearer ' + accessToken.access
	// 					},
	// 					body: formData
	// 				});
	// 				return response.json();
	// 			}
	// 		});
	// 	return response;
	// }
	// static changeUserData = async (token: string, userForm: IChangeUserForm):Promise<ISucces | IError> => {
	// 	let response = await APIUser.getAccessToken(token)
	// 		.then( async (accessToken) => {
	// 			if (ioIAccessError(accessToken)) {
	// 				if (accessToken.code === 'token_not_valid') {
	// 					return {
	// 						error: 'token_not_valid'
	// 					}
	// 				}
	// 			} else {
	// 				let response = await fetch(API_USER + '/api/users/update/', {
	// 					method: 'PUT',
	// 					headers: {
	// 						'Authorization': 'Bearer ' + accessToken.access
	// 					},
	// 					body: JSON.stringify(userForm)
	// 				});
	// 				return response.json();
	// 			}
	// 		});
	// 	return response;
	// }
	static regUser = async (userForm: IRegForm):Promise<ISucces | IError> => {
		userForm['photo'] = 'https://firebasestorage.googleapis.com/v0/b/noskool-sn.appspot.com/o/unnamed.jpg?alt=media&token=e3f065f3-a5f5-41f8-b717-a97d2fa5e207';
		delete userForm['repeat_password'];
		let response = await fetch(API + '/api/users/create/', {
			method: 'POST',
			body: JSON.stringify(userForm),
			mode: "cors"
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
	static getUserId = async (username: string):Promise<IUserId | IError> => {
		let response = await fetch(API + `/api/users/${username}/`);
		let responseJSON: Promise<IUserId | IError> = response.json();
		return responseJSON;
	}
	// static changeFriends = async (token: string, type: 'add' | 'del', userId: number, purposeId: number):Promise<ISucces | IError> => {
	// 	let response = await APIUser.getAccessToken(token)
	// 		.then( async (accessToken) => {
	// 			if (ioIAccessError(accessToken)) {
	// 				if (accessToken.code === 'token_not_valid') {
	// 					return {
	// 						error: 'token_not_valid'
	// 					}
	// 				}
	// 			} else {
	// 				let response = await fetch(API_FRIEND + `/api/friends/update/${userId}/`, {
	// 					method: 'PUT',
	// 					headers: {
	// 						'Authorization': 'Bearer ' + accessToken.access
	// 					},
	// 					body: JSON.stringify({
	// 						user: {
	// 							id: purposeId,
	// 							status: type
	// 						}
	// 					})
	// 				});
	// 				return response.json();
	// 			}
	// 		});
	// 	return response;
	// }
	static getUserFriendStat = async (userId: number):Promise<IUserFriendsStat | IError> => {
		let response = await fetch(API + `/api/friends/get_stat/`, {
			method: 'POST',
			body: JSON.stringify({
				"user_1": userId
			}),
			mode: "cors"
		});
		let responseJSON: Promise<IUserFriendsStat | IError> = response.json();
		return responseJSON;
	}
	static createMoment = async (token: string, momentForm: ICreateMomentSlab):Promise<ISucces | IError> => {
		let formData = new FormData();
		for (let entry in momentForm) {
			if (entry == 'img') {
				for (let i = 0; i < momentForm.img.length; i++) {
					formData.append(String(i), momentForm.img[i])
				}
			} else {	
				formData.append(entry, momentForm[entry]);
			}
		}
		let response = await fetch(API_MOMENT + '/api/moments/create/', {
			method: 'POST',
			body: formData
		});
		let responseJSON: Promise<ISucces | IError> = response.json();
		return responseJSON;
	}
	static getUserTape = async (userId: number):Promise<IPaginationResponse<IMoment> | IError> => {
		let response = await fetch(API_MOMENT + `/api/moments/user/tape/${userId}/`);
		let responseJSON: Promise<IPaginationResponse<IMoment> | IError> = response.json();
		return responseJSON;
	}
	// static addLike = async (token: string, user: number, moment: number):Promise<ISucces | IError> => {
	// 	let response = await APIUser.getAccessToken(token)
	// 		.then( async (accessToken) => {
	// 			if (ioIAccessError(accessToken)) {
	// 				if (accessToken.code === 'token_not_valid') {
	// 					return {
	// 						error: 'token_not_valid'
	// 					}
	// 				}
	// 			} else {
	// 				let response = await fetch(API_MOMENT + '/api/moments/like/add/', {
	// 					method: 'PUT',
	// 					headers: {
	// 						'Authorization': 'Bearer ' + accessToken.access
	// 					},
	// 					body: JSON.stringify({
	// 						moment_id: moment,
	// 						user_id: user
	// 					})
	// 				});
	// 				return response.json();
	// 			}
	// 		});
	// 	return response;
	// }
	// static delLike = async (token: string, user: number, moment: number):Promise<ISucces | IError> => {
	// 	let response = await APIUser.getAccessToken(token)
	// 		.then( async (accessToken) => {
	// 			if (ioIAccessError(accessToken)) {
	// 				if (accessToken.code === 'token_not_valid') {
	// 					return {
	// 						error: 'token_not_valid'
	// 					}
	// 				}
	// 			} else {
	// 				let response = await fetch(API_MOMENT + '/api/moments/like/del/', {
	// 					method: 'PUT',
	// 					headers: {
	// 						'Authorization': 'Bearer ' + accessToken.access
	// 					},
	// 					body: JSON.stringify({
	// 						moment_id: moment,
	// 						user_id: user
	// 					})
	// 				});
	// 				return response.json();
	// 			}
	// 		});
	// 	return response;
	// }
	static getMomentByIdUserid = async (momentId: number, userId: number):Promise<IGetData<IMoment> | IError> => {
		let response = await fetch(API_MOMENT + `/api/moments/once/${momentId}/${userId}/`);
		let responseJSON: Promise<IGetData<IMoment> | IError> = response.json();
		return responseJSON;
	}
	static getAllMoments = async (useId: number):Promise<IPaginationResponse<IMoment> | IError> => {
		let response = await fetch(API_MOMENT + `/api/moments/all/${useId}/`);
		let responseJSON: Promise<IPaginationResponse<IMoment> | IError> = response.json();
		return responseJSON;
	}
	static getUser = async (useId: number):Promise<IPaginationResponse<IMoment> | IError> => {
		let response = await fetch(API_MOMENT + `/api/moments/user/${useId}/`);
		let responseJSON: Promise<IPaginationResponse<IMoment> | IError> = response.json();
		return responseJSON;
	}
}
