import express from 'express';
import Middleware from './middleware.js';
import AppRouter from './router.js';
import getConfig from '../../tools/configLoader.js';
import Log from '../../tools/logger/index.js';
import http from 'http';

/**
 * Main app router.
 */
export default class Router {
  private readonly _app: express.Express;
  private readonly _middleware: Middleware;
  private readonly _router: AppRouter;
  private _server: http.Server | undefined = undefined;

  constructor() {
    this._app = express();
    this._middleware = new Middleware();
    this._router = new AppRouter(this.app);
  }

  private get app(): express.Express {
    return this._app;
  }

  private get middleware(): Middleware {
    return this._middleware;
  }

  private get router(): AppRouter {
    return this._router;
  }

  private get server(): http.Server {
    return this._server!;
  }

  getServer(): http.Server {
    return this.server;
  }

  /**
   * Init server.
   */
  @Log.decorateSyncDebug('Router', 'Initializing')
  init(): void {
    this.initDocs();
    this.initMiddleware();
    this.initRouter();
    this.initServer();
    this.initErrHandler();
  }

  /**
   * Close server.
   */
  close(): void {
    Log.log('Server', 'Closing');
    if (!this.server) return;

    this.server.closeAllConnections();
    this.server.close();
  }

  /**
   * Initialize middleware.
   */
  private initMiddleware(): void {
    this.middleware.generateMiddleware(this.app);
  }

  /**
   * Init err handler, catching errors in whole app.
   */
  private initErrHandler(): void {
    this.middleware.generateErrHandler(this.app);
  }

  /**
   * Initialize docs routes.
   */
  private initDocs(): void {
    this.router.initDocs();
  }

  /**
   * Initialize basic routes.
   */
  private initRouter(): void {
    this.router.initRoutes();
  }

  /**
   * Initialize server.
   */
  private initServer(): void {
    this._server = http.createServer(this.app);

    if (process.env.NODE_ENV === 'test') return;

    const { port } = getConfig();

    this.server.listen(port, () => {
      Log.log('Server', `Listening on ${port}`);
    });
  }
}
