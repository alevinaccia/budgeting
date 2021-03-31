const express = require('express');
const router = express.Router();
const transactions = require('../functions/transactions.js');
const categories = require('../functions/categories.js');


router.post('/add', async (req, res) => {
    let toadd = JSON.parse(req.headers.transaction);
    let cat;
    const transaction = transactions.create(toadd);
    try {
        await transaction.save();
        if (toadd.category != null) 
            cat = await categories.handle(toadd.category, '1234', toadd.budgetValue); //TODO '1234' is the creatorId, for now is hardcoded! 
        console.log(cat);
        res.status(200).json({ transaction, cat })
    } catch (err) {
        res.status(400).send(err);
    }
})

router.get('/get', async (req, res) => {
    await transactions.get().then(t => res.json(t));
})

router.delete('/delete', async (req, res) => {
    await transactions.remove(req.headers._id).then(count => res.json(count));
})

router.patch('/patch', async (req, res) => {
    res.json(await transactions.edit(
        req.headers.id,
        req.headers.newvalue,
        req.headers.newmessage
    ))
})

module.exports = router;
