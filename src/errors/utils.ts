import { InternalError } from './index.js';
import Log from '../tools/logger/index.js';
import type * as types from '../types/index.js';
import type express from 'express';

/**
 * Handle route error.
 * @param err Thrown error.
 * @param res Express response.
 */
const handleErr = (err: types.IFullError | Error, res: express.Response): void => {
  Log.error('Handle error', err.message, err.stack);

  let error: types.IFullError = err as types.IFullError;

  // This
  if (!(err as types.IFullError).code) {
    error = new InternalError();
  }

  const { message, code, name, status } = error;
  res.status(!status ? 500 : status).send({
    error: {
      message,
      code,
      name,
    },
  });
};

export default handleErr;
