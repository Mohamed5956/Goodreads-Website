const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const TOKEN_KEY =process.env.TOKEN_KEY 

router.post("/",async (req, res) => {
    try {
        const { firstname, lastname, email, password ,image } = req.body;
    
        if (!(email && password && firstname && lastname && image)) {
             res.status(400).send("All input is required");
             
        }
    
        const oldUser = await User.findOne({ email });
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
          
        encryptedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({
            firstname,
            lastname,
            email: email.toLowerCase(), 
            password: encryptedPassword,
            image,
        });
    
        const token = jwt.sign(
          { user_id: user._id, email },
          TOKEN_KEY
        );
      
        user.token = token;
    
       
        res.status(201).json(user);  


      } catch (err) {        
        console.log(err);
      }
});


module.exports = router