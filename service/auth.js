const  jwt = require("jsonwebtoken");
const secret = "Saurabh$@123";

//user jwttoken
function setUser(user){
    return jwt.sign({
        _id: user._id,
        email:user.email,
        role:user.role,
    },
    secret
    );
}

//user jwtusertoeken
function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token, secret)
    }catch(error){
        return null;
    }
}

module.exports={
    setUser,
    getUser,
};

