const express = require('express');
const router = express.Router();
const options = require('../functions/options.js');


router.get('/get', async (req, res) => {
    await options.get(req.headers.creatorid).then(opt => res.json(opt));
})

router.delete('/delete', async (req, res) => {
    await options.remove(req.headers._id).then(count => res.json(count));
})

module.exports = router;