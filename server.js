const express = require("express");
const bodyParser = require("body-parser");
const validator = require("validator");
const highlighter = require(__dirname + "/server_functions/highlighter/highlight.js");
const userDatabase = require(__dirname + "/server_functions/database/user.js");
const serverEmail = require(__dirname + "/server_functions/email/mail.js");
const strGenerator = require("randomid-string-generator");

// Verification Key
var verification_key = "";
var userName = "";
var passWord = "";
var firstName = "";
var lastName = "";
var userInfo = [];

const server = express();
server.set("view engine", "ejs");
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static("public"));

server.get("/", function(req, res){
    res.redirect("/login");
});

server.post("/", function(req, res){
    res.redirect("/register");
});

server.get("/login", function (req, res) {
    res.render("login");
});

server.post("/login", function (req, res) {
    var userName = req.body.userName;
    var passWord = req.body.passWord;
    userDatabase.find_user(userName).then((result) => {
        if (result == null){
            res.send("Sorry, account does not exist !!!");
        } else {
            if (result.userName == userName && result.passWord == passWord){
                res.send("Gain access !");
            } else {
                res.send("Wrong username or password !!!");
            }
        }
    }).catch((err) => {
        console.log(err);
    });
});

server.get("/register", function (req, res) {
   res.render("register");
});

server.post("/register", function (req, res) {
    var userName = req.body.userName;
    var passWord = req.body.passWord;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    userInfo.push(userName);
    userInfo.push(passWord);
    userInfo.push(firstName);
    userInfo.push(lastName);
    userDatabase.insert_new_user(userInfo);
    res.redirect("/login");
});

server.get("/forgot_username_password", function (req, res) {
    res.render("forgot_account");
});

server.post("/forgot_username_password", function (req, res) {
    var userName = req.body.userName;
    var passWord = req.body.passWord;

});

server.get("/create_new_account", function (req, res) {
    res.redirect("/register");
});

server.get("*", function(req, res){
    res.render("404-error");
});

server.listen(process.env.PORT || 3000, function(req, res){
    console.log(highlighter.success_highlighter("SERVER HAS BEEN STARTED !!!"));
});