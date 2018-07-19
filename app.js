const express = require('express');
const Sequelize = require('sequelize');
//will use bodyparser to accept the form data for the score
const bodyparser = require('body-parser');


//establish server
const port = process.env.PORT || 4000;
const app = express();
//initialize bodyparser
app.use(bodyparser.urlencoded({ extended: false }));

//enable cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
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
    Score.findAll().then((items)=>{
      res.send({
                Scores: items,
      });
    });
  });

  app.post("/add", function(req, res){
    let data = [];

    req.on('data', (chunk) => {
        data.push(chunk);
      }).on('end', () => {

        data = Buffer.concat(data).toString();

        console.log('this is the body: ' + data)
      })

      console.log(data)
      res.send({
          'request received': true
      })
  })

app.listen(port, function(){
    console.log("Whack awhay on on port 4000");
  });