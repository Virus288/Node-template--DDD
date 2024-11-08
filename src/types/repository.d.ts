import type User from '../domain/user/index.js';
import type { IUserEntity } from '../domain/user/types.js';
import type * as enums from '../enums/index.js';

export interface IRepositoryGetData {
  [enums.EModules.User]: IUserEntity | null;
}

export interface IRepositoryAddData {
  [enums.EModules.User]: User;
}

export interface IGenericRepository<T extends enums.EModules> {
  get(id: string): Promise<IRepositoryGetData[T]>;
  add(data: IRepositoryAddData[T]): Promise<void>;
}
