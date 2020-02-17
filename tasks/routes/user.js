const userRouter =
    `import { Router } from 'express';
    import { UserController } from '../controllers';
    import { UserMiddleware } from '../middlewares';
    import serverErrorHandler from '../helpers/serverErrorHandler'
    
    const router = new Router();
    
    // Create a new user
    router.route('/').post(
        UserMiddleware,
        serverErrorHandler(UserController.createUser)
    );
    
    // Get all users
    router.route('/').get(
        UserMiddleware,
        serverErrorHandler(UserController.getUsers)
    );
    
    // Get single user
    router.route('/:id').get(
        UserMiddleware,
        serverErrorHandler(UserController.getUser)
    );
    
    // Update user details
    router.route('/:id').put(
        UserMiddleware,
        serverErrorHandler(UserController.updateUser)
    );
    
    // Delete a single user
    router.route('/:id').delete(
        UserMiddleware,
        serverErrorHandler(UserController.deleteUser)
    );
    
    router.use((err, req, res, next) => {
        if (err) throw err;
    });
    
    export default router;    
`;

exports = module.exports = userRouter;
