import express from 'express';
const router = express();

//Controllers
import initialController from './controllers/initalController';
import userController from './controllers/userController';

//Base Route
router.get('/', initialController.get);

export default router;
