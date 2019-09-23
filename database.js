const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb+srv://patsdatabase:52435798H$a@patskahootdbs-irwee.gcp.mongodb.net/test?retryWrites=true&w=majority';

// Database Name
const dbName = 'user';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect(function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);

//   createCapped(db, "user_account", function() {
//     client.close();
//   });
    insert_data(db, function(){
        client.close();
    })
});

function createCapped(db, collection_name, callback) {
  db.createCollection(collection_name, { "capped": true, "size": 100000, "max": 5000},
    function(err, results) {
      console.log("Collection created.");
      callback();
    }
  );
};

function insert_data(db, callback){
    const collection = db.collection("user_account");
    collection.insertMany([{
       userName: "Hien Nguyen",
       password: "rootAd" 
    }, 
    {
        userName: "Hien",
        password: "root"
    }, 
    {
        userName: "Hien",
        password: "root"
    }

]
    , function(err, result){
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Data inserted !!!");
         callback();
    });
}