const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const session = require('express-session');
const router = express.Router();
const app=express();
// app.use(session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true
// }));
router.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
//let current_user='visitor';
//Get user
router.post('/login',async (req, res) => {
    const users = await loadPostsCollection();
    //let query = { username: req.body.username };
    let theUser = await users.findOne({username: req.body.username});
    if(theUser != null){
        if(bcrypt.compareSync(req.body.password, theUser.password)){
            req.session.username = req.body.username;
            res.status(200).send(theUser);
            //res.status(200).send(req.session);
            current_user=req.body.username;
            // res.status(200).send(theUser.toJSON())
            //res.redirect(302, 'http://localhost:8080/#/');
        }
        else{
            //res.status(404).send();
            res.status(404).send({
                error:'Password does not match'
            });
        }
    }
    else{
        //res.status(404).send();
        res.status(404).send({
            error:'User does not exist'
        });
    }
});
//get user balance
router.post('/balance' ,async (req,res)=>{
    //username= req.body.username;
    const users = await loadPostsCollection();
    let user = await users.findOne({username: req.body.username});
    console.log(user.balance);
    res.send({'balance': user.balance});
})
//getcurrentuser
router.get('/currentUser' ,async (req,res)=>{
    res.send({'username': req.session});
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