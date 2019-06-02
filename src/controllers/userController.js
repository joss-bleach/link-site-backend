import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import keys from '../config/keys';

const userController = {};

//Validate
import validateRegistrationInput from '../validation/registration';
import validateLoginInput from '../validation/login';

//Route - /api/users/register
//Desc - User registration
//Access - Public
userController.register = (req, res) => {
  const { errors, isValid } = validateRegistrationInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const user = new db.User({
    username: req.body.username,
    password: req.body.password
  });
  bcrypt.genSalt(12, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user
        .save()
        .then(newUser => {
          return res.status(200).json({
            success: true,
            data: newUser
          });
        })
        .catch(err => console.log(err));
    });
  });
};

//Route - /api/users/login
//Desc - Log in
//Access - Public
userController.login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { username, password } = req.body;
  db.User.findOne({ username }).then(user => {
    if (!user) {
      errors.username = 'Incorrect username/password combination.';
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          username: user.username
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: '1y' },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Incorrect username/passsword combination.';
        return res.status(404).json(errors);
      }
    });
  });
};

//Route - /api/users/me
//Desc - Gets current user information
//Access - Private
userController.me = (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username
  });
};

export default userController;
