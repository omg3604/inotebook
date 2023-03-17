const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

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
    success = false;
    return res.status(500).json({success , error: errors.array()});
  }


  try {
    // Check whether user with same email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success = false;
      return res.status(400).json({ success , error: "Sorry, User with this email already exists." })
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
    success = true;
    return res.json({success , authToken });

  } catch (error) {
    console.error(error.message);
    success = false;
    return res.status(500).json({success , error:"Internal Server Error"});
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
    success=false;
    return res.status(400).json({ success ,  error: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    // if no user exists then return error
    if (!user) {
      success = false;
      return res.status(400).json({ success , error: "Invalid credentials." });
    }
    // if user with given email exists then match the corresponding password with entered one
    const passwordCompare = await bcrypt.compare(password, user.password);

    // if password doesnot match, return error
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({ success , error: "Invalid credentials." });
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
    success = true;
    res.json({ success , authToken });

  } catch (error) {
    console.error(error.message);
    success = false;
    return res.status(500).json({success , error:"Internal Server Error"});  
  }
});

// ENDPOINT 3: Get logged in User details : POST "/api/auth/getuser". Login required
router.post('/getuser', fetchUser ,  async (req, res) => {
  try {
    let userId = req.user.id;
    // find the user with corresponding user id and select all the data feilds to send, except the password feild.
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    success = false;
    return res.status(500).json({success , error:"Internal Server Error"});  }
})

module.exports = router;