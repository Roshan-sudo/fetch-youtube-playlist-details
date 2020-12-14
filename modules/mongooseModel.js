const mongoose = require('mongoose');

// Connect to mongoose database
mongoose.connect('mongodb://localhost:27017/youtubeApi', {useNewUrlParser: true, useUnifiedTopology: true});

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