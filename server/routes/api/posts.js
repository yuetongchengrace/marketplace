const express = require('express');
const mongodb = require('mongodb');
const session = require('express-session');
const router = express.Router();

//Get posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    //res.send(req.session);
    res.send(await posts.find({}).toArray());
});

//Get my posts
router.get('/myposts', async (req, res) => {
    const posts = await loadPostsCollection();
    //let user =   use session
    res.send(await posts.find({}).toArray());
});

//Add post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        title: req.body.text,
        createdAt: new Date()
    })
    res.status(201).send();
})

//Delete post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send();
})

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://wustl_inst:wustl_pass@cluster0.2qhat.mongodb.net/marketplace?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db("marketplace").collection("items");
}

module.exports = router;