import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import { IncorrectDataTypeError, InternalError } from '../../errors/index.js';
import getConfig from '../../tools/configLoader.js';
import Log from '../../tools/logger/index.js';
import errLogger from '../../tools/logger/logger.js';
import type { IFullError, IUserLocals } from '../../types/index.js';
import type { Express } from 'express';
import { randomUUID } from 'crypto';

/**
 * Application middleware.
 */
export default class Middleware {
  /**
   * Disable cache for selected request. Useful, whenever you are trying to send data, which is cached by browsers / cdns.
   * @param _req Express request.
   * @param res Express response.
   * @param next Express next.
   */
  static setNoCache(_req: express.Request, res: express.Response, next: express.NextFunction): void {
    res.set('cache-control', 'no-store');
    next();
  }

  /**
   * Generate basic middleware.
   * @param app Express application.
   */
  generateMiddleware(app: Express): void {
    app.use(express.json({ limit: '10kb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(
      cors({
        origin: getConfig().corsOrigin,
        credentials: true,
      }),
    );

    const helmetDirectives = helmet.contentSecurityPolicy.getDefaultDirectives();
    const allowedUrls = getConfig().corsOrigin;
    app.use(
      helmet({
        contentSecurityPolicy: {
          useDefaults: false,
          directives: {
            ...helmetDirectives,
            'form-action': ["'self'", ...allowedUrls],
            'script-src': ["'self'"],
            'script-src-attr': ["'self'"],
            'default-src': ["'self'", 'data:'],
            'frame-ancestors': ["'self'", ...allowedUrls],
            'frame-src': ["'self'", ...allowedUrls],
            'connect-src': ["'self'", ...allowedUrls],
          },
        },
      }),
    );
    app.use((_req: express.Request, res, next: express.NextFunction) => {
      res.header('Content-Type', 'application/json;charset=UTF-8');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET,OPTIONS'); // Make sure to update this, whenever you add new methods
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    app.use(
      session({
        secret: getConfig().session.secret,
        resave: false,
        rolling: true,
        saveUninitialized: true,
        cookie: {
          secure: getConfig().session.secured,
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
        },
        name: 'auth.sid',
      }),
    );
    app.set('views', 'public');
    app.use('/public', express.static('public/static'));
    app.get('/favicon.ico', (_req, res) => {
      res.status(404).send();
    });
    app.set('view engine', 'ejs');

    app.use((req, _res, next) => {
      try {
        const logBody: Record<string, string | Record<string, string>> = {
          method: req.method,
          path: req.path,
          ip: req.ip as string,
        };

        if (req.query) logBody.query = JSON.stringify(req.query);
        if (
          req.body !== undefined &&
          typeof req.body === 'object' &&
          Object.keys(req.body as Record<string, string>).length > 0
        ) {
          if (req.path.includes('interaction') || req.path.includes('register') || req.path.includes('remove')) {
            logBody.body = { ...(req.body as Record<string, string>) };

            if (logBody.body.password) {
              logBody.body.password = '***';
            }
          } else {
            logBody.body = req.body as Record<string, string>;
          }
        }

        Log.log('New req', logBody);
        next();
      } catch (err) {
        Log.error('Middleware validation', err);
      }
    });

    app.use((req: express.Request, res: express.Response<unknown, IUserLocals>, next: express.NextFunction) => {
      res.locals.id = randomUUID();
      Log.time(res.locals.id);

      res.once('finish', () => {
        Log.endTime(res.locals.id, { path: req.originalUrl, method: req.method });
      });

      next();
    });
  }

  /**
   * Generate global error handler.
   * @param app Express application.
   */
  generateErrHandler(app: Express): void {
    app.use(
      (err: express.Errback | IFullError, req: express.Request, res: express.Response, _next: express.NextFunction) => {
        errLogger
          .error('Caught new generic error')
          .error(`Caused by ${req.ip ?? 'unknown ip'}`)
          .error(JSON.stringify(err));
        const error = err as IFullError;

        if (error.message.includes('is not valid JSON')) {
          Log.error('Middleware', 'Received req is not of json type', error.message, error.stack);
          const { message, name, status } = new IncorrectDataTypeError();
          res.status(status).json({ message, name });
          return;
        }
        if (error.name === 'SyntaxError') {
          Log.error('Middleware', 'Generic err', error.message, error.stack);
          const { message, code, name, status } = new InternalError();
          res.status(status).json({ message, code, name });
          return;
        }
        if (error.code !== undefined) {
          const { message, code, name, status } = error;
          res.status(status).json({ message, code, name });
          return;
        }
        Log.error('Middleware', 'Generic err', error.message, error.stack);
        const { message, code, name, status } = new InternalError();
        res.status(status).json({ message, code, name });
      },
    );
  }
}
