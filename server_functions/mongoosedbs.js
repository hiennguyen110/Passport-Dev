const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://patsdatabase:52435798H$a@patskahootdbs-irwee.gcp.mongodb.net/test?retryWrites=true&w=majority");
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