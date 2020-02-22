const userRouter =
    `import { Router } from 'express';
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
    
    export default router;    
`;

exports = module.exports = userRouter;
