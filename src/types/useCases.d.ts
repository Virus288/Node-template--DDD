import type AddUserUseCase from '../application/user/add/index.js';
import type GetUserUseCase from '../application/user/get/index.js';
import type * as enums from '../enums';

export interface IUsersUseCase {
  [enums.EBaseControllerActions.Add]: AddUserUseCase;
  [enums.EBaseControllerActions.Get]: GetUserUseCase;
}

export interface IOidcClientsUseCase {
  [enums.EBaseControllerActions.Add]: undefined;
  [enums.EBaseControllerActions.Get]: undefined;
}

export interface IInnerControllerUseCase {
  [enums.EControllers.Users]: IUsersUseCase;
}

export interface IUseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}
