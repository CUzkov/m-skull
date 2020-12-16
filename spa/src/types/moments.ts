export interface ICreateMoment {
  title: string;
  description?: string;
  user_id: number,
  tags?: string,
  img?: string[]
}

export interface ICreateMomentSlab {
  title: string;
  description?: string;
  user_id: number,
  // tags?: string,
  img?: any[]
}

export interface IMoment {
  id: number,
  title: string,
  description: string,
  user_id: number,
  creation_date: string,
  date_of_update: string,
  likes: number,
  comments: string,
  liked_users_id: string,
  tags_id: string,
  image: string[]
}

export interface IPaginationResponse<T> {
  count: number,
  next: string | null,
  previous: string | null,
  results: T[]
}
