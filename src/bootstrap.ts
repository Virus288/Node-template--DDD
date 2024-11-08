import * as enums from './enums/index.js';
import UserController from './presentation/controllers/user/index.js';
import Log from './tools/logger/index.js';
import type * as types from './types';

/**
 * Wrapper for in app modules.
 */
export default class Bootstrap {
  private _controllers: Map<enums.EControllers, types.IController[enums.EControllers]> = new Map();

  private get controllers(): Map<enums.EControllers, types.IController[enums.EControllers]> {
    return this._controllers;
  }

  /**
   * Register new module.
   * @param target Module target.
   * @param value Module value.
   */
  register<T extends enums.EControllers>(target: T, value: types.IController[T]): void {
    this.controllers.set(target, value);
  }

  /**
   * Resolve new module.
   * @param target Module target.
   * @returns Registered module.
   */
  resolve<T extends enums.EControllers>(target: T): types.IController[T] | undefined {
    return this.controllers.get(target) as types.IController[T] | undefined;
  }

  /**
   * Initialize wrapper.
   */
  init(): void {
    Log.debug('Bootstrap', 'Initializing');

    this.register(enums.EControllers.Users, new UserController());
  }

  /**
   * Close wrapper.
   * This function is here, to clean registered controllers, if necessary.
   */
  close(): void {
    Log.log('Bootstrap', 'Closing');
  }
}
