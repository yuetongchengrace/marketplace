<template>
<div class = "container">
    <router-link to="ShowPosts" class="showallpostslink">Show All Posts</router-link>
    <router-link to="AddPost" class="addpostlink">Add Post</router-link>
    <router-link to="MyPosts" class="mypostslink">My Posts</router-link>
    <router-link to="Orders">My Orders</router-link>
    <router-view />
  <h1>My orders</h1>
  <!--Create Posts here-->
  <hr>
  <p class="error" v-if="error">{{error}}</p>
  <div class="posts-container">
    <div class="post"
      v-for="(order, index) in orders"
      v-bind:item="order"
      v-bind:index="index"
      v-bind:key="order._id"
    >
      <!-- {{`${order.createdAt.getDate()}/${order.createdAt.getMonth()}/
      ${order.createdAt.getFullYear()}`}} -->
      <p class="text">{{ order.title }}</p>
    </div>
  </div>
</div>

</template>

<script>
import OrderService from '../OrderService';

export default {
  name: 'OrderComponent',
  data() {
    return {
      orders: [],
      error: '',
      text: '',
    };
  },
  async created() {
    try {
      this.orders = await OrderService.getOrders();
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
</style>
