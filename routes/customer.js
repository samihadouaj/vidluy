const express = require('express');
const router = express.Router();
const db = require('./customerDb')

router.get('/', async (req, res) => {
    const customers = await db.getCusomers();
    res.send(customers)
})


router.get('/:id', async (req, res) => {
    const customer = await db.getCusomer(req.params.id);
    res.send(customer)
})

router.post('/', async (req, res) => {
    const customer = await db.addCustomer(req.body);
    res.send(customer);
})

router.put('/:id', async (req, res) => {
    const customer = await db.updateCustomer(req.params.id , req.body);
    if (!customer) {
        console.log("laaaa")
        return res.status(404).send('not found')}
    res.send(customer);
})

router.delete('/:id', async (req, res) => {
    const customer = await db.deleteCustomer(req.params.id);
    if (!customer) {
        console.log("laaaa")
        return res.status(404).send('not found')}
    res.send(customer);
})

module.exports = router