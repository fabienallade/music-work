const {findSong, allSong, deleteSong, updateSong, createSong} = require("../controllers/songController");
const roleMiddleware = require("../middlewares/adminRole");

const songRoute = require("express").Router();

songRoute.post("/", roleMiddleware, createSong);
songRoute.put("/", roleMiddleware, updateSong);
songRoute.get("/", allSong);
songRoute.get("/:id", findSong);
songRoute.delete("/:id", roleMiddleware, deleteSong);

module.exports = songRoute
