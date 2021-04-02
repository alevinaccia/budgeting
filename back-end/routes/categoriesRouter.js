const express = require('express');
const router = express.Router();
const categories = require('../functions/categories.js');


router.get('/get', async (req, res) => {
    await categories.get(req.headers.creatorid).then(opt => res.json(opt));
})

router.delete('/delete', async (req, res) => {
    await categories.remove(req.headers._id).then(count => res.json(count));
})

router.patch('/patch', async (req, res) => {
    await categories.changeColor(req.headers._id, req.headers.color).then(count => {
        if(count == 1)
            res.send({message : "All Good"}).status(200);
        else
            res.send({message : "Err"}).status(400);
    });
})

module.exports = router;