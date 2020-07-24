<template>
<div class = "container">
 <router-link to="Login">Click to login</router-link>
<router-view />
  <div class="create-post">
      <input type="text" id="signup-username" v-model="username" placeholder="username">
      <input type="password" id="signup-password" v-model="password">
      <button v-on:click="signup">Sign Up</button>
  </div>
</div>

</template>

<script>
// import UserService from '../UserService';
import axios from 'axios';

export default {
  name: 'SignupComponent',
  data() {
    return {
      error: '',
      username: '',
      password: '',
    };
  },
  methods: {
    signup() {
      if (this.username === '' || this.password === '') {
        alert('Please type in both username and password');
      } else {
        axios.post('http://localhost:4000/api/users/register', {
          username: this.username,
          password: this.password,
        }).then((res) => {
          console.log(res);
          window.location.href = 'http://localhost:8080/#/login';
        })
          .catch((err) => {
            console.log(err);
          });
      }
    },
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
