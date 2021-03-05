const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const auth = require('./functions/authentication.js');
const transactions = require('./functions/transactions.js');
require('dotenv').config()

app.use(cors());
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.post('/login', async (req, res) => {
    const user = await auth.login(req.headers.username, req.headers.password);
    try {
        await user.save();
        res.status(200).json({ message: 'succesfull!' })
    } catch (err) {
        res.status(400).send(err);
    }
})

app.post('/add', async (req, res) => {
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
        res.status(200).json({ transaction })
    } catch (err) {
        res.status(400).send(err);
    }
})

app.get('/', async (req, res) => {
    await transactions.get().then(t => res.json(t));
})

app.delete('/', async (req, res) => {
    await transactions.remove(req.headers._id).then(count => res.json(count));
})

app.patch('/', async (req, res) => {
    res.json(await transactions.edit(
        req.headers.id,
        req.headers.newvalue,
        req.headers.newmessage
    ))
})

app.listen(3000, () => {
    console.log("Listening...");
    transactions.updateRecursive();
});