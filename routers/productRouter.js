const  express = require('express');
const router = express.Router();
const authenticate = require('../middlewarse/authenticate');
const {body,validationResult} = require('express-validator')
const Product = require('../models/Products');



/*
@usage : Upload Product
@access : private
@field : name , image, price , brand , qty , description , usage , category
@methode : post
@url : /api/products/upload

*/


router.post('/upload',authenticate, [
     body('name').notEmpty().withMessage('Name is required'),
     body('image').notEmpty().withMessage('image is required'),
     body('price').notEmpty().withMessage('Price is required'),
     body('brand').notEmpty().withMessage('Brand is required'),
     body('qty').notEmpty().withMessage('Qty is required'),
     body('description').notEmpty().withMessage('Description is required'),
     body('usage').notEmpty().withMessage('Usage is required'),
     body('category').notEmpty().withMessage("Category is required")] ,
     async (request , response) => {
     let error = validationResult(request);
     if (!error.isEmpty()){
         return response.status(401).json({error : error.array()})
     }

     try{
         let {name , image , price , brand , qty , description ,  category ,usage} = request.body;
         let product = new Product({name , image , price , brand , qty , description , category,usage});
             product =  await product.save();



             response.status(200).json({
                 message : 'Product is Upload',
                 product : product
             });


     }
     catch (error) {
         console.error(error)
         response.status(500).json({error : [{message : error.message}]});
     }
 });


/*
@usage : get men collection
@access : public
@field : no-field
@methode : get
@url : /api/products/mens

*/

/// get MEN collection

router.get('/men',  async (request, response) => {

    try {

        let product = await Product.find({category : 'MEN' })
        response.status(200).json({
            product : product
        });

    }
    catch (error) {
        console.error(error)
        response.status(500).json({error : [{message : error.message}]});
    }
});


/*
@usage : get women collection
@access : public
@field : no-field
@methode : get
@url : /api/products/women

*/

/// get WOMEN collection

router.get('/women',  async (request, response) => {

    try {

        let product = await Product.find({category : 'WOMEN' })
        response.status(200).json({
            product : product
        });

    }
    catch (error) {
        console.error(error)
        response.status(500).json({error : [{message : error.message}]});
    }
})

  /// get KIDS collection

/*
@usage : get kids collection
@access : public
@field : no-field
@methode : get
@url : /api/products/kids

*/

router.get('/kids',  async (request, response) => {

    try {

        let product = await Product.find({category : 'KIDS' })
        response.status(200).json({
            product : product
        });

    }
    catch (error) {
        console.error(error)
        response.status(500).json({error : [{message : error.message}]});
    }
});


/*
@usage : get a single product by id
@access : public
@field : no-field
@methode : get
@url : /api/products/:product_id

*/


router.get( '/:product_id' ,  async (request, response) => {

    try {
        let productId = request.params.product_id;
        let product = await Product.findById(productId);
        response.status(200).json({
            product : product
        });

    }
    catch (error) {
        console.error(error)
        response.status(500).json({error : [{message : error.message}]});
    }
});










module.exports = router;