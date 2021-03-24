const express = require('express');
const router = express.Router();
const transactions = require('../functions/transactions.js');
const categories = require('../functions/categories.js');


router.post('/add', async (req, res) => {
    let cat;
    const transaction = transactions.create(
        req.headers.value,
        req.headers.category,
        req.headers.ammounttosave,
        req.headers.type,
        req.headers.text,
        req.headers.recursiveperiod
    );
    try {
        await transaction.save();
        if (req.headers.category != '') 
            cat = await categories.create(req.headers.category, '1234'); //TODO '1234' is the creatorId, for now is hardcoded! 
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
