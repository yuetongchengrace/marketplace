const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get posts
router.get('/', async (req, res) => {
    const orders = await loadPostsCollection();
    res.send(await orders.find({}).toArray());
});

//Add post
router.post('/', async (req, res) => {
    const orders = await loadPostsCollection();
    await orders.insertOne({
        title: req.body.title,
        createdAt: new Date()
    })
    res.status(201).send();
})

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://wustl_inst:wustl_pass@cluster0.2qhat.mongodb.net/marketplace?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db("marketplace").collection("orders");
}

module.exports = router;