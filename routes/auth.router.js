const express = require('express');
const mongoose = require('mongoose');
const {generateJWT} = require('../utils/jwt');
const bcrypt = require('bcryptjs');
const router = express.Router();
const bcryptSalt = bcrypt.genSaltSync(8);

const User = require('../models/user.model');

router.post('/signup', async function(req, res) {
  try{
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      const hashedPassword = bcrypt.hashSync(password, bcryptSalt);   
      const user = await User.create({ name: name, email: email, password: hashedPassword });
      const token = generateJWT(user._id.toString());
      res.json({
        success: true,
        token: token
      });
    } else {
      res.status(409).json({
        success: false,
        error: {
          message: "User Already Exists"
        }
      });
    }
  }catch(e){
      res.status(409).json({
        success: false,
        error: {
          message: e.message
        }
      });
  }  
});

router.post('/login', async function(req, res){
  const {email, password} = req.body;
  const existingUser = await User.findOne({ email: email });
  if(existingUser){
    const validPassword = bcrypt.compareSync(password, existingUser.password);
    if(validPassword){
      const token = generateJWT(existingUser._id.toString());
      res.json({
        success: true,
        token: token,
        name: existingUser.name
      })
    }else{
      res.status(401).json({
        success: false,
        error: {
          message: "Invalid password"
        }
      });
    }    
  }else{
    res.status(401).json({
        success: false,
        error: {
          message: "User not registered"
        }
    })
  }  
});

module.exports = router;
