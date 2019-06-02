import express from 'express';
import passport from 'passport';
const router = express();

//Controllers
import initialController from './controllers/initalController';
import userController from './controllers/userController';
import postController from './controllers/postController';

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

//Post Routes - Public
router.get('/posts/:id', postController.getPost);
router.get('/posts', postController.getPosts);
router.post('/posts/upvote/:id', postController.upVote);
router.post('/posts/downvote/:id', postController.downVote);

//Post Routes - Private
router.post(
  '/posts/new',
  passport.authenticate('jwt', { session: false }),
  postController.new
);
router.delete(
  '/posts/delete/:id',
  passport.authenticate('jwt', { session: false }),
  postController.delete
);
router.post(
  '/posts/comment/:id',
  passport.authenticate('jwt', { session: false }),
  postController.addComment
);

export default router;
