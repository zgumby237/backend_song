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

    let query = {};
    if(req.query.genre){
        query = {genre: req.query.genre};
    }


    Song.find(query,function(err,songs){
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

router.get("/songs/:id", function(req, res) {
    // Use the ID in the URL path to find the song
    Song.findById(req.params.id, function(err, song) {
       if (err) {
          res.status(400).send(err);
       } 
       else {
          res.json(song);
       }
    });
 });

 router.put("/:id", function(req, res) {
    // Song to update sent in body of request
    const song = req.body;
 
    // Replace existing song fields with updated song
    Song.updateOne({ _id: req.params.id }, song, function(err, result) {
       if (err) {
          res.status(400).send(err);
       } 
       else if (result.n === 0) {
           res.sendStatus(404);
       } 
       else {
           res.sendStatus(204);
       }
    });
 });

 router.delete("/songs/:id", function(req, res) {
    Song.deleteOne({ _id: req.params.id }, function(err, result) {
       if (err) {
          res.status(400).send(err);
       } 
       else if (result.n === 0) {
          res.sendStatus(404);
       } 
       else {
          res.sendStatus(204);
       }
    });
 });

app.use("/api", router);
app.listen(3000);