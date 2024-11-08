// eslint-disable-next-line max-classes-per-file
export class FullError extends Error {
  code = '000';
  status = 500;
}

export class InternalError extends FullError {
  constructor() {
    super('Internal error. Try again later');
    this.name = 'InternalError';
    this.status = 500;
    this.code = '001';
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     IncorrectDataTypeError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'IncorrectDataTypeError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '002'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: "Incorrect body type. Data should be of type json"
 *           example: "Incorrect body type. Data should be of type json"
 */
export class IncorrectDataTypeError extends FullError {
  constructor() {
    super('Received request is not json type');
    this.name = 'IncorrectDataType';
    this.status = 400;
    this.code = '002';
  }
}

export class MissingProcessPlatformError extends FullError {
  constructor() {
    super('process.platform is missing');
    this.name = 'MissingProcessPlatformError';
    this.status = 500;
    this.code = '003';
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     MissingArgError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'MissingArgError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '004'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: "^Missing param: .+$"
 */
export class MissingArgError extends FullError {
  constructor(param: string) {
    super(`Missing param: ${param}`);
    this.name = 'MissingArgError';
    this.code = '004';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     IncorrectArgError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'IncorrectArgError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '005'
 *         message:
 *           example: 'Data not provided'
 *           description: Error message describing the incorrect parameter.
 *           type: string
 *           pattern: "^Incorrect param: .+$"
 */
export class IncorrectArgError extends FullError {
  constructor(err: string) {
    super(err);
    this.name = 'IncorrectArgError';
    this.code = '005';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     IncorrectArgTypeError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'IncorrectArgTypeError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '006'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: "^Element should be .+$ type"
 */
export class IncorrectArgTypeError extends FullError {
  constructor(err: string) {
    super(err);
    this.name = 'IncorrectArgTypeError';
    this.code = '006';
    this.status = 400;
  }
}

export class ElementTooShortError extends FullError {
  constructor(target: string, min: number) {
    super(`Element ${target} is too short. Minimum length is ${min}`);
    this.name = 'ElementTooShortError';
    this.code = '007';
    this.status = 400;
  }
}

export class ElementTooLongError extends FullError {
  constructor(target: string, min: number) {
    super(`Element ${target} is too long. Maximum length is ${min}`);
    this.name = 'ElementTooLongError';
    this.code = '008';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     IncorrectArgLengthError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'IncorrectArgLengthError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '009'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: "^Element has incorrect length: .+$"
 */
export class IncorrectArgLengthError extends FullError {
  constructor(target: string, min: number | undefined, max: number) {
    super(
      min === undefined
        ? `${target} should be less than ${max} characters`
        : min !== max
          ? `${target} should be more than ${min} and less than ${max} characters`
          : `${target} should be ${min} characters`,
    );
    this.name = 'IncorrectArgLengthError';
    this.code = '009';
    this.status = 400;
  }
}

export class FourOhFour extends FullError {
  constructor() {
    super('Cannot find selected path, or path is not accessible for you');
    this.name = 'FourOhFour';
    this.code = '010';
    this.status = 404;
  }
}

export class AccountDoesNotExistError extends FullError {
  constructor(accountId: string) {
    super(`Provided account with id ${accountId} does not exist`);
    this.name = 'AccountDoesNotExistError';
    this.code = '011';
    this.status = 400;
  }
}

export class IncorrectCredentialsError extends FullError {
  constructor(message?: string) {
    super(message ?? 'Incorrect credentials');
    this.name = 'IncorrectCredentialsError';
    this.code = '012';
    this.status = 400;
  }
}

export class AlreadyRegisteredError extends FullError {
  constructor(target: string) {
    super(`${target} already registered`);
    this.name = 'AlreadyRegisteredError';
    this.code = '012';
    this.status = 400;
  }
}
