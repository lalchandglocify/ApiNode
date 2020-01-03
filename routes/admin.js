const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/UserModel');
const BookModel = require('../models/BookModel');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
datatablesQuery = require('datatables-query');

//view All Users

router.get('/users', ensureAuthenticated, async(req, res) =>{
    res.render('admin/users', {
    user: req.user
  })
  
});



 
router.post('/api/Allusers', function (req, res) {

        
        params = req.body,
        query = datatablesQuery(User.find({}));
 
    query.run(params).then(function (data) {
        res.json(data);
    }, function (err) {
        res.status(500).json(err);
    });
});



router.post('/api/Adduser', function (req, res) {


   const { name, email, password } = req.body;
errors='';
  if (!name || !email || !password) {
    errors = 'Please enter all fields';
  }

  

  if (errors != '') {
    res.send(errors);
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
       errors = 'Email already exists';
        res.send(errors);
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.send('success');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }

 
});




module.exports = router;
