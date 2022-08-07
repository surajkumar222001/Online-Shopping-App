const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
name : {type : String , required :true },
email : {type : String , required :true , unique : true },
password : {type : String , required :true },
avatar : {type : String , required :true },
isAdmin : {type : Boolean , default :false },
address : {
    flat : {type: String , required:true},
    street : {type: String , required:true},
    landmark : {type: String , required:true},
    city  : {type: String , required:true},
    state  : {type: String , required:true},
    pin  : {type: String , required:true},
    mobile  : {type: String , required:true},
}
},{timestamps : true});

let User = mongoose.model('user',userSchema);
module.exports = User;

