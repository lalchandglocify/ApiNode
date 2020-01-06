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
    res.render('admin/users/users', {
    user: req.user
  })
  
});


router.get('/users/show/:id', ensureAuthenticated, async(req, res) =>{
  var detailsUser = await User.findById(req.params.id);
    res.render('admin/users/show', {
    user: req.user,detailsUser:detailsUser
  })
  
});

router.get('/users/edit/:id', ensureAuthenticated, async(req, res) =>{
   var detailsUser = await User.findById(req.params.id);
    res.render('admin/users/edit', {
    user: req.user,detailsUser:detailsUser
  })
  
});


router.get('/users/delete/:id', ensureAuthenticated, (req, res) =>

User.deleteOne({_id:req.params.id}).then(user => {
                req.flash(
                  'error_msg',
                  'User Deleted'
                );
                res.redirect('/admin/users');
              })
              .catch(err => console.log(err))

);



 
router.post('/api/Allusers',ensureAuthenticated, function (req, res) {

        
        params = req.body,
        query = datatablesQuery(User.find({usertType: {$ne: 'Admin'}}));
 
    query.run(params).then(function (data) {
        res.json(data);
    }, function (err) {
        res.status(500).json(err);
    });
});



router.post('/api/Adduser', ensureAuthenticated,function (req, res) {


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

   router.post('/users/update/:id',ensureAuthenticated, async(req, res) => {
    user =  req.user;
   
//const campaigns = await Campaign.find({});
    
//console.log(campaigns);
    
  const { name } = req.body;
  let errors = [];

  if (!name) {
    errors.push({ msg: 'Please enter all fields' });
  }


  if (errors.length > 0) {
    var detailsUser = await User.findById(req.params.id);
    res.render('admin/users/edit', {
      errors,
      detailsUser
    });


  } else {

    const user =  User.updateOne({_id:req.params.id},{name}).then(user => {
                req.flash(
                  'success_msg',
                  'User Updated'
                );
                res.redirect('/admin/users');
              })
              .catch(err => console.log(err));
}

});






module.exports = router;
