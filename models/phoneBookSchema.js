const mongoose = require("mongoose");
const phoneBookSchema = new mongoose.Schema ({
    firstName:{
        type:mongoose.Schema.Types.String, required:true,trim:true
    },
    address:{
        type:mongoose.Schema.Types.String, required:true,trim:true
    },
    phoneNum:{
        type:mongoose.Schema.Types.String, required:true,trim:true
    },
    creator:{
        type:mongoose.Schema.Types.String,required:true
    }
});
module.exports= mongoose.model("phoneBookSchema",phoneBookSchema);


