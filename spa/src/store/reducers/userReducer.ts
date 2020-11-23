import {IAction} from 'types/common';
import { IUserStore } from 'types/user';
import {SET_AUTHS} from 'store/actions/userAction';

const initialState: IUserStore = {
  login: '',
  refreshToken: ''
}

export const userReducer = (state: IUserStore = initialState, action: IAction<IUserStore>): IUserStore => {
  switch (action.type) {
    case SET_AUTHS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}
