import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { body } from 'express-validator';
import * as authMiddleware from '../middleware/auth.middleware.js';
import { uploadAvatar } from '../controllers/user.controller.js';
import upload from '../middleware/upload.middleware.js';
const router = Router();



router.post('/register',
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
    userController.createUserController);

router.post('/login',
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
    userController.loginController);




router.post('/logout', userController.logoutController);


router.get('/all', authMiddleware.authUser, userController.getAllUsersController);

// profile update routes
router.get('/profile', authMiddleware.authUser, userController.profileController);
router.put('/users/update',authMiddleware.authUser,userController.updateProfile)
// router.post('auth/github',)
// router.post('auth/google',)
router.post('/avatar', authMiddleware.authUser, upload.single("avatar"),uploadAvatar);
export default router;