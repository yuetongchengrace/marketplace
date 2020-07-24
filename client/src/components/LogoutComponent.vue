<template>
<div class = "container">
  <div class="create-post">
    <p>You have successfully logged out</p>
    <router-link to="Login">Click to login</router-link>
    <router-view />
  </div>
</div>
</template>

<script>
// import UserService from '../UserService';
// import axios from 'axios';

export default {
  name: 'LogoutComponent',
  data() {
    return {
      error: '',
      username: '',
      password: '',
    };
  },
  methods: {
    // logout() {
    //   console.log(localStorage.getItem('currentUser'));
    //   window.localStorage.clear();
    //   console.log(localStorage.getItem('currentUser'));
    // },
  },
  created() {
    console.log(localStorage.getItem('currentUser'));
    window.localStorage.clear();
    console.log(localStorage.getItem('currentUser'));
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
