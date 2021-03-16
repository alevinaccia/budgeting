const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const auth = require('./functions/authentication.js');
const transactions = require('./functions/transactions.js');
const transactionsRouter = require('./routes/transactionRoutes.js');
const optionsRouter = require('./routes/optionsRuoter.js');
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

app.use('/transactions', transactionsRouter);

app.use('/options', optionsRouter);

app.listen(3000, () => {
    console.log("Listening...");
    transactions.updateRecursive();
});