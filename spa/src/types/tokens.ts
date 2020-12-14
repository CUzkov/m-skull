export interface ITokens {
	refresh: string;
	access: string;
}

export interface IRefresh {
	refresh: string
}

export interface IAccess {
	access: string
}

export interface IAccessError {
	detail: string,
	code: string,
	messages: {
		token_class: string,
		token_type: string,
		message: string
	}[]
}

export function ioIAccessError(object: any): object is IAccessError {
	return 'code' in object;
}

export function ioIAccess(object: any): object is IAccess {
	return 'access' in object;
}
