<template>
<div class = "container">
    <router-link to="ShowPosts" class="showallpostslink">Show All Posts</router-link>
    <router-link to="AddPost" class="addpostlink">Add Post</router-link>
    <router-link to="MyPosts" class="mypostslink">My Posts</router-link>
    <router-link to="Orders" class="orderlink">My Orders</router-link>
    <router-link to="Logout" class="logoutlink" v-if="username">Logout</router-link>
    <router-link to="Login" class="logoutlink" v-if="!username">Login</router-link>
    <router-view />
    <span v-if="username">Balance: {{ balance }}</span>
  <h1>{{post.title}}</h1>
  <!--Create Posts here-->
  <hr>
  <p class="error" v-if="error">{{error}}</p >
    <div class="post" id="this-item">
        <div>
          <span>{{ post.username }} : </span>
          <span>{{ post.title }}</span>
        </div>
        <div>Description:
        {{ post.description }}
        </div>
        <div>
          {{ post.picture}}
          <!--<b-img :src="require(path)"></b-img>-->
          <!--< img :src="getImage(post)" alt="picture" id="this-img"/>-->
          <!--< img :src="'../../../' + post.picture">-->
          <!--< img :src="`../../../${post.picture}`">-->
          <!--< img :src="path" alt="picture"/>-->
          <!--img src="../../../uploads/b0.jpg" alt="picture"-->
        </div>
         <!-- {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/
        ${post.createdAt.getFullYear()}`}} -->
        <div>Price:
        {{ post.price }}
        </div>
        <div v-if="post.sold">Sold</div>
        <button v-on:click="sell" v-if="!post.sold">Buy</button>
    </div>
</div>

</template>

<script>
import axios from 'axios';
import PostService from '../PostService';

export default {
  name: 'ItemComponent',
  data() {
    return {
      path: '',
      balance: '',
      username: '',
      post: '',
      error: '',
      text: '',
    };
  },
  methods: {
    getUser() {
      this.username = localStorage.getItem('currentUser');
      console.log(localStorage.getItem('currentUser'));
    },
    getImage(post) {
      console.log(post.picture);
      const url3 = `../../../${post.picture}`;
      console.log(url3);
      return `../../../${post.picture}`;
      // const url2=post.picture
      // return require.context('../../../',true, /^{url2}$/);
    },
    sell() {
      if (this.post.username === this.username) {
        alert('You cannot buy your own product!');
      } else {
        this.$confirm('Are you sure?').then(() => {
          // Update item to sold
          console.log(this.$route.params.id);
          const url = 'http://localhost:4000/api/posts/sell/';
          const { id } = this.$route.params;
          axios.post(`${url}${id}`).then((res) => {
            console.log(res.status);
          }).catch((err) => {
            console.log(err);
          });
          // Add order in order collection
          axios.post('http://localhost:4000/api/orders/addorder', {
            username: this.username,
            title: this.post.title,
            price: this.post.price,
            seller: this.post.username,
          }).then((res) => {
            console.log(res.status);
          }).catch((err) => {
            console.log(err);
          });
          // deduct Balance
          axios.post('http://localhost:4000/api/users/deductBalance', {
            username: this.username,
            price: this.post.price,
          }).then((res) => {
            console.log(res.status);
            this.balance = res.data.balance;
          }).catch((err) => {
            console.log(err);
          });
          // increase Balance
          axios.post('http://localhost:4000/api/users/increaseBalance', {
            username: this.post.username,
            price: this.post.price,
          }).then((res) => {
            console.log(res.status);
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
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
      console.log(this.$route.params.id);
      this.post = await PostService.getOnePost(this.$route.params.id);
      this.path = `../../../${this.post.picture}`;
      console.log(this.post);
      console.log(this.path);
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
