import type { IUserEntity } from '../../../domain/user/types.js';

export interface IGetUserDto {
  id: string;
}

export type IGetUserEntity = Omit<IUserEntity, '_id' | 'password'>;
