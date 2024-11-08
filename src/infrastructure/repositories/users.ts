import AbstractRepository from '../../tools/abstract/repository.js';
import Log from '../../tools/logger/index.js';
import type { IUserRepository } from '../../application/user/repository.js';
import type User from '../../domain/user/index.js';
import type { IUserEntity } from '../../domain/user/types.d.ts';
import type * as enums from '../../enums/index.js';

export default class UsersRepository extends AbstractRepository<enums.EModules.User> implements IUserRepository {
  /**
   * Get data from database.
   * @param _id Target's id.
   * @returns Data from database.
   */
  override async get(_id: string): Promise<IUserEntity | null> {
    return new Promise((resolve) => {
      resolve(null);
    });
  }

  /**
   * Add param to database.
   * @param data Target's data.
   */
  override async add(data: User): Promise<void> {
    return new Promise<void>((resolve) => {
      Log.debug('Repository - users', 'Adding new user', data);
      resolve();
    });
  }
}
