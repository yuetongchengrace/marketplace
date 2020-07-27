const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './client/public/uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 20
    },
    fileFilter: fileFilter
  });
//const binary = mongodb.binary;

//Get posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    //res.send(req.session);
    res.send(await posts.find({}).toArray());
});

//Get one post
router.get('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    const thePost = await posts.findOne({_id: new mongodb.ObjectID(req.params.id)});
    res.send(thePost);
});

//Get my posts
router.post('/myposts', async (req, res) => {
    const posts = await loadPostsCollection();
    const user= req.body.username;
    //console.log(user);
    res.send(await posts.find({username: user}).toArray());
});

//Add post
router.post('/', upload.single('productImage'),async (req, res) => {
    //console.log(req.file)
    const posts = await loadPostsCollection();
    await posts.insertOne({
        username: req.body.username,
        title: req.body.title,
        description: req.body.description,
        price: parseFloat(req.body.price),
        picture:req.file.path,
        //picture: req.body.picture,
        sold: 0,
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

//Modify post
router.post('/:id', async (req, res) => {
  console.log(req.params.id);
  const posts = await loadPostsCollection();
  await posts.update({_id: new mongodb.ObjectID(req.params.id)},
    {username: req.body.username,
    title: req.body.title,
    description: req.body.description,
    price: parseFloat(req.body.price),
    //picture:req.file.path,
    //picture: req.body.picture,
    sold: 0,
    createdAt: new Date()
    })
  res.status(200).send(posts.findOne({_id: new mongodb.ObjectID(req.params.id)}));
})

//Sold item
router.post('/sell/:id',async (req, res) => {
  console.log(req);
  const posts = await loadPostsCollection();
  await posts.update(
    {_id: new mongodb.ObjectID(req.params.id)},
    {$set: { "sold": 1}}
  )
  res.status(200).send()
})

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://wustl_inst:wustl_pass@cluster0.2qhat.mongodb.net/marketplace?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db("marketplace").collection("items");
}

module.exports = router;