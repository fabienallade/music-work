const {mongoose, Schema} = require("mongoose");
const UserModel = require("./userModel")

const songSchema = new Schema({
    title: {type: String, required: true},
    url: {type: String, required: true},
    rating: {type: Number, default: 0},
    artist: {type: String}
}, {timestamps: true});

const SongModel = mongoose.model("Song", songSchema);

module.exports = SongModel;
