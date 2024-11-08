import Validation from '../../../../../tools/validator.js';
import type { IGetUserDto } from '../../../../../application/user/get/types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IGetUserDto:
 *     parameters:
 *      - in: query
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          example: 'testId'
 *          pattern: ".+$"
 */
export default class GetUserDto implements IGetUserDto {
  readonly id: string;

  constructor(data: IGetUserDto) {
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    if (!this.id) {
      new Validation(this.id, 'id').isDefined().isString().hasMinLength(1);
    }
  }
}
