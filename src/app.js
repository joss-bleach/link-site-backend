import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import keys from './config/keys';
import passportInit from './config/passport';

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
app.use(passport.initialize());
passportInit(passport);

//Routes
import router from './routes';
import { Mongoose } from 'mongoose';
app.use('/api', router);

export default app;
