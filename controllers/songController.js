const SongModel = require("../models/songModel")
const createSong = async (req, res) => {
    try {
        const newSong = await new SongModel(req.body);
        newSong.user = req.user.id;
        newSong.save();
        res.json(newSong);
    } catch (error) {
        res.status(500).json({msg: "Nous avons rencontrer une erreur"});
    }
}
const allSong = async (req, res) => {
    try {
        const songs = await SongModel.find()
            .sort({ createAt: -1 });
        res.json(songs);
    } catch (error) {
        res.status(500).json({ msg: "Nous avons rencontrer une erreur" });
    }
}
const updateSong = async (req, res, next) => {
    const id = req.params.id;

    try {
        let song = await SongModel.findOneAndUpdate(id, req.body);
        if (!song) {
            const error = new Error("Wrong request");
            throw error;
        }
        res.json(song);
    } catch (error) {
        next(error);
    }
}
const deleteSong = async (req, res, next) => {
    const id = req.params.id;
    try {
        const song = await SongModel.findOneAndRemove({_id: id});
        if (!song) {
            const error = new Error("Wrong request");
            throw error;
        }
        res.json({msg: "Le song a bien été supprimé !"});
    } catch (error) {
        next(error);
    }
}
const findSong = async (req, res) => {
    const id = req.params.id;
    try {
        const song = await SongModel.findOne(
            {_id: id}
        );
        res.json(song);
    } catch (error) {
        res.status(500).json({msg: "Nous avons rencontrer une erreur"});
    }
}

module.exports = {findSong, allSong, deleteSong, updateSong, createSong}
