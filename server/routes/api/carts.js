const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get my cart
router.post('/', async (req, res) => {
    const orders = await loadPostsCollection();
    const user= req.body.username;
    res.send(await orders.find({username: user}).toArray());
});

//Add to cart
router.post('/addtocart', async (req, res) => {
    //console.log(req.file)
    const carts = await loadPostsCollection();
    let theItem = await carts.findOne({itemid: req.body.itemid, username: req.body.username});
    if(theItem == null){
        await carts.insertOne({
            itemid: req.body.itemid,
            username: req.body.username,
            title: req.body.title,
            price: parseFloat(req.body.price),
            seller: req.body.seller,
            sold: 0
        })
    }
    else{

    }
    res.status(201).send();
})

//Delete from cart
router.delete('/:id', async (req, res) => {
    const cart = await loadPostsCollection();
    await cart.deleteOne({itemid: String(req.params.id)})
    res.status(200).send();
})

//Buyer delete from cart
router.delete('/delete/:id', async (req, res) => {
    const cart = await loadPostsCollection();
    await cart.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send();
})

//Modify an item in cart
router.post('/:id', async (req, res) => {
    console.log(req.params.id);
    const carts = await loadPostsCollection();
    let theItem = await carts.findOne({itemid: req.params.id});
    let theUser = theItem.username;
    await carts.update({itemid: req.params.id},
      {
        username: theUser,
        seller: req.body.seller,
        itemid: req.body.itemid,
        title: req.body.title,
        price: parseFloat(req.body.price),
        //picture:req.file.path,
        //picture: req.body.picture,
        sold: 0,
      })
    res.status(200).send();
})

//Sold item in cart
router.post('/sell/:id',async (req, res) => {
    console.log(req);
    const posts = await loadPostsCollection();
    await posts.update(
      {itemid: req.params.id},
      {$set: { "sold": 1}}
    )
    res.status(200).send()
  })

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://wustl_inst:wustl_pass@cluster0.2qhat.mongodb.net/marketplace?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db("marketplace").collection("carts");
}

module.exports = router;