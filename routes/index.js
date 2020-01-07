var express = require("express");
var router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Campaign = require('../models/Campaign');
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")(keySecret);
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

router.get('/charge', async(req, res) =>{
    res.render('charge',{ layout: false })
  
});



router.post("/charge", (req, res) => {
  let amount = 500;

  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
      currency: "usd",
      customer: customer.id
    }))
  .then(charge => res.send(charge))
  .catch(err => {
    console.log("Error:", err);
    res.status(500).send({error: "Purchase Failed"});
  });
});

module.exports = router;
