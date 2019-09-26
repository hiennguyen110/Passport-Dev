const express = require("express");
const bodyParser = require("body-parser");
const validator = require("validator");
const highlighter = require(__dirname + "/server_functions/highlighter/highlight.js");
const database = require(__dirname + "/server_functions/database/user.js");
const serverEmail = require(__dirname + "/server_functions/email/mail.js");
const strGenerator = require("randomid-string-generator");

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
    res.render("login", {

    });
});

server.post("/login", function(req, res){
    var userEmail = req.body.userEmail;
    var passWord = req.body.passWord;
    
});

server.get("/register", function(req, res){
    res.render("register");
});

var verification_code;
server.post("/register", function(req, res){
    var userEmail = req.body.userEmail;
    var passWord = req.body.passWord;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;

    if (!validator.isEmail(userEmail)){
        res.send("Please enter a valid email !!!");
    } else {
        var verification_code = strGenerator(10);
        serverEmail.send_verication_email(userEmail, userEmail, verification_code);
        res.render("verify_user");
    }
});

server.post("/verify_user", function(req, res){
    var user_verification_code = req.body.verificationCode;
    if (verification_code == user_verification_code){
        console.log("Corect Code !!!");
        res.redirect("/login");
    }
   
})

server.get("*", function(req, res){
    res.send("Sorry, but page not found !!!!");
});

server.listen(process.env.PORT || 3000, function(req, res){
    console.log(highlighter.success_highlighter("SERVER HAS BEEN STARTED !!!"));
});