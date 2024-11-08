import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import initUserRoutes from './modules/user/index.js';
import getConfig from '../../tools/configLoader.js';
import State from '../../tools/state.js';
import type { Router } from 'express';
import type swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';

/**
 * Main app router.
 */
export default class AppRouter {
  private readonly _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  private get router(): Router {
    return this._router;
  }

  /**
   * Init application routes.
   */
  initRoutes(): void {
    initUserRoutes(this.router);
  }

  /**
   * Init swagger docs.
   */
  initDocs(): void {
    if (process.env.NODE_ENV === 'production') return;

    const jsonPackage = JSON.parse(fs.readFileSync('package.json').toString()) as Record<string, string>;
    const options: swaggerJsdoc.Options = {
      definition: {
        openapi: '3.0.1',
        description: 'This is a REST API for my server',
        servers: [
          {
            url: getConfig().myAddress,
            description: 'Development server',
          },
        ],
        info: {
          title: 'My app API doc',
          version: jsonPackage.version as string,
        },
        component: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      apis: [
        './src/errors/index.ts',
        './src/presentation/router/modules/*/*/index.ts',
        './src/presentation/controllers/*/schemas/*/entity.ts',
        './src/presentation/controllers/*/schemas/*/dto.ts',
        './src/errors/index.js',
        './src/presentation/router/modules/*/*/index.js',
        './src/presentation/controllers/*/schemas/*/entity.js',
        './src/presentation/controllers/*/schemas/*/dto.js',
      ],
    };

    const swaggerSpec = swaggerJSDoc(options);
    this.router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.router.get('docs.json', (_req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });
  }

  /**
   * Init health routes, used by readiness check.
   */
  initHealh(): void {
    this.router.get('/health', (_req, res) => {
      const { alive } = State;

      alive ? res.sendStatus(200) : res.sendStatus(500);
    });
  }
}
