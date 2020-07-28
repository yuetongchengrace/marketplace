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
  <h1>My Posts</h1>
  <!--Create Posts here-->
  <hr>
  <p class="error" v-if="error">{{error}}</p>
  <div class="posts-container" id="my-post-container">
    <div class="post"
      v-for="(post, index) in posts"
      v-bind:item="post"
      v-bind:index="index"
      v-bind:key="post._id"
    >
      <!--{{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}
      /${post.createdAt.getFullYear()}`}}-->
      <span>{{index+1}}</span>
      <span>: </span>
      <span class="my-post-title">title: {{ post.title }}</span>
      <span class="my-post-price">price: {{ post.price }}</span>
      <b-button size="sm" class="view-button"
      @click="view(post._id)">View</b-button>
      <b-button size="sm"  class="modify-button" v-if="!post.sold"
      @click="modify(post._id)">Modify</b-button>
      <b-button size="sm"  class="modify-button" v-else
      @click="showAlert()">Modify</b-button>
      <!--<button class="modify-button">Modify</button>-->
      <b-button size="sm" class="my-post-delete-button"
      @click="deletePost(post._id)">Delete</b-button>
      <!-- <span class="sold" v-if="!post.sold">Not sold yet</span>-->
      <span class="sold" v-if="post.sold">sold</span>
      <!--<button class="my-post-delete-button" v-on:click="deletePost(post._id)">Delete</button>-->
    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios';
import PostService from '../PostService';
import CartService from '../CartService';

export default {
  name: 'MyPostComponent',
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
    showAlert() {
      this.$alert('You cannot modify a sold item');
    },
    getUser() {
      this.username = localStorage.getItem('currentUser');
      console.log(localStorage.getItem('currentUser'));
    },
    view(id) {
      const url = `http://localhost:8080/#/${id}`;
      console.log(url);
      this.$router.push({ name: 'Item', params: { id } });
    },
    async deletePost(id) {
      console.log(id);
      try {
        await PostService.deletePost(id);
        await CartService.deleteitem(id);
        const obj2 = { username: this.username };
        this.posts = await PostService.getMyPosts(obj2);
      } catch (err) {
        this.error = err.message;
      }
    },
    async modify(id) {
      this.$router.push({ name: 'Modifypost', params: { id } });
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
      this.posts = await PostService.getMyPosts(obj);
      console.log(this.posts);
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
  width:1000px;
  margin-left:auto;
  margin-right:auto;
  text-align:left;
}
.post{
  line-height:50px;
}
.my-post-title{
  width:50%;
  display:inline-block;
}
.view-button{
  float:right;
  margin-top:5px;
  margin-right:20px;
}
.my-post-delete-button{
  float:right;
  margin-right:20px;
  margin-top:5px;
  font-size:15px;
}
.modify-button{
  float:right;
  margin-right:20px;
  margin-top:5px;
  font-size:15px;
}
.sold{
  float:right;
  margin-right:20px;
}
</style>
