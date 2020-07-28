<template>
<div class = "container">
    <router-link to="ShowPosts" class="showallpostslink">Show All Posts</router-link>
    <router-link to="AddPost" class="addpostlink">Add Post</router-link>
    <router-link to="MyPosts" class="mypostslink">My Posts</router-link>
    <router-link to="Orders" class="orderlink">My Orders</router-link>
    <router-link to="MyCart" class="mycartlink" v-if="username">My Cart</router-link>
    <router-link to="Logout" class="logoutlink" v-if="username">Logout</router-link>
    <router-link to="Login" class="logoutlink" v-if="!username">Login</router-link>
    <router-view />
    <span v-if="username" class="user">User: {{ username }}</span>
    <span v-if="username">Balance: {{ balance }}</span>
  <h1>My Cart</h1>
  <!--Create Posts here-->
  <hr>
  <p class="error" v-if="error">{{error}}</p>
  <div class="posts-container" id="my-post-container">
    <div class="post"
      v-for="(item, index) in cart"
      v-bind:item="item"
      v-bind:index="index"
      v-bind:key="item._id"
    >
      <span>{{index+1}}</span>
      <span>: </span>
      <span class="title">Item: {{ item.title }}</span>
      <span class="price">Price: {{ item.price }}</span>
      <!-- <span class="my-post-description">description: {{ item.description }}</span> -->
      <b-button size="sm" class="my-post-delete-button"
      @click="deleteitem(item._id)">Delete</b-button>
      <b-button size="sm" class="view-button"
      @click="view(item.itemid)">View</b-button>
      <span class="sold" v-if="item.sold">sold</span>
      <b-button size="sm" class="my-post-delete-button"
      @click="navigate(item.itemid)" v-if="!item.sold">Buy</b-button>
    </div>
  </div>
  <b-button size="lg" @click="buyall()">Buy All</b-button>
</div>

</template>

<script>
import axios from 'axios';
import CartService from '../CartService';

export default {
  name: 'MyCartComponent',
  data() {
    return {
      balance: '',
      username: '',
      cart: [],
      error: '',
      text: '',
      cartArr: [],
    };
  },
  methods: {
    view(id) {
      this.$router.push({ name: 'Item', params: { id } });
    },
    async buyall() {
      let checkSold = 0;
      let money = 0;
      this.cartArr.forEach((item) => {
        if (item.sold === 1) {
          checkSold = 1;
        } else {
          money += item.price;
        }
      });
      if (checkSold === 1) {
        this.$alert('Please clear out the sold items first');
      } else if (this.balance < money) {
        this.$alert('You do not have enough balance');
      } else {
        this.$confirm('Are you sure?').then(() => {
          this.cartArr.forEach((item) => {
            console.log(item);
            // Update item to sold
            const url = 'http://localhost:4000/api/posts/sell/';
            const id = item.itemid;
            axios.post(`${url}${id}`).then((res) => {
              console.log(res.status);
            }).catch((err) => {
              console.log(err);
            });
            // Update my cart sold (0->1)
            const carturl2 = 'http://localhost:4000/api/carts/sell/';
            axios.post(`${carturl2}${id}`, {
            }).then((res) => {
              console.log(res.status);
            }).catch((err) => {
              console.log(err);
            });
            // Delete from my cart
            /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
            const id1 = item._id;
            const carturl = 'http://localhost:4000/api/carts/delete/';
            axios.delete(`${carturl}${id1}`, {
            }).then((res) => {
              console.log(res.status);
            }).catch((err) => {
              console.log(err);
            });
            // Add order in order collection
            axios.post('http://localhost:4000/api/orders/addorder', {
              username: this.username,
              title: item.title,
              price: item.price,
              seller: item.seller,
              picture: item.picture,
              itemid: item.itemid,
            }).then((res) => {
              console.log(res.status);
            }).catch((err) => {
              console.log(err);
            });
            // deduct Balance for buyer
            axios.post('http://localhost:4000/api/users/deductBalance', {
              username: this.username,
              price: item.price,
            }).then((res) => {
              console.log(res.status);
              this.balance = res.data.balance;
            }).catch((err) => {
              console.log(err);
            });
            // increase Balance for seller
            axios.post('http://localhost:4000/api/users/increaseBalance', {
              username: item.seller,
              price: item.price,
            }).then((res) => {
              console.log(res.status);
            }).catch((err) => {
              console.log(err);
            });
          });
          this.$alert('Payment Successful!');
          // const obj2 = { username: this.username };
          // this.cart = await CartService.getMyCart(obj2);
          // this.cartArr = await CartService.getMyCart(obj2);
          window.location.href = 'http://localhost:8080/#/Orders';
        }).catch((err) => {
          console.log(err);
        });
        // const obj2 = { username: this.username };
        // this.cart = await CartService.getMyCart(obj2);
        // this.cartArr = await CartService.getMyCart(obj2);
      }
    },
    navigate(id) {
      // console.log(window.location.pathname);
      window.location.href = `http://localhost:8080/#/${id}`;
    },
    getUser() {
      this.username = localStorage.getItem('currentUser');
      console.log(localStorage.getItem('currentUser'));
    },
    async deleteitem(id) {
      console.log(id);
      try {
        // Delete from my cart
        const carturl = 'http://localhost:4000/api/carts/delete/';
        axios.delete(`${carturl}${id}`, {
        }).then((res) => {
          console.log(res.status);
        }).catch((err) => {
          console.log(err);
        });
        console.log('here');
        const obj2 = { username: this.username };
        this.cart = CartService.getMyCart(obj2);
        this.cartArr = CartService.getMyCart(obj2);
      } catch (err) {
        this.error = err.message;
      }
    },
  },
  async created() {
    this.getUser();
    axios.post('http://localhost:4000/api/users/balance', {
      username: this.username,
    }).then((res) => {
      this.balance = res.data.balance;
    })
      .catch((err) => {
        console.log(err);
      });
    try {
      const obj = { username: this.username };
      this.cart = await CartService.getMyCart(obj);
      this.cartArr = await CartService.getMyCart(obj);
      console.log(this.cart);
      console.log(obj);
    } catch (err) {
      this.error = err.message;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#my-post-container{
  width:900px;
  margin-left:auto;
  margin-right:auto;
  text-align:left;
}
.post{
  line-height:50px;
}
.my-post-description{
  margin-left:50px;
  margin-right:70px;
}
.price{
  margin-left:40px;
}
.sold{
  float:right;
  margin-right:40px;
  color:red;
  font-size:25px;
}
.view-button{
  float:right;
  margin-right:20px;
  margin-top:10px;
  font-size:15px;
}
.my-post-delete-button{
  float:right;
  margin-right:20px;
  margin-top:10px;
  font-size:15px;
}
</style>
