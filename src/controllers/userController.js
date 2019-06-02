import db from '../models';
import bcrypt from 'bcryptjs';

const userController = {};

//Validate
import validateRegistrationInput from '../validation/registration';

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
          res.status(200).json({
            success: true,
            data: newUser
          });
        })
        .catch(err => console.log(err));
    });
  });
};

export default userController;
