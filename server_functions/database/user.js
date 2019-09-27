const mongoose = require("mongoose");
const highlighter = require("../highlighter/highlight.js");
const USER_DATABASE = "USER";
const USER_COLLECTION = "USERACCOUNT";
const encrypt = require("mongoose-encryption");

mongoose.connect("mongodb+srv://patsdatabase:52435798H$a@patskahootdbs-irwee.gcp.mongodb.net/" + USER_DATABASE + "?retryWrites=true&w=majority", { useNewUrlParser: true });
const USER_ACCOUNT_SCHEMA = new mongoose.Schema({
    userName: String,
    passWord: String,
    firstName: String,
    lastName: String
});

const secret = "passdaivailoz";
USER_ACCOUNT_SCHEMA.plugin(encrypt, {secret: secret, encryptedFields: ["passWord"] });

const USER_ACCOUNT = mongoose.model(USER_COLLECTION, USER_ACCOUNT_SCHEMA);

const connect_to_database = function(databaseName){
    return mongoose.connect("mongodb+srv://patsdatabase:52435798H$a@patskahootdbs-irwee.gcp.mongodb.net/" + databaseName + "?retryWrites=true&w=majority", { useNewUrlParser: true });    
}

const insert_new_user = function(userInfo){
    // mongooseConn = connect_to_database(USER_DATABASE);
    userName = userInfo[0];
    passWord = userInfo[1];
    firstName = userInfo[2];
    lastName = userInfo[3];

    const new_user = new USER_ACCOUNT({
        userName: userName,
        passWord: passWord,
        firstName: firstName,
        lastName: lastName
    });
    new_user.save(function (err) {
        if (err){
            console.log(err);
        } else {
            console.log("New user created !!!");
        }
    })

    // USER_ACCOUNT.insertMany([new_user], function(error){
    //     if (error){
    //         console.log(highlighter.error_highlighter(error));
    //         // mongoose.connection.close();
    //     } else {
    //         console.log(highlighter.success_highlighter("New user has been added !!!"));
    //         // mongoose.connection.close();
    //     }
    // });
}

const find_user = function(name_of_user) {

    return USER_ACCOUNT.findOne({userName: name_of_user});    
}

const delete_user = function(name_of_user) {
    return USER_ACCOUNT.deleteOne({userName: name_of_user});
}

const update_user = function(name_of_user, userName, passWord, firstName, lastName) {
    return USER_ACCOUNT.updateOne({userName: name_of_user}, {
        userName: userName, 
        passWord: passWord, 
        firstName: firstName, 
        lastName: lastName
    })
}

module.exports = {
    insert_new_user: insert_new_user,
    find_user: find_user,
    delete_user: delete_user,
    update_user: update_user
}