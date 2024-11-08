import GetUserDto from './schemas/get/dto.js';
import GetUserEntity from './schemas/get/entity.js';
import AbstractInnerController from '../../../tools/abstract/innerController.js';
import type { IGetUserDto } from '../../../application/user/get/types.js';
import type * as enums from '../../../enums/index.js';
import type express from 'express';

export default class GetUserController extends AbstractInnerController<
  enums.EControllers.Users,
  enums.EBaseControllerActions.Get,
  void,
  express.Request<unknown, unknown, IGetUserDto>
> {
  /**
   * Get user data.
   * @param req Express request.
   * @param res Express response.
   */
  override async execute(req: express.Request<unknown, unknown, IGetUserDto>, res: express.Response): Promise<void> {
    const dto = new GetUserDto(req.body);

    const entity = await this.useCase.execute(dto);

    const data = entity ? new GetUserEntity(entity) : entity;

    res.status(200).send({ data });
  }
}
