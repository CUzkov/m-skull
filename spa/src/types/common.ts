import {IUserProfile} from './user';

export interface IAction<T> {
  type: string;
  payload: T;
}
export interface IGetDataArray<T> {
  data: T[];
}

export interface IGetData<T> {
  data: T;
}

export interface IError {
  error: string;
}

export interface ISucces {
  success: string;
}

export interface IChangeUserForm {
  username?: string;
  first_name?: string;
  last_name?: string;
  status?: string;
  birthday?: string;
}

export function ioIError(object: any): object is IError {
	return 'error' in object;
}

export function ioIGetDataUser(object: any): object is IGetData<IUserProfile> {
	return 'data' in object;
}

export function ioISuccesMessage(object: any): object is ISucces {
  return 'success' in object;
}
