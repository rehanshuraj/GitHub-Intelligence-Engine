import {Router} from 'express';
import { body } from 'express-validator'; // Import body from express-validator for validation of request body where it validates the name field in the request body to ensure it is not empty.
import * as projectController from '../controllers/project.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

router.post('/create',
    authMiddleware.authUser,
    body('name').isString().withMessage('Name is required'),
    projectController.createProject
)

router.get('/all',
    authMiddleware.authUser,
    projectController.getAllProject
)

router.put('/add-user',
    authMiddleware.authUser,
    body('projectId').isString().withMessage('projectId is required'),
    body('users').isArray({ min: 1 }).withMessage('users must be an array with at least one userId').bail()
        .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each userId must be a string'),
    projectController.addUserToProject
)

router.get('/get-project/:projectId',
    authMiddleware.authUser,
    projectController.getProjectById
)

router.put('/update-file-tree',
    authMiddleware.authUser,
    body('projectId').isString().withMessage('projectId is required'),
    body('fileTree').isObject().withMessage('fileTree must be an object'),
    projectController.updateFileTree
)

router.post('/:projectId/exit',
    authMiddleware.authUser,
    projectController.exitProject
);


export default router;