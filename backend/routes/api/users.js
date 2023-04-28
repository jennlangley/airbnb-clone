const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post('', validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ firstName, lastName, email, username, hashedPassword });

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      token: req.cookies['XSRF-TOKEN']
    };

    await setTokenCookie(res, safeUser);
   
    return res.json({
      user: safeUser,
    });
  }
);

// Get the current User
router.get('/current', async (req, res) => {
  const { user } = req;
    if (user) {
    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
    };
    return res.json({
        user: safeUser
    });
    } else return res.json({ user: null });
})

// Login a User
router.post('/login', validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.unscoped().findOne({
  where: {
      [Op.or]: {
      username: credential,
      email: credential
      }
  }
  });

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = { credential: 'The provided credentials were invalid.' };
    return next(err);
  }

  const safeUser = {
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  username: user.username,
  token: req.cookies['XSRF-TOKEN']
  };

  await setTokenCookie(res, safeUser);

  return res.json({
  user: safeUser
  });
});


module.exports = router;