import { EControllers, EBaseControllerActions } from '../../../../../enums/index.js';
import handleErr from '../../../../../errors/utils.js';
import AbstractRouter from '../../../../../tools/abstract/router.js';
import State from '../../../../../tools/state.js';
import limitRate from '../../../utils.js';
import type * as types from '../../../../../types/index.js';
import type GetUserController from '../../../../controllers/user/get.js';
import type express from 'express';

/**
 * @openapi
 * /user:
 *   get:
 *     tags:
 *       - user
 *     description: Get user
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success. Get user back in request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IGetUserEntity'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/MissingArgError'
 *                 - $ref: '#/components/schemas/IncorrectArgError'
 */
export default class Get extends AbstractRouter {
  constructor() {
    super();
    this.init();
  }

  /**
   * Initialize route.
   */
  init(): void {
    this.router.get('/', limitRate, async (req, res: express.Response<unknown, types.IUserLocals>) => {
      try {
        const controller = State.controllers
          .resolve(EControllers.Users)!
          .resolve(EBaseControllerActions.Get) as GetUserController;

        await controller.execute(req, res);
      } catch (err) {
        handleErr(err as types.IFullError, res);
      }
    });
  }
}
