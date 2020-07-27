const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const posts = require('./routes/api/posts');
const carts = require('./routes/api/carts');
const users = require('./routes/api/users');
const orders = require('./routes/api/orders');

app.use('/api/posts', posts);
app.use('/api/carts', carts);
app.use('/api/posts/:id', posts);
app.use('/api/users', users);
app.use('/api/orders', orders);
 
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});