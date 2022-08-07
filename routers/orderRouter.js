const  express = require("express");
const  router = express.Router();
const authenticate = require('../middlewarse/authenticate');
const {body,validationResult} = require('express-validator')
const User = require("../models/User")
const Order = require("../models/Order")


/*
usage : order place
methode : post
url : /api/orders/
access: private
field : tax, total, items

 */

router.post('/',authenticate , [
    body('total').notEmpty().withMessage("Total is required"),
    body('tax').notEmpty().withMessage("Tax is required"),
    body('items').notEmpty().withMessage("Items is required"),

] , async (request,response) => {
    let error = validationResult(request)
    if (!error.isEmpty()){
        return response.status(401).json({error : error.array()})
    }
    try {
        let {total , tax , items} = request.body
        let user = await User.findById(request.user.id)

        let orderList = new Order ({
            name : user.name,
            email : user.email,
            mobile : user.address.mobile,
            total : total,
            tax : tax,
            items : items
        });

        let newOrder = await orderList.save();
        response.status(200).json({
            message : "Order Placed",
            orderList : newOrder
        })




    }
    catch (error) {
        console.error(error);
        response.status(500).json({error : [{message : error.message}]});
    }
})



module.exports = router;