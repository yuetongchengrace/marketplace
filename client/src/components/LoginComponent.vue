<template>
<div class = "container">
  <router-link to="Signup">Click to signup</router-link>
  <router-view />
  <div class="create-post">
      <input type="text" id="login-username" v-model="username" placeholder="username">
      <input type="password" id="login-password" v-model="password">
      <button v-on:click="login">Login</button>

  </div>
</div>

</template>

<script>
// import UserService from '../UserService';
import axios from 'axios';

export default {
  name: 'LoginComponent',
  data() {
    return {
      error: '',
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      axios.post('http://localhost:4000/api/users/login', {
        username: this.username,
        password: this.password,
      }).then((res) => {
        window.localStorage.currentUser = JSON.stringify(this.username);
        console.log(res);
        window.location.href = 'http://localhost:8080/#/';
      })
        .catch((err) => {
          console.log(err);
        });
      // try {
      //   const check = UserService.getUsers({
      //     username: this.username,
      //     password: this.password,
      //   });
      //   check.then((res) => {
      //     console.log(res);
      //   })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // } catch (error) {
      //   this.error = error.response.data.error;
      // }
    },
  },
};
// async login() {
//   const data = { username: this.username, password: this.password };
//   await UserService.getUsers(data);
// },

//   async created() {
//     try {
//       this.posts = await PostsService.getPosts();
//     } catch (err) {
//       this.error = err.message;
//     }
//   },

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
