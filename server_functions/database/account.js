const mongoose = require("mongoose");
const highlighter = require("../highlighter/highlight.js");
const USER_DATABASE = "USER";
const USER_COLLECTION = "USERACCOUNT";

const connect_to_database = function(databaseName){
    return mongoose.connect("mongodb+srv://patsdatabase:52435798H$a@patskahootdbs-irwee.gcp.mongodb.net/" + databaseName + "?retryWrites=true&w=majority", { useNewUrlParser: true });    
}

const find_username = function(name_of_user){
    mongooseConn = connect_to_database(USER_DATABASE);
    const USER_ACCOUNT_SCHEMA = new mongoose.Schema({
        userName: String,
        passWord: String,
        firstName: String,
        lastName: String
    });
    const USER_ACCOUNT = mongoose.model(USER_COLLECTION, USER_ACCOUNT_SCHEMA);
    USER_ACCOUNT.findOne({userName: name_of_user}).then((result) => {
        return result.userName;
    }).catch((error) => {
        console.log(error);
    })
}

var name_of_user = find_username("minhhoi1234");
console.log(name_of_user);
