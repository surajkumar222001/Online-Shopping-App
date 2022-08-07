const express = require('express');
const  app = express();
const cors = require('cors');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');


// configure cors

app.use(cors());


//configure express to get form data

app.use(express.json());

// configure dotenv

dotEnv.config({path: './.env'});

const port = process.env.PORT || 5000;

// configure mongodb connection;

mongoose.connect(process.env.MONGODB_CLOUD_URL,{
    useUnifiedTopology : true,
    useNewUrlParser : true
   /* useFindAndModify: false,*/
    /*useCreateIndex : true*/

}).then((response)=> {
    console.log('Connected to MongoDB Cloud Successfully............');
}).catch((error) => {
  console.error(error);
  process.exit(1)
});





// simple request



app.get('/' , (request, response) => {
    response.send(`<h2>welcome to brains kart online shoping web app </h2>`)
});

// Router configure

app.use('/api/users' , require('./routers/userRouter'));
app.use('/api/products' , require('./routers/productRouter'));
app.use('/api/orders' , require('./routers/orderRouter'));
app.use('/api/payment' , require('./routers/paymentRouter'))



app.listen(port , () => {
    console.log(`server is started at port :${port}`)
})