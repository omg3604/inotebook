const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "Omis&agood&boy";

// ENDPOINT1:  Create a user using : POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Name must consists of minimum 2 characters').isLength({ min: 2 }),
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password must consists of minimum 6 characters').isLength({ min: 6 }),
], async (req, res) => {
  // if there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  try {
    // Check whether user with same email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry, User with this email already exists." })
    }
    // if no user with same email exists then create user with the given email and details
    // Encrypting the password using bcryptjs package
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Creating the user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id
      }
    }
    // generating authentication token
    const authToken = jwt.sign(data, JWT_SECRET);

    // res.json(user);
    // sending auth token as response
    res.json({ authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

//ENDPOINT2: Authenticate a user using : POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password cannot be blank. ').exists(),
], async (req, res) => {

  // if there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    // if no user exists then return error
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }
    // if user with given email exists then match the corresponding password with entered one
    const passwordCompare = await bcrypt.compare(password, user.password);

    // if password doesnot match, return error
    if (!passwordCompare) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // if password matches, send the data
    const data = {
      user: {
        id: user.id
      }
    }
    // generating auth token
    const authToken = jwt.sign(data, JWT_SECRET);
    // sending auth token of corresponding user as response
    res.json({ authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

});

// ENDPOINT 3: Get logged in User details : POST "/api/auth/getuser". Login required
router.post('/getuser', async (req, res) => {
  
  try {
    let userId = "todo";
    const user = await User.findById(userId).select("-password");

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;