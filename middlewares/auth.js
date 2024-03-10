const { getUser } = require('../service/auth');

function checkForAuthentication(req,res,next){
    const authorizationHeadersValue = req.headers["authorization"]
    req.user = null;
    if(
        !authorizationHeadersValue  ||
        !authorizationHeadersValue.startWith("Bearer")
    )
    return next();
}



async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.headers['Authorization'];

    if(!userUid)  return res.redirect("/login");
    const token = userUid.split("Bearer ")[1];

    const user = getUser(token);

    if(!user) return res.redirect("/login");
    req.user = user;
    next();

}

async function checkAuth(req, res, next) {
    const userUid = req.headers['authorization'];
    const token = userUid.split("Bearer ")[1];
    const user = getUser(token)
    req.user = user;
    next();

}


module.exports={
    restrictToLoggedinUserOnly,
    checkAuth,

}