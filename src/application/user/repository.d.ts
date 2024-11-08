import type User from '../../domain/user/index.js';
import type { IUserEntity } from '../../domain/user/types.js';

export interface IUserRepository {
  get(id: string): Promise<IUserEntity | null>;
  add(user: User): Promise<void>;
}
