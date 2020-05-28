"use strict";const userRouter=`import { Router } from 'express';
  import { UserController } from '../controllers';
  import UserMiddleware from '../middlewares';

  const router = new Router();

  // Create a new user
  router.route('/').post(
      UserMiddleware.createUserMiddleware,
      UserController.createUser
  );

  // Get all users
  router.route('/').get(
      // UserMiddleware,
      UserController.getUsers
  );

  // Get single user
  router.route('/:id').get(
      // UserMiddleware,
      UserController.getUser
  );

  // Update user details
  router.route('/:id').put(
      // UserMiddleware,
      UserController.updateUser
  );

  // Delete a single user
  router.route('/:id').delete(
      // UserMiddleware,
      UserController.deleteUser
  );

  router.use((err, req, res, next) => {
      if (err) throw err;
  });

  export default router;`;module.exports="import { Router } from 'express';\n  import { UserController } from '../controllers';\n  import UserMiddleware from '../middlewares';\n\n  const router = new Router();\n\n  // Create a new user\n  router.route('/').post(\n      UserMiddleware.createUserMiddleware,\n      UserController.createUser\n  );\n\n  // Get all users\n  router.route('/').get(\n      // UserMiddleware,\n      UserController.getUsers\n  );\n\n  // Get single user\n  router.route('/:id').get(\n      // UserMiddleware,\n      UserController.getUser\n  );\n\n  // Update user details\n  router.route('/:id').put(\n      // UserMiddleware,\n      UserController.updateUser\n  );\n\n  // Delete a single user\n  router.route('/:id').delete(\n      // UserMiddleware,\n      UserController.deleteUser\n  );\n\n  router.use((err, req, res, next) => {\n      if (err) throw err;\n  });\n\n  export default router;";