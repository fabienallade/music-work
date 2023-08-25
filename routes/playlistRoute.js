const {
    addSongToPlaylist,
    allPlaylist,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    findPlaylist
} = require("../controllers/playlistController")
const playlistRoute = require("express").Router();


playlistRoute.post("/", createPlaylist);
playlistRoute.put("/", updatePlaylist);
playlistRoute.get("/", allPlaylist);
playlistRoute.delete("/", deletePlaylist);
playlistRoute.get("/:id", findPlaylist);
playlistRoute.post("/:id/addSong", addSongToPlaylist);

module.exports = playlistRoute
