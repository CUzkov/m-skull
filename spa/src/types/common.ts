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
// надо переделать
export interface IGetDataUser<T> {
  data: {
    user: T;
  };
}
