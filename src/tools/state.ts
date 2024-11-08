import Log from './logger/index.js';
import type Bootstrap from '../bootstrap.js';
import type Router from '../presentation/router/index.js';
import type { IState } from '../types/index.js';

/**
 * Application state.
 */
class State implements IState {
  private _router: Router | null = null;
  private _controllers: Bootstrap | null = null;
  private _alive: boolean = false;

  get alive(): boolean {
    return this._alive;
  }

  set alive(val: boolean) {
    this._alive = val;
  }

  get router(): Router {
    return this._router!;
  }

  set router(value: Router) {
    this._router = value;
  }

  get controllers(): Bootstrap {
    return this._controllers!;
  }

  set controllers(val: Bootstrap) {
    this._controllers = val;
  }

  /**
   * Kill all connections and services.
   */
  @Log.decorateSyncLog('Server', 'Server closed')
  kill(): void {
    this.router.close();
    this.controllers.close();
  }
}

export default new State();
