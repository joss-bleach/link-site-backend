import db from '../models';

const postController = {};

//Validate
import validatePostInput from '../validation/post';

//Route - /api/posts/new
//Desc - Create new post
//Access - Private
postController.new = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newPost = new db.Post({
    title: req.body.title,
    url: req.body.url,
    _creator: req.user.id
  });
  newPost.save().then(post => res.status(200).json(post));
};

export default postController;
