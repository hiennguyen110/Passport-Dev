const mongoose = require("mongoose");
// mongoose.connect("mongodb+srv://patsdatabase:52435798H$a@patskahootdbs-irwee.gcp.mongodb.net/thisfruit?retryWrites=true&w=majority", { useNewUrlParser: true });
// const fruitSchema = new mongoose.Schema({
//     name: String, 
//     rating: Number,
//     review: String
// });

// const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit({
//     name: "Apple", 
//     rating: 10,
//     review: "It is really good"
// });

// fruit.save();

function add_new_item(dbsName){
    mongoose.connect("mongodb+srv://patsdatabase:52435798H$a@patskahootdbs-irwee.gcp.mongodb.net/" + dbsName + "?retryWrites=true&w=majority", { useNewUrlParser: true });
    const fruitSchema = new mongoose.Schema({
        name: String, 
        rating: Number,
        review: String
    });
    
    const Fruit = mongoose.model("Fruit", fruitSchema);
    
    const fruit = new Fruit({
        name: "Apple", 
        rating: 10,
        review: "It is really good"
    });
    
    fruit.save();
}

add_new_item("myfruit");