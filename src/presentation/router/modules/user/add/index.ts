import { EControllers, EBaseControllerActions } from '../../../../../enums/index.js';
import handleErr from '../../../../../errors/utils.js';
import AbstractRouter from '../../../../../tools/abstract/router.js';
import State from '../../../../../tools/state.js';
import Middleware from '../../../middleware.js';
import limitRate from '../../../utils.js';
import type * as types from '../../../../../types/index.js';
import type AddUserController from '../../../../controllers/user/add.js';

/**
 * @openapi
 * /user:
 *   post:
 *     tags:
 *       - user
 *     description: Add user
 *     security: []
 *     requestBody:
 *       description: Request body for adding user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IAddUserDto'
 *     responses:
 *       200:
 *         description: Success. Added new user.
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/MissingArgError'
 *                 - $ref: '#/components/schemas/IncorrectArgError'
 */
export default class Confirm extends AbstractRouter {
  constructor() {
    super();
    this.init();
  }

  /**
   * Initialize confirm consent route.
   */
  init(): void {
    this.router.post('/', Middleware.setNoCache, limitRate, async (req, res) => {
      try {
        const controller = State.controllers
          .resolve(EControllers.Users)!
          .resolve(EBaseControllerActions.Add) as AddUserController;

        await controller.execute(req, res);
      } catch (err) {
        handleErr(err as types.IFullError, res);
      }
    });
  }
}
