<template>
<div class = "container">
  <div class="create-post" id="sign-up-container">
      <label for="signup-username">Username: </label>
      <input type="text" id="signup-username" v-model="username" placeholder="username">
      <label for="signup-password">Password: </label>
      <input type="password" id="signup-password" v-model="password">
      <button v-on:click="signup">Sign Up</button>
      <div id="link-to-login">
        <router-link to="Login">Click to login</router-link>
        <router-view />
      </div>
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
        this.$alert('Please type in both username and password');
      } else {
        axios.post('http://localhost:4000/api/users/register', {
          username: this.username,
          password: this.password,
        }).then((res) => {
          console.log(res);
          this.username = '';
          this.password = '';
          window.location.href = 'http://localhost:8080/#/login';
        })
          .catch((err) => {
            console.log(err);
            this.$alert('The username already exist, please use another one');
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
button{
  font-size:20px;
}
#sign-up-container{
  margin-top:150px;
  font-size:30px;
}
#signup-username{
  height:30px;
  width:150px;
  margin-right:10px;

}
#signup-password{
  width:150px;
  height:30px;
  margin-right:30px;
}
#link-to-login{
  margin-top:50px;
}
</style>
