const mongoose = require( 'mongoose' );

/* Your code goes here */
const sportsCollectionSchema =mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true
    },
    name : {
        type: String,
        require : true
    },
    num_players: {
        type: Number,
        require: true
    }
})

const sportsCollection = mongoose.model('sports', sportsCollectionSchema);

const Sports = { 

    createSport : function( newSport )
    {
        return sportsCollection
            .create(newSport)
            .then( createdSport => {
                return createdSport;
            })
            .catch(error => {
                return error;
            })

    },

    createSportTwo : function(id, name, num_players)
    {
        return sportsCollection
            .create({"id":id, "name":name,"num_players":num_players})
            .then( createdSport => {
                return createdSport;
            })
            .catch(error => {
                return error;
            })

    }

}
module.exports = {
    Sports
};