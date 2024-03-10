const express = require("express");
const { restrictTo } =require("../middlewares/auth");
const URL = require("../models/url")
const router = express.Router();

router.get("/", restrictTo(['NORMAL']), async (req, res) => {
    const allurls =  await URL.find({createdbBy: req.user._id });
    return res.render("home", {
        urls: allurls,
    });
});


router.get("/signup",(req, res) =>{
    return res.render("signup");
})


router.get("/login",(req, res) =>{
    return res.render("login");
})


module.exports = router;

