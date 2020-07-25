<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!--<router-link to="ShowPosts" id="showallpostslink">Show All Posts</router-link>
    <router-link to="AddPost" id="addpostlink">Add Post</router-link>
    <router-link to="Orders">My Orders</router-link>
    <router-view />-->
    <router-view />
  </div>
</template>

<script>
// import PostComponent from './components/PostComponent.vue';

export default {
  name: 'App',
  // components: {
  //   PostComponent,
  // },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top:20px;
  font-size:20px;
}
.addpostlink, .showallpostslink, .mypostslink, .orderlink, .logoutlink{
  margin-right:10px;
}
</style>
