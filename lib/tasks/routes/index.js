"use strict";const routes=`import { Router } from 'express';
import userRouters from './user';

const router = new Router();

// / url
router.get('/', (req, res) => {
    res.status(200).send({
        message: "Welcome to my first app"
    });
});

router.use('/user', userRouters);

export default router;
`;module.exports="import { Router } from 'express';\nimport userRouters from './user';\n\nconst router = new Router();\n\n// / url\nrouter.get('/', (req, res) => {\n    res.status(200).send({\n        message: \"Welcome to my first app\"\n    });\n});\n\nrouter.use('/user', userRouters);\n\nexport default router;\n";