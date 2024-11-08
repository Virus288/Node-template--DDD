import AddUserDto from './schemas/add/dto.js';
import AbstractInnerController from '../../../tools/abstract/innerController.js';
import type { IAddUserDto } from '../../../application/user/add/types.js';
import type * as enums from '../../../enums/index.js';
import type express from 'express';

export default class AddUserController extends AbstractInnerController<
  enums.EControllers.Users,
  enums.EBaseControllerActions.Add,
  void,
  express.Request<unknown, unknown, IAddUserDto>
> {
  /**
   * Add new user.
   * @param req Express request.
   * @param res Express response.
   */
  override async execute(req: express.Request<unknown, unknown, IAddUserDto>, res: express.Response): Promise<void> {
    const dto = new AddUserDto(req.body);

    await this.useCase.execute(dto);

    res.sendStatus(200);
  }
}
