const express = require('express');
const Sequelize = require('sequelize');
//will use bodyparser to accept the form data for the score
const bodyparser = require('body-parser');


//establish server
const port = process.env.PORT || 4000;
const app = express();
//initialize bodyparser
app.use(bodyparser.urlencoded({ extended: false }));

//create database
const db = new Sequelize('whackaBrady', 'christianhaasis', '', {
    dialect: 'postgres',
});

const Score = db.define('score', {
    player: Sequelize.STRING,
    score: Sequelize.INTEGER,
});

// Sychronize the 'todo' schema with the database, meaning make
// sure all tables exist and have the right fields.
Score.sync().then(function () {
    console.log('scores has synced')
    // Score.create({
    //      player: 'TST',
    //      score: 7,
    // });
});

//establish routes

  //get routes
  //get all the scores to display on the sidebar
  app.get("/", function(req, res){
    console.log(req);
    console.log('received the get request');
    Score.findAll().then((items)=>{
      res.send({
                Scores: items,
      });
    });
  });

app.listen(port, function(){
    console.log("Whack awhay on on port 4000");
  });