const Favourites = require('../model/favourites')


const fetchFavourites = async (req,res)=>{
    let favouritesList
    try{
        favouritesList = await Favourites.find()
    }catch(err){
        console.log(err)
    }
    if(!favouritesList){
        return res.status(404).json({message:'favourites is empty'})
    }
    return res.status(200).json({favouritesList})
}


const addSongToFavourites = async(req,res)=>{
    const {track,track_id} =req.body

    try {
        const existingFavourite = await Favourites.findOne({track_id:track.id});
        if (existingFavourite) {
          return res.status(400).send('This track is already in your favourites');
        }
        const newFavourite = new Favourites({
            track,track_id
        })
        await newFavourite.save()
    }catch(err){
        console.log(err)
    }
    return res.status(200).json({message:'song added successfully'})
}

const removeSongFromFavourites = async (req,res)=>{
    const id = req.params.id

    try{
        const findCurrentSong = await Favourites.findOneAndDelete({track_id:id})
        if(!findCurrentSong){
            return res.status(404).json({message:'song not found'})
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({message:'unable to delete song'})
    }
    return res.status(200).json({message:'song removed successfully'})
}

module.exports = {fetchFavourites,addSongToFavourites,removeSongFromFavourites}