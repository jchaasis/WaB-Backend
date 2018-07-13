const express = require('express');
const Sequelize = require('sequelize');
//will use bodyparser to accept the form data for the score
const bodyparser = require('body-parser');


//establish server
const app = express();
//initialize bodyparser
app.use(bodyparser.urlencoded({ extended: false }));

//create database
const db = new Sequelize('whackaBrady', 'christianhaasis', '', {
    dialect: 'postgres',
});


app.listen(3003, function(){
    console.log("Whack awhay on on port 3003");
  });