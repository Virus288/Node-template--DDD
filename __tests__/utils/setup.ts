import { beforeAll } from '@jest/globals';
import State from '../../src/tools/state.js'
import Router from '../../src/presentation/router/index.js';
import Bootstrap from '../../src/bootstrap.js';

beforeAll(() => {
  State.router = new Router()
  State.controllers = new Bootstrap()

  State.controllers.init()
});
