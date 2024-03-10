const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const { checkForAuthentication,restrictTo }= require('./middlewares/auth')

const PORT = 8001;
const path = require('path')
const URL = require('./models/url')

const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRoute')
const userRoute = require('./routes/user')

//connection to mongodbsh 
const { connectToMongoDB } = require('./connect')
connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log("mongodb will be connected!"))



//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication);



app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));


app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRoute);
app.use('/', staticRoute);



app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory:{
                    timestamp: Date.now(),
                },
            },

        }
    );
    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server will be started at port no-${PORT}`));


