const express = require('express');
const router = express.Router();
const {body,validationResult} = require('express-validator');
const  User = require('../models/User')
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken')
const authenticate = require('../middlewarse/authenticate')

/*
@usage : Register user
@access : public
@field : name , email, password
@methode : post
@url : /api/users/register

*/

router.post('/register' , [
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required'),
    body('password').notEmpty().withMessage('password is required')
],async (request, response) => {
    let error = validationResult(request);
    if (!error.isEmpty()){
        return response.status(401).json({error : error.array()});
    }
    try {
        let {name , email , password} = request.body
        // check user already exist or not

        let user = await User.findOne({email : email})

        if (user){
            return response.status(401).json({message : ' User is Already Exist'})
        }

    // encode the password
        const salt = await bcrypt.genSalt(10);
         password = await bcrypt.hash(password,salt);

         // gravatar image

        let avatar  = await gravatar.url(email, {
            s : 300,
            r : 'pg',
            d : 'mm'
        });

        // address

        let address = {
            flat : ' ',
            street : ' ',
            landmark : ' ',
            city : ' ',
            state : ' ',
            pin : ' ',
            mobile : ' '
        };

        // save user to db

         user = new User({name, email,password ,avatar ,address});
         user = await user.save();
         response.status(200).json(
             {
                 message : 'Registration is Success',
             }
         )


    }
    catch (error) {
        console.error(error)
        response.status(500).json({errors : [{message : error.message}]});
    }
});

/*
@usage : login user
@access : public
@field :  email, password
@methode : post
@url : /api/users/login

*/

router.post('/login', [
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
],async (request, response) => {
    let error = validationResult(request);
    if (!error.isEmpty()){
        return response.status(401).json({error : error.array()})
    }
    try {


        let {email, password} = request.body;
        // check email is correct or not
        let user = await User.findOne({email : email});
        if (!user){
            return  response.status(401).json({message : 'invalid credential'})
        }

        // decode password
       let isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch,)
        if(!isMatch){
            return  response.status(401).json({message : 'invalid credential'});
        }

        // create token

        let payload = {
            user : {
                id : user.id,
                email : user.email,
            }
        }
         jwt.sign(payload,process.env.JWT_SECRET_KEY, {expiresIn : 300000000000000} , (error,token) => {
          if (error) throw error
             response.status(200).json({
                 message : 'Login is success',
                 token : token
             })
        })


    }
    catch(error) {
        console.error(error);
        response.status(500).json({errors : [{message : error.message}]});

    }
});

/*
@usage : get user information
@access : private
@field :  no parameter
@methode : get
@url : /api/users/

*/

router.get('/' ,authenticate ,async (request, response) => {

    try{
        let user = await User.findById(request.user.id).select('-password');
        response.status(200).json({user : user});


    }
    catch(error) {
        console.error(error);
        response.status(500).json({error : [{message : error.message}]});

    }
});

/*
 usage : update an address
 methode : post
 url : /users/address
 field : flat , street , city , landmark , mobile, country , pin , state
 access : private

 */

router.post('/address' , authenticate  , [
    body('flat').notEmpty().withMessage("Flat is Required"),
    body('street').notEmpty().withMessage("Street is Required"),
    body('city').notEmpty().withMessage(" City is Required"),
    body('landmark').notEmpty().withMessage("Landmark is Required"),
    body('mobile').notEmpty().withMessage("Mobile is Required"),
    body('pin').notEmpty().withMessage("Pin is Required"),
    body('state').notEmpty().withMessage("State is Required")
] , async (request, response) => {
    let error = validationResult(request);
    if (!error.isEmpty()){
        return response.status(401).json({error : error.array()})
    }

    try{
        let user = await User.findById(request.user.id)
        user.address = {
            flat: request.body.flat,
            street: request.body.street,
            city: request.body.city,
            landmark: request.body.landmark,
            mobile: request.body.mobile,
            state: request.body.state,
            pin: request.body.pin
        };

        user = await user.save();
        response.status(200).json({
            message : 'Address is updated',
            userInfo : user
        })


    }
    catch (error) {
        console.log(error);
        response.status(500).json({errors : [{message : error.message}]});
    }
})






module.exports = router;