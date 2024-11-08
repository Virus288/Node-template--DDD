import Validation from '../../../../../tools/validator.js';
import type { IAddUserDto } from '../../../../../application/user/add/types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IAddUserDto:
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
 *         password:
 *           type: string
 *           minLength: 6
 *           maxLength: 200
 *           pattern: "^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\\d).*$"
 *           description: Password should contain at least 1 digit, 6 letters, 1 uppercase letter, and 1 lowercase letter.
 */
export default class AddUserDto implements IAddUserDto {
  readonly login: string;
  readonly email: string;
  readonly password: string;

  constructor(data: IAddUserDto) {
    this.login = data.login;
    this.password = data.password;
    this.email = data.email;

    this.validate();
  }

  private validate(): void {
    new Validation(this.login, 'login')
      .isDefined()
      .isString()
      .hasLength(30, 3)
      .isRegexCompatible(
        new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/u, 'u'),
        'Login should only contain letters, numbers and special characters',
      );
    new Validation(this.password, 'password')
      .isDefined()
      .isString()
      .hasLength(200, 6)
      .isRegexCompatible(
        new RegExp(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d).*$/u, 'u'),
        'Password should contain min. 8 characters with at least 1 digit, 1 letter, 1 upper case letter and 1 lower case letter',
      );
    new Validation(this.email, 'email')
      .isDefined()
      .isString()
      .hasLength(200)
      .isRegexCompatible(
        new RegExp(/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/u, 'u'),
        'Email invalid',
      );
  }
}
