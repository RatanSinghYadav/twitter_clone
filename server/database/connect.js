const mongoose = require('mongoose');

url = "mongodb+srv://ratan:123@cluster0.ucntasj.mongodb.net/twitter_clone_database?retryWrites=true&w=majority";

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connected to MongoDB Database!")
}).catch((error)=>{
    console.log(error )
})