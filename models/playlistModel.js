const {mongoose, Schema} = require("mongoose");

const playListSchema = new Schema({
    name: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}]
}, {timestamps: true});

const PlayListModel = mongoose.model("Playlist", playListSchema);

module.exports = PlayListModel;
