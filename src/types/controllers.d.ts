import type * as enums from '../enums/index.js';
import type AddUserController from '../presentation/controllers/user/add.js';
import type GetUserController from '../presentation/controllers/user/get.js';
import type UsersController from '../presentation/controllers/user/index.js';
import type express from 'express';

export type IControllerAcitons = enums.EBaseControllerActions;

export interface IController {
  [enums.EControllers.Users]: UsersController;
}

export interface IUsersController {
  [enums.EBaseControllerActions.Add]: AddUserController;
  [enums.EBaseControllerActions.Get]: GetUserController;
}

export interface IInnerController {
  [enums.EControllers.Users]: IUsersController;
}

export interface IBaseInnerController<U, P = [express.Request, express.Response]> {
  execute(req: express.Request, res: express.Response): Promise<U>;
  execute(params: P): Promise<U>;
}
