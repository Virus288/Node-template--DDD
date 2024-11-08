import AddUserController from './add.js';
import GetUsersController from './get.js';
import AddUserUseCase from '../../../application/user/add/index.js';
import GetUserUseCase from '../../../application/user/get/index.js';
import * as enums from '../../../enums/index.js';
import UsersRepository from '../../../infrastructure/repositories/users.js';
import AbstractController from '../../../tools/abstract/controller.js';

export default class UsersController extends AbstractController<enums.EControllers.Users> {
  /**
   * Register user controllers.
   */
  protected override init(): void {
    const repo = new UsersRepository();

    this.register(enums.EBaseControllerActions.Get, new GetUsersController(new GetUserUseCase(repo)));
    this.register(enums.EBaseControllerActions.Add, new AddUserController(new AddUserUseCase(repo)));
  }
}
