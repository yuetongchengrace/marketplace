<template>
<div class = "container">
    <router-link to="ShowPosts" class="showallpostslink">Show All Posts</router-link>
    <router-link to="AddPost" class="addpostlink">Add Post</router-link>
    <router-link to="MyPosts" class="mypostslink">My Posts</router-link>
    <router-link to="Orders" class="orderlink">My Orders</router-link>
    <router-link to="Logout" class="logoutlink" v-if="username">Logout</router-link>
    <router-link to="Login" class="logoutlink" v-if="!username">Login</router-link>
    <router-view />
  <h1>{{post.title}}</h1>
  <!--Create Posts here-->
  <hr>
  <p class="error" v-if="error">{{error}}</p>
    <div class="post">
        <!-- {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/
        ${post.createdAt.getFullYear()}`}} -->
        <p class="text">{{ post.description }}</p>
    </div>
</div>

</template>

<script>
import PostService from '../PostService';

export default {
  name: 'ItemComponent',
  data() {
    return {
      post: null,
      error: '',
      text: '',
    };
  },
  async created() {
    try {
      console.log(this.$route.params.id);
      this.post = await PostService.getOnePost(this.$route.params.id);
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
