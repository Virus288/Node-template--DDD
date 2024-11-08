import type * as enums from '../../enums/index.js';
import type * as types from '../../types/index.js';

export default abstract class AbstractRepository<T extends enums.EModules> implements types.IGenericRepository<T> {
  /**
   * Get data from database.
   * @param _id Target's id.
   * @returns Data from database.
   */
  async get(_id: string): Promise<types.IRepositoryGetData[T] | null> {
    return new Promise((resolve) => {
      resolve(null);
    });
  }

  /**
   * Add param to database.
   * @param _data Target's data.
   */
  async add(_data: types.IRepositoryAddData[T]): Promise<void> {
    return new Promise<void>((resolve) => {
      resolve();
    });
  }
}
