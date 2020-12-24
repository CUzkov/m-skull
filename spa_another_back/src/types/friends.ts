export interface IIsFriendStruct {
  confusing: {
    isFriends: boolean,
    isHeSub: boolean,
    isWeSub: boolean,
    isNotConf: boolean
  }
}

export interface IUserFriendsStat {
  response: string;
  friends_amount: number;
  we_subscribed: number;
  he_subscribed: number;
}
