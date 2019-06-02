import express from 'express';
const router = express();

//Controllers
import initialController from './controllers/initalController';

//Base Route
router.get('/', initialController.get);

export default router;
