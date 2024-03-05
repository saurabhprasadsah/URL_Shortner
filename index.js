const express = require("express");
const app = express();
const PORT = 8001;

const URL = require('./models/url')
const urlRoute = require("./routes/url");

const { connectToMongoDB } = require('./connect')

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log("mongodb will be connected!"))

app.use(express.json());

app.use("/url", urlRoute);


app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
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


