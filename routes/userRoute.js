const {register, login, me, myPlaylist} = require("../controllers/userController");
const passportJWT = require("../middlewares/passportJWT")();

const userRouter = require("express").Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/me", passportJWT.authenticate(), me)
userRouter.get("/my_playlist", passportJWT.authenticate(), myPlaylist)

module.exports = userRouter;
