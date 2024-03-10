const { get } = require('mongoose');
const { getUser } = require('../service/auth');

function checkForAuthentication(req,res,next){
    const authorizationHeadersValue = req.headers["authorization"]
    req.user = null;
    if(
        !authorizationHeadersValue  ||
        !authorizationHeadersValue.startWith("Bearer")
    )
    return next();
    const token  = authorizationHeadersValue.split("Bearer ")[1];
    const user = getUser(token);
     
    req.user = user;
    return  next();

}

module.exports={
    checkForAuthentication
    

}