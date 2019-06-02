import express from 'express';
import bodyParser from 'body-parser';

const app = express();

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
import router from './routes';
app.use('/api', router);

export default app;
