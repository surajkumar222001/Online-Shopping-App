const  jwt = require('jsonwebtoken');


let authenticate = async (request , response, next) => {

    // get token from header
    const token =request.header('x-auth-token');

    //check token is available or not

    if (!token){
        return response.status(401).json({msg : 'No-token,Authorization denied'})
    }

    //decode token

   try {
       const decode = jwt.verify(token,process.env.JWT_SECRET_KEY )

       request.user = decode.user;
       next()
   }
    catch(error) {
       console.error(error)
       response.status(500).json({message: 'Token is not valid'})
    }
};

module.exports = authenticate;