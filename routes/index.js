const express = require('express');
const router = express.Router();
const User = require('../models/user');

/**
 * Registration form page
 */
router.get('/', (req, res)=> {
   res.render('index')
});

// post data for registration
router.post('/signup', (req, res)=> {
   let user = {
       name: 'Mohammad',
       role: 'web dev',
       email: 'md@gmail.com',
       password: '1234',
       address: {
           city: 'Köln',
           zip: 45139,
           street: 'test 7',
           country: 'Germany'
       }
   }
   const newUser = new User(user);
   newUser.save((err, user)=> {
       if(err) throw err;
       res.json(user);
   });
});

/**
 * Login form page
 */
router.get('/login', (req, res)=> {
   res.send('login page')
});

/**
 * Check login authentication for local
 */
router.post('/login/check', (req, res)=> {
   let email = 'md@gmail.com' ; // req.body.email
   let password = '1234'; // req.body.password
   const query = { email: email }
   User.findOne(query, (err, user)=> {
       if(err) throw err; // if errors show it or go next line
       if(password === user.password) {
         // save user role in session data
         req.session.role = user.role;
         //req.session.save();
         res.json(user);
       } else {
           res.json('Wrong Password!');
       }
   });
});

/**
 *  User List page
 */
router.get('/user/list', (req, res)=> {
   console.log(req.session.role);
   let userList = User.find();
   userList.exec((err, users)=> {
       if(err) throw err;
       res.json(users);
   });
});

module.exports = router;