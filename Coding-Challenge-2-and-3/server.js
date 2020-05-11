const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );

const {Sports} = require('./models/sport-model');

const app = express();


/* Your code goes here */

let sports = [
    {
        sportId : 123,
        name: "basketball",
        num_players: "2"
    }

]

app.post('/sports/addSport/:sportId', jsonParser , (req,res) => {

    console.log("Creating New Sport");

    //params
    let id = req.params.sportId;

    //body
    let idBody = req.body.sportId;
    let name = req.body.name;
    let num_players = req.body.num_players;

    console.log(idBody,name,num_players , id);

    if(!id)
    {
        res.statusMessage = "You must send the id as parameter";
        return res.status(409).end();
    }

    if(!idBody,!name,!num_players)
    {
        res.statusMessage = "You must send sportId,namem and num_players in order to create sport";
        return res.status(409).end();
    }

    if(!(Number(id) === idBody))
    {
        res.statusMessage = "The id does not match";
        return res.status(409).end();
    }


    let flag = false;


    for(let i = 0 ; i < sports.length ; i++)
    {
        console.log("enter");
        if(sports[i].sportId === Number(id))
        {
            flag = true;
            res.statusMessage = "This ID belongs to another sport";
            return res.status(400).end();
        }
    }

    let newSport = {
        idBody,
        name,
        num_players
    }

    
    console.log(flag);
    if(!flag)
    {
        sports.push(newSport);
        return res.status(201).json(sports);
    }


    /*
    Sports
        .createSport(newSport)
        .then(result => {
            return res.status(201).json(result);
        })
        .catch( error => {
            res.statusMessage = "Db";
            return res.status(400).end();
        })

        */
});


app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});