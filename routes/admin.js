var express = require("express");
var authRouter = require("./admin/auth");

var app = express();

app.use("/auth/", authRouter);
module.exports = app;