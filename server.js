const express = require("express");
const bodyParser = require('body-parser');
const Song = require("./models/song");
var cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());
const router = express.Router();

//Grab all songs in the database
router.get("/songs", function(req,res){
    Song.find(function(err,songs){
        if (err){
            res.status(400).send(err);
        }
        else{
            res.json(songs);
        }

    });


});

//add a song to the database
router.post("/songs", function(req,res){
    const song = new Song(req.body);
    song.save(function(err,song){
        if(err){
            res.status(400).send(err);
        }
        else{
            res.status(201).json(song)
        }
    })
})

app.use("/api", router);
app.listen(3000);