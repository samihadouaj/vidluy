const mongoose = require('mongoose');
const genreSchema = mongoose.Schema({
    genre: {type: String, required: true , minlength: 3,
        validate: {
            isAsync: true,
            validator: async function(g, callback) {
                const gg = await Genre.find({genre: g});
                console.log('gg', gg);
                callback(!gg.length);
            },
                message:'this genre exists'
        }
    }
})

const Genre = mongoose.model('Genre', genreSchema);

const db = {
    genreSchema: genreSchema,
    addGenre:  async function (name) {
        try{
            const g = new Genre({
                genre: name
            })
           const saved = await g.save()
           console.log('saved' , saved);
        }
      catch(err) {console.log(err.message)}
    },

    getAll: async function() {
        const genres =  await Genre.find()
        .sort('name')
        .select('genre')
        return(genres)
    },
    getElement: async function(id){
        if(id.match(/^[0-9a-fA-F]{24}$/)) 
        {const element = await Genre.findOne({_id: id})
        return element
         }
        
    },
    updateEl: async function(id, newGenre) {
        const element =await Genre.update({_id: id}, {$set:{
                genre: newGenre}}
        )
        return element;
    },
    deleteEl: async function(id) {
        const element = await Genre.deleteOne({_id: id})
    }
}


module.exports = db