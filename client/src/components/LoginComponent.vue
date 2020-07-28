<template>
<div class = "container">
  <div class="create-post" id="login-container">
      <label for="login-username">Username: </label>
      <input type="text" id="login-username" v-model='username' placeholder="username">
      <label for="login-password">Password: </label>
      <input type="password" id="login-password" v-model="password">
      <button v-on:click="login">Login</button>
      <div id="link-to-signup">
        <router-link to="Signup">Click to signup</router-link>
        <br>
        <router-link to="ShowPosts">Visit site</router-link>
        <router-view />
      </div>
  </div>
</div>

</template>

<script>
// import UserService from '../UserService';
import axios from 'axios';
/* eslint-disable */

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
      if (this.username === '' || this.password === '') {
        alert('Username or password is empty');
      } else {
        axios.post('http://localhost:4000/api/users/login', {
          username: this.username,
          password: this.password,
        }).then((res) => {
          console.log(this.username);
          window.localStorage.currentUser = this.username;
          // console.log(localStorage.getItem('currentUser'));
          console.log(res);
          console.log(res.status);
          window.location.href = 'http://localhost:8080/#/';
        })
          .catch((err) => {
            alert('Wrong username or password');
            console.log(err);
          });
      }
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
button{
  font-size:20px;
}
#login-container{
  margin-top:150px;
  font-size:30px;
}
#login-username{
  height:30px;
  width:150px;
  margin-right:10px;

}
#login-password{
  width:150px;
  height:30px;
  margin-right:30px;
}
#link-to-signup{
  margin-top:50px;
}
</style>
