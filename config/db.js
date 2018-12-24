const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const phonebookSchema = require('../models/phoneBookSchema');
const connectionString = 'mongodb://localhost:27017/phoneBook';

let Data = async () =>{
    mongoose.connect(connectionString,{useNewUrlParser: true}).then(
        ()=>{
        console.log("Connectd to Database!");
    }).catch((err)=>{
        console.log(err);
    });

};
module.exports = Data;
