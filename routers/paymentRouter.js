const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY)


router.post('/pay' , async (request, response) => {
  const {product, token} = request.body;

    try {
     // create customer
        const customer = await stripe.customers.create({
            email: token.email,
            source :token.id
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount : product.price,
            currency : 'INR',
            automatic_payment_methods: {
                enabled: true,
            },
        })
        response.status(200).json({
            charge : paymentIntent,
            clientSecret: paymentIntent.client_secret,
            customer : customer
        })
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = router