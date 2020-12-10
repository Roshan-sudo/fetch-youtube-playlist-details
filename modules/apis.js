module.exports = (app)=>{
    const Playlist = require('./mongooseModel').Playlist;

    // To fetch all playlists
    app.get('/api/playlists', (req, res)=>{
        Playlist.find({}, '-_id -__v', (err, data)=>{
            if(!err) res.send(data)
            else res.send(err)
        });
    });
    
    // To fetch specific playlist using "playlist ID"
    app.get('/api/playlists/:playlistId', (req, res)=>{
        Playlist.findOne({'playlistDetails.playlistId' : req.params.playlistId}, '-_id -__v', (err, data)=>{
            if(!err){
                if(data) res.send(data)
                else res.send('No Data With That Playlist ID')
            }else res.send(err)
        });
    });

    // To fetch all videos of a playlist
    app.get('/api/playlists/:playlistId/videos', (req, res)=>{
        Playlist.findOne({'playlistDetails.playlistId' : req.params.playlistId}, '-_id -__v', (err, data)=>{
            if(!err){
                if(data) res.send(data.playlistDetails.videos)
                else res.send('No Data With That Playlist ID')
            }else res.send(err)
        });
    });
}