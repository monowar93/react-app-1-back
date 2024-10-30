const { body, validationResult } = require('express-validator');

const registrationValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long.')
    .matches(/^[A-Za-z].*/) // Check that the name starts with a letter
    .withMessage('Name must start with a letter.'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Please enter a valid email address.'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long.')
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).+$/)
    .withMessage(
      'Password must contain at least one letter, one number, and one special character.'
    ),
];

// Middleware to handle validation results
const handleValidationResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

module.exports = { registrationValidator, handleValidationResults };
