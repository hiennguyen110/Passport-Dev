const mongoose = require("mongoose");
const highlighter = require("../highlighter/highlight.js");
const USER_DATABASE = "USER";
const USER_COLLECTION = "USERACCOUNT";

const connect_to_database = function(databaseName){
    return mongoose.connect("mongodb+srv://patsdatabase:52435798H$a@patskahootdbs-irwee.gcp.mongodb.net/" + databaseName + "?retryWrites=true&w=majority", { useNewUrlParser: true });    
}

const insert_new_user = function(userInfo){
    mongooseConn = connect_to_database(USER_DATABASE);
    const USER_ACCOUNT_SCHEMA = new mongoose.Schema({
        userName: String,
        passWord: String,
        firstName: String,
        lastName: String
    });

    userName = userInfo[0]; 
    passWord = userInfo[1];
    firstName = userInfo[2];
    lastName = userInfo[3];

    const USER_ACCOUNT = mongoose.model(USER_COLLECTION, USER_ACCOUNT_SCHEMA);

    const new_user = new USER_ACCOUNT({
        userName: userName,
        passWord: passWord,
        firstName: firstName, 
        lastName: lastName
    });

    USER_ACCOUNT.insertMany([new_user], function(error){
        if (error){
            console.log(highlighter.error_highlighter(error));
            mongoose.connection.close();
        } else {
            console.log(highlighter.success_highlighter("New user has been added !!!"));
            mongoose.connection.close();
        }
    });
}

const find_user = function(name_of_user) {
    mongooseConn = connect_to_database(USER_DATABASE);
    const USER_ACCOUNT_SCHEMA = new mongoose.Schema({
        userName: String,
        passWord: String,
        firstName: String,
        lastName: String
    });
    const USER_ACCOUNT = mongoose.model(USER_COLLECTION, USER_ACCOUNT_SCHEMA);

    return USER_ACCOUNT.findOne({userName: name_of_user});    
}

// const find_user = async function(name_of_user) {
//     mongooseConn = connect_to_database(USER_DATABASE);
//     const USER_ACCOUNT_SCHEMA = new mongoose.Schema({
//         userName: String,
//         passWord: String,
//         firstName: String,
//         lastName: String
//     });
//     const USER_ACCOUNT = mongoose.model(USER_COLLECTION, USER_ACCOUNT_SCHEMA);

//     return await USER_ACCOUNT.findOne({userName: name_of_user});    
// }
// async function test(){
// try {
//     await find_user("minhhoi1234");
// } catch (error) {
//     console.log(error);
//     console.log()
// }
// }

// test();

const delete_user = function(name_of_user) {
    mongooseConn = connect_to_database(USER_DATABASE);
    const USER_ACCOUNT_SCHEMA = new mongoose.Schema({
        userName: String,
        passWord: String,
        firstName: String,
        lastName: String
    });
    const USER_ACCOUNT = mongoose.model(USER_COLLECTION, USER_ACCOUNT_SCHEMA);

    return USER_ACCOUNT.deleteOne({userName: name_of_user});
}

// delete_user("hien").then((result) => {
//     if (result.deletedCount == 0){
//         console.log("No Record To Delete !!!");
//     } else {
//         console.log("Deleted !!!");
//     }
// }).catch((err) => {
//     console.log(err);
// });

// var userInfo = ["admin", "root", "admin", "admin"];
// insert_new_user(userInfo);

const update_user = function(name_of_user, userName, passWord, firstName, lastName) {
    mongooseConn = connect_to_database(USER_DATABASE);
    const USER_ACCOUNT_SCHEMA = new mongoose.Schema({
        userName: String,
        passWord: String,
        firstName: String,
        lastName: String
    });
    const USER_ACCOUNT = mongoose.model(USER_COLLECTION, USER_ACCOUNT_SCHEMA);

    return USER_ACCOUNT.updateOne(
        {userName: userName},
        {passWord: passWord},
        {firstName: firstName},
        {lastName: lastName}
    );
}

update_user("admin", "HIEN", "HIEN", "HIEN", "HIEN").then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});
