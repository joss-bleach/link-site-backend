import db from '../models';

const postController = {};

//Validate
import validatePostInput from '../validation/post';
import validateCommentInput from '../validation/comment';

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

//Route - /api/posts/:id
//Desc - Get single post
//Access - Public
postController.getPost = (req, res) => {
  db.Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: 'No post found' }));
};

//Route - /api/posts
//Desc - Get all posts
//Access - Public
postController.getPosts = (req, res) => {
  db.Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found.' }));
};

//Route - /api/posts/delete/:id
//Desc - Delete Post
//Access - Private
postController.delete = (req, res) => {
  db.User.findById(req.user.id).then(user => {
    db.Post.findById(req.params.id).then(post => {
      if (post._creator.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ notAuthorised: 'You cannot delete this post.' });
      }
      post
        .remove()
        .then(() => res.json({ success: true }))
        .catch(err =>
          res.status(404).json({ postNotFound: 'Cannot find post.' })
        );
    });
  });
};

//Route - /api/posts/comment/:id
//Desc - Add comment to post
//Access - Private
postController.addComment = (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  db.Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.user.username,
        user: req.user.id
      };
      console.log(req.user.username);
      post.comments.unshift(newComment);
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postNotFound: 'Post not found.' }));
};

//Route - /api/posts/upvote/:id
//Desc - Upvote
//Access - Public
postController.upVote = (req, res) => {
  db.Post.findById(req.params.id)
    .then(post => {
      post.upVotes = post.upVotes + 1;
      post
        .save()
        .then(upVotes =>
          res.status(400).json({ success: true, upVotes: upVotes })
        )
        .catch(err => console.log(err));
    })
    .catch(err => res.status(200).json(err));
};

//Route - /api/posts/downvote/:id
//Desc - Downvote
//Access - Public
postController.downVote = (req, res) => {
  db.Post.findById(req.params.id)
    .then(post => {
      post.upVotes = post.upVotes - 1;
      post
        .save()
        .then(upVotes =>
          res.status(400).json({ success: true, upVotes: upVotes })
        )
        .catch(err => console.log(err));
    })
    .catch(err => res.status(200).json(err));
};

export default postController;
