<template>
<div class = "container">
    <router-link to="ShowPosts" class="showallpostslink">Show All Posts</router-link>
    <router-link to="AddPost" class="addpostlink">Add Post</router-link>
    <router-link to="MyPosts" class="mypostslink">My Posts</router-link>
    <router-link to="Orders" class="orderlink">My Orders</router-link>
    <router-link to="Logout" v-if="username">Logout</router-link>
    <router-link to="Login" v-if="!username">Login</router-link>
    <router-view />
    <span v-if="username">Balance: {{ balance }}</span>
  <h1>All Items</h1>
  <hr>
  <p class="error" v-if="error">{{error}}</p >
  <b-container>
    <b-row >
      <b-col class="post" md="3"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
      >
        <b-card class="mb-5"
        img-src="http://classes.engineering.wustl.edu/cse330/content/brookings.jpg"
        v-bind:title="post.title">
          <b-card-text v-if="post.sold===1">sold</b-card-text>
          <b-button size="sm" v-else variant="dark" @click="navigate(post._id)">See more</b-button>
          <b-card-text>Price:{{ post.price }}</b-card-text>
        </b-card>
        <!-- {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/
        ${post.createdAt.getFullYear()}`}} -->

      </b-col>
    </b-row>
  </b-container>
</div>

</template>

<script>
import axios from 'axios';
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      balance: '',
      username: '',
      posts: [],
      error: '',
      text: '',
    };
  },
  methods: {
    getUser() {
      this.username = localStorage.getItem('currentUser');
      console.log(localStorage.getItem('currentUser'));
    },
    navigate(id) {
      // console.log(window.location.pathname);
      window.location.href = `http://localhost:8080/#/${id}`;
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
      console.log('hi');
      this.posts = await PostService.getPosts();
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