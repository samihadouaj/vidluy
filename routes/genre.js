const express = require('express');
const Joi = require('joi');
const router = express.Router();
const db = require('./genreDb')


router.post('/' , (req, res) => {
    const {error} = verifyGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    db.addGenre(req.body.genre);
    res.send(req.body.genre);
})

router.get('/', async (req, res) => {
   const genres = await db.getAll();
   res.send(genres);
})

router.get('/:id', async (req, res) => {
    const searched = await db.getElement(req.params.id);
    if(!searched) {return res.status(404).send('no genre with this id')}

    res.send(searched);
})

router.put('/:id', async (req, res) => {

    const {error} = verifyGenre(req.body);
   if(error) return res.status(400).send(error.details[0].message)

   const searched = await db.getElement(req.params.id);
   if(!searched) {return res.status(404).send('no genre with this id')}

    const updated = await db.updateEl(req.params.id, req.body.genre);
    res.send(updated);
})

router.delete('/:id', async (req, res) => {
    const searched = await db.getElement(req.params.id);
    if(!searched) {return res.status(404).send('no genre with this id')}

    db.deleteEl(req.params.id).then(() => {
        console.log('item deleted');
        res.send('item deleted');
    })
    .catch((err) => console.log(err))

})

function verifyGenre(body) {
    const schema = {genre: Joi.string().min(3).required()}
    return Joi.validate(body, schema)
}

module.exports = router