import express from 'express';
const router = express();

//Controllers
import initialController from './controllers/initalController';
import userController from './controllers/userController';

//Base Route
router.get('/', initialController.get);

//User Routes
router.post('/users/register', userController.register);

export default router;
