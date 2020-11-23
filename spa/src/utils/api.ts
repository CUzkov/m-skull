import {ITokens, IRefresh, IAccess} from 'types/tokens';
import {IUserAuthData, IUserProfile} from 'types/user';
import {IGetData, IGetDataUser} from 'types/common';

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
	static getAccessToken = async (token: string):Promise<IAccess> => {
		let response = await fetch(API_USER + '/api/token/refresh/', {
			method: 'POST',
			body: JSON.stringify({
				'refresh': token,
			}),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			}
		});
		let responseJSON: Promise<IAccess> = await response.json();
		return responseJSON;
	}
	static getMe = async (token: string):Promise<IGetDataUser<IUserProfile>> => {
		let response = await APIUser.getAccessToken(token)
			.then( async (accessToken) => {
				let response = await fetch(API_USER + '/api/users/me/', {
					method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + accessToken.access
					}
				});
				return response.json();
			});
		return response;
	}
}
