const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const validator = require("validator");
const highlighter = require(__dirname + "/server_functions/highlighter/highlight.js");
const userDatabase = require(__dirname + "/server_functions/database/user.js");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const server = express();
server.set("view engine", "ejs");
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static("public"));

// Tell the server to initialize a configuration of session form
server.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));

// Tell the server to use initialize the passport and tell passport to use the session as defined
server.use(passport.initialize());
server.use(passport.session());

mongoose.connect("mongodb+srv://patsdatabase:52435798H$a@patskahootdbs-irwee.gcp.mongodb.net/USER?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);
const USER_ACCOUNT_LOGIN_SCHEMA = new mongoose.Schema({
    username: String,
    password: String,
});
USER_ACCOUNT_LOGIN_SCHEMA.plugin(passportLocalMongoose);

const USER_ACCOUNT_LOGIN = mongoose.model("USER_LOGIN", USER_ACCOUNT_LOGIN_SCHEMA);

passport.use(USER_ACCOUNT_LOGIN.createStrategy());

passport.serializeUser(USER_ACCOUNT_LOGIN.serializeUser());
passport.deserializeUser(USER_ACCOUNT_LOGIN.deserializeUser());

server.get("/register", function(req, res){
    res.render("register");
});

server.post("/register", function(req, res){
    USER_ACCOUNT_LOGIN.register({username: req.body.username}, req.body.password, function(err, user){
       if (err) {
        console.log(err);
        if (err.name == "UserExistsError"){
            res.send("Username is already taken");
        } else {
            res.redirect("/register");
        }
       } else {
            var userInfo = [];
            userInfo.push(req.body.username);
            userInfo.push(req.body.firstName);
            userInfo.push(req.body.lastName);
            console.log(userInfo);
            userDatabase.insert_new_user(userInfo);
            passport.authenticate("local")(req, res, function(){
            res.redirect("/login");
           });
       }
    }); 
});

server.get("/login", function(req, res){
    if (req.isAuthenticated()){
        res.send("is authenticated !!!!");
    } else {
        res.render("register");
    }
});


server.get("*", function(req, res){
    res.render("404-error");
});

server.listen(process.env.PORT || 3000, function(req, res){
    console.log(highlighter.success_highlighter("SERVER HAS BEEN STARTED !!!"));
});