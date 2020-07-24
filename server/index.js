const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

const posts = require('./routes/api/posts');
const users = require('./routes/api/users');
const orders = require('./routes/api/orders');

app.use('/api/posts', posts);
app.use('/api/posts/myposts', posts);
app.use('/api/users', users);
app.use('/api/orders', orders);
 
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});