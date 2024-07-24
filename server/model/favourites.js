const mongoose = require('mongoose')

const {Schema} = mongoose

const favouritesSchema = new Schema({
    track_id:{
        type:String,
        unique:true
    },
    track:{
        type:Object
    }
})

module.exports = mongoose.model("Favourites",favouritesSchema)