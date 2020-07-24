const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const session = require('express-session');
const router = express.Router();

//Get user
router.post('/login', async (req, res) => {
    const users = await loadPostsCollection();
    //let query = { username: req.body.username };
    let theUser = await users.findOne({username: req.body.username});
    if(theUser != null){
        if(bcrypt.compareSync(req.body.password, theUser.password)){
            req.session.username = req.body.username;
            res.send(req.session);
            //res.redirect(302, 'http://localhost:8080/#/');
        }
        else{
            res.status(404).send();
        }
    }
    else{
        res.status(404).send();
    }
});

//Add user
router.post('/register', async (req, res) => {
    // const userData={
    //     username:req.body.username,
    //     password:req.body.password,
    //     balance:100
    // }
    const users = await loadPostsCollection();
    //const hash=bcrypt.hash(req.body.password,10);
    //userData.password=hash
    await users.insertOne({
        username:req.body.username,
        password:bcrypt.hashSync(req.body.password,10),
        balance:100
    });
    res.status(201).send();
})

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://wustl_inst:wustl_pass@cluster0.2qhat.mongodb.net/marketplace?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db("marketplace").collection("users");
}

module.exports = router;