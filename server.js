const express = require("express");
const bodyParser = require("body-parser");
const validator = require("validator");
const highlighter = require(__dirname + "/server_functions/highlighter/highlight.js");

const server = express();
server.set("view engine", "ejs");
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static("public"));

server.get("/", function(req, res){
    res.redirect("/login");
});

server.post("/", function(req, res){

});

server.get("/login", function(req, res){
    res.render("login", {

    });
});

server.post("/login", function(req, res){
    
});

server.get("/register", function(req, res){

});

server.post("/register", function(req, res){

});

server.get("*", function(req, res){
    res.send("Sorry, but page not found !!!!");
});

server.listen(process.env.PORT || 3000, function(req, res){
    console.log(highlighter.success_highlighter("SERVER HAS BEEN STARTED !!!"));
});