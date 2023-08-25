const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");
const playlistRoute = require("./routes/playlistRoute");
const songRoute = require("./routes/songRoute");
const passportJWT = require('./middlewares/passportJWT')()
const roleMiddleware = require("./middlewares/adminRole")

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/music-app");
    console.log(`📚[Database] is connected to MongoDB`);
}

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passportJWT.initialize())

app.get("/", (req, res) => {
    console.log("🐲");
});

app.use("/api/songs", passportJWT.authenticate(), songRoute);
app.use("/api/playlists", passportJWT.authenticate(), playlistRoute);
app.use("/api/users", userRouter);
app.listen(port, () => console.log(` ⚡️ [SERVER] is running on : ${port}`));
