const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true , unique : true},
    mobile : {type : Number, required : true , unique : true},
    total : {type : Number, required : true , unique : true},
    tax : {type : Number, required : true , unique : true},
    items : [
        {
            name : {type : String, required : true},
            brand : {type : String, required : true},
            qty : {type : Number, required : true},
            price : {type : Number, required : true}
        }
    ],

},{timestamps : true});


const Order = mongoose.model('order', OrderSchema);
module.exports = Order