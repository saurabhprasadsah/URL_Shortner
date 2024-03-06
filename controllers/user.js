
const User = require("../models/user"); 

async function handleUserSignup(req, res){
    const  {name, email, password} = req.body;

    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}

async function handleUserLogin(req, res){
    const  {email, password} = req.body;
    const user = await User.findOne({email,  password });
    console.log(user);
    if(!user)
        return res.render("login", {
         error: "Invalid username and password",
    });
    return res.redirect("/");
}


module.exports = {
    handleUserSignup,
    handleUserLogin,
    
}