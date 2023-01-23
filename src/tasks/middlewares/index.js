const middlewares = `
import { createUserMiddleware } from './user';

// allow dynamic export
export { createUserMiddleware }

`;

module.exports = middlewares;
