<template>
<div class = "container">
    <router-link to="ShowPosts" class="showallpostslink">Show All Posts</router-link>
    <router-link to="AddPost" class="addpostlink">Add Post</router-link>
    <router-link to="MyPosts" class="mypostslink">My Posts</router-link>
    <router-link to="Orders" class="orderlink">My Orders</router-link>
    <router-link to="Logout">Logout</router-link>
    <router-view />
  <div class="create-post">
      <label for="create-post">Sell Something...</label>
      <input type="text" id="create-post" v-model="text" placeholder="Sell an item">
      <button v-on:click="createPost">Post</button>
  </div>
</div>

</template>

<script>
import PostService from '../PostService';

export default {
  name: 'AddPostComponent',
  data() {
    return {
      error: '',
      text: '',
    };
  },
  methods: {
    async createPost() {
      try {
        await PostService.insertPost(this.text);
        console.log('added!');
      } catch (err) {
        this.error = err.message;
        console.log(err.message);
      }
      // await PostService.insertPost(this.text);
    },
  },
//   async created() {
//     try {
//       this.posts = await PostsService.getPosts();
//     } catch (err) {
//       this.error = err.message;
//     }
//   },
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
