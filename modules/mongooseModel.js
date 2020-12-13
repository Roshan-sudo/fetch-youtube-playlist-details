const mongoose = require('mongoose');

// Connect to mongoose database
mongoose.connect('mongodb+srv://drNajeeb:drnajeeb1997@cluster0.xhcbv.mongodb.net/drNajeeb', {useNewUrlParser: true, useUnifiedTopology: true});

// Schema of playlists
const playlistsSchema = new mongoose.Schema({
    playlistDetails : {
        playlistId : String,
        playlistTitle : String,
        playlistDescription : String,
        playlistThumbnail : String,
        totalVideos : Number,
        videos : [
            {
                videoId : String,
                videoURL : String,
                videoTitle : String,
                videoDescription : String,
                videoThumbnail : String,
                videoLength : String
            }
        ]
    }
});

// Export Mongoose model
module.exports.Playlist = new mongoose.model('playlist', playlistsSchema);