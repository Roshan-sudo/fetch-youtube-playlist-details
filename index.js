const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middlewares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));

// Custom Modules
require('./modules/apis')(app);
const Playlist = require('./modules/mongooseModel').Playlist;
const fetchData = require('./modules/fetchData');

// Root Route
app.get('/', (req, res)=>{
    res.render('home');
});

// Route to Fetch Youtube Playlist 
app.post('/', (req, res)=>{
    var playlistId = '';
    const info = req.body.info;
    if(req.body.playlistId !== null && req.body.playlistId !== ''){
        playlistId = req.body.playlistId;
    }else{
        res.send('Playlist Id is invalid!');
    }
    // const playlistId = 'PLesyu_gd_4TENvoa6wLk0zQZc6JsNOslo';
    const params = { playlistId : playlistId, nextPageToken : '' };
    // Function to fetch and/or save data in database
    (async ()=>{
        // Get Playlist Details
        const playlistDetails = await fetchData.getPlaylistDetails(playlistId);
        if(playlistDetails.error) res.send(playlistDetails.msg)
        // Get Videos Id
        const videoIds = await fetchData.getVideosId(params);
        // Get Videos Details
        const videosDetails = await fetchData.getVideosDetails(videoIds);
        // Merge all videos details in playlist details
        playlistDetails.videos = videosDetails;
        // Object to save in database
        const dbData = {
            playlistDetails : playlistDetails
        };
        // Request is to only fetch data - (respond with fetched data)
        if(info == 'fetch'){
            res.send(dbData);
        }else if(info == 'save'){
            // Request is to fetch and save data - (save data in DB and respond with saved data)
            // Check if playlist is present in Databse
            const data = await Playlist.findOne({"playlistDetails.playlistId" : playlistDetails.playlistId}).exec();
            if(data){
                // Playlist is already saved in Database - (Show message)
                res.send("Playlist is already present in Database");
            }else{
                // Playlist is not on Database - (Save and respond with the same data)
                const newPlaylist = new Playlist(dbData);
                newPlaylist.save();
                res.send(dbData);
            }
        }else res.send("Something is wrong in your request! Please try again.")   
    })().catch((err)=>{
        console.log(err);
        res.send("Error  : "  + err);
    });
});

app.listen(3000, ()=>{
    console.log('Listening on Port 3000');
});