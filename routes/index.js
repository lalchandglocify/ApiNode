var express = require("express");
var router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Campaign = require('../models/Campaign');

/* GET home page. */
router.get("/", function(req, res) {
	res.render("login", { title: "Express" });
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, async(req, res) =>
  res.render('dashboard', {
    user: req.user,campaign:await Campaign.find({})
  })
);

module.exports = router;
