const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get my orders
router.post('/', async (req, res) => {
    const orders = await loadPostsCollection();
    const user= req.body.username;
    res.send(await orders.find({username: user}).toArray());
});

//Add order
router.post('/addorder', async (req, res) => {
    //console.log(req.file)
    const orders = await loadPostsCollection();
    await orders.insertOne({
        username: req.body.username,
        seller: req.body.seller,
        title: req.body.title,
        price: parseFloat(req.body.price),
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