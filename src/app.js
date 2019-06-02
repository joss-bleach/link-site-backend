import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import keys from './config/keys';

const app = express();

//Database
const db = keys.mongoUri;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Database connected...'))
  .catch(err => console.log(err));

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
import router from './routes';
import { Mongoose } from 'mongoose';
app.use('/api', router);

export default app;
