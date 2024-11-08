import type * as enums from '../../enums/index.js';
import type * as types from '../../types/index.js';

export default abstract class AbstractController<T extends enums.EControllers> {
  private readonly _controllers: Map<
    enums.EBaseControllerActions,
    types.IInnerController[T][enums.EBaseControllerActions]
  > = new Map<enums.EBaseControllerActions, types.IInnerController[T][enums.EBaseControllerActions]>();

  constructor() {
    this.init();
  }
  private get controllers(): Map<
    enums.EBaseControllerActions,
    types.IInnerController[T][enums.EBaseControllerActions]
  > {
    return this._controllers;
  }

  /**
   * Register new controller.
   * @param target Target to register.
   * @param value Initialized controller.
   */
  register<N extends types.IControllerAcitons>(
    target: N,
    value: types.IInnerController[T][enums.EBaseControllerActions],
  ): void {
    this.controllers.set(target, value);
  }

  /**
   * Resolve new controller.
   * @param target Registered target.
   * @returns Registered target.
   */
  resolve<N extends types.IControllerAcitons>(
    target: N,
  ): types.IInnerController[T][enums.EBaseControllerActions] | undefined {
    return this.controllers.get(target);
  }

  /**
   * Register all controllers.
   * @returns {void} Void.
   */
  protected init(): void {
    return undefined;
  }
}
