require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const leaderboardRouter = require("./routes/leaderboardRouter.js");
const PORT = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;
mongoose.Promise = global.Promise;

mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log("\n...API Connected to database ...\n"))
    .catch((err) => {
        console.error(`\n*** ERROR connecting to database****: ${err}`);
    });

const server = express();
server.use(express.json());
server.use(cors({ origin: process.env.REACT_APP_ENDPOINT }));
server.use(function (req, res, next) {
    if (req.method === "OPTIONS") {
        res.status(200).end();
    } else {
        next();
    }
});

server.use("/leaderboard", leaderboardRouter);
server.get("/", (req, res) => res.send("API Running..."));

server.listen(PORT, () => console.log(`\n\nAPI running on port ${PORT}`));
