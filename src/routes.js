import express from 'express';
import passport from 'passport';
const router = express();

//Controllers
import initialController from './controllers/initalController';
import userController from './controllers/userController';

//Base Route
router.get('/', initialController.get);

//User Routes
router.post('/users/register', userController.register);
router.post('/users/login', userController.login);
router.get(
  '/users/me',
  passport.authenticate('jwt', { session: false }),
  userController.me
);

export default router;
