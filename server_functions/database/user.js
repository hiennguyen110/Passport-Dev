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
 
const find_user = function(userName){
    mongooseConn = connect_to_database(USER_DATABASE);
    const USER_ACCOUNT_SCHEMA = new mongoose.Schema({
        userName: String,
        passWord: String,
        firstName: String,
        lastName: String
    });
    const USER_ACCOUNT = mongoose.model(USER_COLLECTION, USER_ACCOUNT_SCHEMA);

    USER_ACCOUNT.findOne({userName: userName}, function(err, users){
        if (err){
            console.log(highlighter.error_highlighter(err));
            mongoose.connection.close();
            return false;
        } else {
            var userName = users.userName;
            return userName;
        }
    });

    

    // USER_ACCOUNT.findOne({userName: userName}, function(error, users){
    //     if (error){
    //         console.log(highlighter.error_highlighter(error));
    //         mongoose.connection.close();
    //         return false;
    //     } else {
    //         if (users){
    //             users.forEach(function(user){
    //                 console.log(user.userName);
    //             })
    //         } else {
    //             return false;
    //         }
    //         mongoose.connection.close();
    //     }
    // });
    // return true;
}

const update_user = function(userInfo, userToFind){
    userName = userInfo[0]; 
    passWord = userInfo[1];
    firstName = userInfo[2];
    lastName = userInfo[3];

    mongooseConn = connect_to_database(USER_DATABASE);
    const USER_ACCOUNT_SCHEMA = new mongoose.Schema({
        userName: String,
        passWord: String,
        firstName: String,
        lastName: String
    });
    const USER_ACCOUNT = mongoose.model(USER_COLLECTION, USER_ACCOUNT_SCHEMA);
    USER_ACCOUNT.find({userName: userToFind}, function(error, users){
        if (error){
            console.log(highlighter.error_highlighter(error));
            mongoose.connection.close();
        } else {
            if (users){
                users.forEach(function(user){
                    USER_ACCOUNT.updateOne({_id: user._id},
                        {userName: userName},
                        // {passWord: passWord},
                        // {firstName: firstName}, 
                        // {lastName: lastName},
                        function(err){
                            if (err){
                                console.log(highlighter.error_highlighter(err));
                            } else {
                                console.log(highlighter.success_highlighter("Record updated !!!"));
                                mongoose.connection.close();
                            }
                        }
                        );
                });
                
            } else {
                console.log(highlighter.warning_highlighter("Cannot update record !!!"));
            }
        }
    });
}

//  userInfo = ['minhhoi1234', 'AAA', 'AAA', 'AAA'];
// // insert_new_user(userInfo);
// update_user(userInfo, "hiennguyen123");
// find_user("willNguyen");
// find_user("NGUYEN DAO THE HIEN");

// console.log(userName);

const search_username = new Promise((resolve, reject) => {
    mongooseConn = connect_to_database(USER_DATABASE);
    const USER_ACCOUNT_SCHEMA = new mongoose.Schema({
        userName: String,
        passWord: String,
        firstName: String,
        lastName: String
    });
    const USER_ACCOUNT = mongoose.model(USER_COLLECTION, USER_ACCOUNT_SCHEMA);
    USER_ACCOUNT.findOne({userName: "minhhoi1234"}, function(err, users){
        if (err){
            mongoose.connection.close();
            reject("Got some error !!!");
        } else {
            resolve(users.userName);
        }
    })
});

search_username.then((result) => {
    if (result){
        console.log(result);
    }  
}).catch((error) => {
    console.log(error);
})

module.exports = {
    insert_new_user: insert_new_user,
    find_user: find_user,
}