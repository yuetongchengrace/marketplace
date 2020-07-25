const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get orders
router.post('/', async (req, res) => {
    const orders = await loadPostsCollection();
    const user= req.body.username;
    res.send(await orders.find({username: user}).toArray());
});

//Add order
// router.post('/', async (req, res) => {
//     //console.log(req.file)
//     const orders = await loadPostsCollection();
//     await orders.insertOne({
//         username: req.body.username,
//         title: req.body.title,
//         //description: req.body.description,
//         price: parseFloat(req.body.price),
//         //picture:req.file.path,
//         createdAt: new Date()
//     })
//     res.status(201).send();
// })

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://wustl_inst:wustl_pass@cluster0.2qhat.mongodb.net/marketplace?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db("marketplace").collection("orders");
}

module.exports = router;