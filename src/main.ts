import Bootstrap from './bootstrap.js';
import Router from './presentation/router/index.js';
import Liveness from './tools/liveness.js';
import Log from './tools/logger/index.js';
import State from './tools/state.js';
import type { IFullError } from './types/index.js';

/**
 * Main application entry.
 */
class App {
  private _liveness: Liveness | undefined;

  private get liveness(): Liveness | undefined {
    return this._liveness;
  }

  private set liveness(val: Liveness | undefined) {
    this._liveness = val;
  }

  /**
   * Try catch for app initialization.
   */
  init(): void {
    try {
      this.handleInit();
    } catch (err) {
      const { stack, message } = err as IFullError;
      Log.error('Server', 'Err while initializing app', message, stack);

      this.close();
    }
  }

  /**
   * Initialize application.
   */
  @Log.decorateSyncDebug('Server', 'Initializing')
  @Log.decorateSyncTime('Starting server')
  private handleInit(): void {
    const router = new Router();
    const bootstrap = new Bootstrap();

    State.router = router;
    State.controllers = bootstrap;

    bootstrap.init();
    router.init();

    Log.log('Server', 'Server started');

    this.liveness = new Liveness();
    this.liveness.init();

    this.listenForSignals();
    State.alive = true;
  }

  /**
   * Close application.
   */
  private close(): void {
    State.alive = false;
    this.liveness?.close();
    State.kill();
    this.liveness?.close();
  }

  /**
   * Listen for kill signals.
   */
  private listenForSignals(): void {
    process.on('SIGTERM', () => {
      Log.log('Server', 'Received signal SIGTERM. Gracefully closing');
      this.close();
    });
    process.on('SIGINT', () => {
      Log.log('Server', 'Received signal SIGINT. Gracefully closing');
      this.close();
    });
  }
}

const app = new App();
app.init();
