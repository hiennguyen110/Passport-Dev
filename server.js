const express = require("express");
const bodyParser = require("body-parser");
const validator = require("validator");
const highlighter = require(__dirname + "/server_functions/highlighter/highlight.js");
const database = require(__dirname + "/server_functions/database/user.js");
const serverEmail = require(__dirname + "/server_functions/email/mail.js");
const strGenerator = require("randomid-string-generator");

// Verification Key
var verification_key = "";
var userEmail = "";
var passWord = "";
var firstName = "";
var lastName = "";
var userInfo = [];

const server = express();
server.set("view engine", "ejs");
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static("public"));

server.get("/", function(req, res){
    // res.redirect("/login");
});

server.post("/", function(req, res){

});

server.get("/login", function(req, res){
    res.render("login");
});

server.post("/login", function(req, res){
    
});

server.get("/register", function(req, res){
    res.render("register");
});

server.post("/register", function(req, res){
    userEmail = req.body.userEmail;
    passWord = req.body.passWord;
    firstName = req.body.firstName;
    lastName = req.body.lastName;

    if (!validator.isEmail(userEmail)){
        res.send("Please enter a valid email !!!");
    } else {
        console.log(userEmail);
        console.log(verification_key);
        verification_key = strGenerator(10);
        serverEmail.send_verication_email(userEmail, firstName, verification_key);
        res.render("verify_user");
    }
});

server.get("/verify_user", function(req, res){

})

server.post("/verify_user", function(req, res){
    var user_key = req.body.verificationCode;
    console.log(user_key);
    console.log(verification_key);
    if (verification_key == user_key){
        userInfo.push(userEmail);
        userInfo.push(passWord);
        userInfo.push(firstName);
        userInfo.push(lastName);
        database.insert_new_user(userInfo);
        res.render("verification_passed");
    } else {
        res.render("verification_failed");
    }
})

server.get("/verification_failed", function(req, res){
    res.redirect("/register");
})

server.post("/verification_failed", function(req, res){
    res.redirect("/register");
});

server.get("/verification_passed", function(req, res){
    res.redirect("/login");
})

server.post("/verification_passed", function(req, res){
    res.redirect("/login");
});

server.get("*", function(req, res){
    res.send("Sorry, but page not found !!!!");
});

server.listen(process.env.PORT || 3000, function(req, res){
    console.log(highlighter.success_highlighter("SERVER HAS BEEN STARTED !!!"));
});