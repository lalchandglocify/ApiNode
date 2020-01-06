var express = require("express");
var router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Campaign = require('../models/Campaign');

/* GET home page. */
router.get("/", function(req, res) {
	//res.render("login", { layout: false });
	res.redirect('/users/login');
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, async(req, res) =>{
	if(req.user.usertType=="Admin"){
		res.render('admin/dashboard', {
    user: req.user,campaign:await Campaign.find({})
  })
	}
	else
	{
  res.render('dashboard', {
    user: req.user,campaign:await Campaign.find({})
  })
	}
});

router.get('/profile', ensureAuthenticated, async(req, res) =>{
    res.render('userprofile', {
    user: req.user
  })
  
});
module.exports = router;
