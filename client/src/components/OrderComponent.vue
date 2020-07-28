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
  <h1>My orders</h1>
  <!--Create Posts here-->
  <hr>
  <p class="error" v-if="error">{{error}}</p>
  <div class="posts-container" id="my-order-container">
    <div class="post"
      v-for="(order, index) in orders"
      v-bind:item="order"
      v-bind:index="index"
      v-bind:key="order._id"
    >
      <!-- {{`${order.createdAt.getDate()}/${order.createdAt.getMonth()}/
      ${order.createdAt.getFullYear()}`}} -->
      <div class="left"><img :src="(/uploads[/].+/).exec(order.picture)[0]"></div>
      <div class="right">
        <div class="item">Item: {{ order.title }}</div>
        <div>Seller: {{ order.seller}} </div>
        <div>Price: {{ order.price }}</div>
        <div>
          <span>Date place: </span>
          <span class="time">{{ getSubstring(order.createdAt) }}</span>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios';
import OrderService from '../OrderService';
/* eslint-disable */

export default {
  name: 'OrderComponent',
  data() {
    return {
      username: '',
      balance: '',
      orders: [],
      error: '',
      text: '',
    };
  },
  methods: {
    getUser() {
      this.username = localStorage.getItem('currentUser');
      console.log(localStorage.getItem('currentUser'));
    },
    getSubstring(string) {
      return string.toString().substring(0, 24);
    },
    view(id) {
      const url = `http://localhost:8080/#/${id}`;
      console.log(url);
      this.$router.push({ name: 'Item', params: { id } });
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
      this.orders = await OrderService.getOrders(obj);
      console.log(this.username);
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
#my-order-container{
  margin-top:30px;
  text-align:left;
  margin-left:auto;
  margin-right:auto;
  height:1000px;
  width:650px;
}
.post{
  width:100%;
  height:250px;
}
.left{
  width:45%;
  float:left;
  height:220px;
}
img{
  width:100%;
  height:200px;
}
.right{
  margin-left:30px;
  width:45%;
  float:left;
  height:220px;
}
.item{
  padding-top:5px;
  font-weight:bold;
  font-size:30px;
}
.time{
  font-size:15px;
}
</style>
