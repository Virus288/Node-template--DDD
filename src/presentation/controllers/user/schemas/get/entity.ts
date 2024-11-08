import type { IGetUserEntity } from '../../../../../application/user/get/types.js';
import type { IUserEntity } from '../../../../../domain/user/types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IGetUserEntity:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           maxLength: 200
 *           pattern: "^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)+$"
 *         login:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           pattern: "^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$"
 */
export default class GetUserEntity implements IGetUserEntity {
  readonly login: string;
  readonly email: string;

  constructor(data: IUserEntity) {
    this.login = data.login;
    this.email = data.email;
  }
}
