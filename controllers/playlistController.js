const PlayListModel = require("../models/playlistModel")

const allPlaylist = async (req, res) => {
    try {
        const playlists = await PlayListModel.find()
            .sort({createAt: -1});
        res.json(playlists);
    } catch (error) {
        res.status(500).json({msg: "Nous avons rencontrer une erreur"});
    }
}

const findPlaylist = async (req, res) => {
    const id = req.params.id;
    try {
        const playlist = await PlayListModel.findOne(
            {_id: id, user: req.user.id}.populate("user"))
        ;
        res.json(playlist);
    } catch
        (error) {
        res.status(500).json({msg: "Nous avons rencontrer une erreur"});
    }
}
const createPlaylist = async (req, res) => {
    try {
        const newPlaylist = await new PlayListModel(req.body);
        newPlaylist.user = req.user.id;
        newPlaylist.save();
        res.json(newPlaylist);
    } catch (error) {
        res.status(500).json({msg: "Nous avons rencontrer une erreur"});
    }
}
const updatePlaylist = async (req, res, next) => {
    const id = req.params.id;

    try {
        let playlist = await PlayListModel.findOneAndUpdate(id, req.body);
        if (!playlist || playlist.user !== req.user.id) {
            const error = new Error("Wrong request");
            throw error;
        }
        res.json(playlist);
    } catch (error) {
        next(error);
    }
}

const deletePlaylist = async (req, res, next) => {
    const id = req.params.id;
    try {
        const playlist = await PlayListModel.findOne({_id: id});
        if (!playlist || playlist.user !== req.user.id) {
            const error = new Error("Wrong request");
            throw error;
        }
        playlist.remove()
        res.json({msg: "Le post a bien été supprimé !"});
    } catch (error) {
        next(error);
    }
}

const addSongToPlaylist = async (req, res) => {
    const idSong = req.body.id_song;
    const idPlaylist = req.params.id;


    try {
        const playList = await PlayListModel.findOne({_id: idPlaylist});
        playList.songs.push(idSong)

        playList.save()
        // const songAdd = await playList.update
        res.json(await PlayListModel.findOne({_id: idPlaylist}));
    } catch (error) {
        res.status(500).json({msg: "Nous avons rencontrer une erreur"});
    }
}


module.exports = {addSongToPlaylist, createPlaylist, updatePlaylist, deletePlaylist, findPlaylist, allPlaylist}
