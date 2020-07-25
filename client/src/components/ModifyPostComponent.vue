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
  <div id="sell-new-item">Modify this item</div>
  <div class="create-post" id="add-post">
    <form enctype="multipart/form-data">
      <label for="input-title">Title: </label>
      <input type="text" id="input-title" v-model="title">
      <br>
      <label for="input-description">Description: </label>
      <textarea type="text" id="input-description" v-model="description">
      </textarea>
      <br>
      <label for="input-price">Price: </label>
      <input type="text" id="input-price" v-model="price">
      <br>
      <!-- <label for="uploadedFile">Upload Img: </label>
      <input type="file" ref="myFile" name="uploadedFile" @change.prevent="previewFile"/> -->
      <br><br>
      <button v-on:click.prevent="modifyPost">Modify</button>
    </form>
  </div>
</div>

</template>

<script>
import axios from 'axios';
import PostService from '../PostService';

export default {
  name: 'AddPostComponent',
  data() {
    return {
      post: '',
      balance: '',
      username: '',
      error: '',
      title: '',
      description: '',
      price: null,
      file: null,
    };
  },
  methods: {
    // previewFile(event) {
    //   // console.log(event);
    //   [this.file] = event.target.files;
    //   // this.file = this.$refs.myFile;
    // },

    getUser() {
      this.username = localStorage.getItem('currentUser');
    },
    async modifyPost() {
      try {
        const obj = {
          username: this.username,
          title: this.title,
          description: this.description,
          price: this.price,
          // picture:req.file.path,
          // picture: req.body.picture,
        };
        console.log(obj);
        this.username = null;
        this.title = null;
        this.description = null;
        this.file = null;
        this.price = null;
        await PostService.modifyPost(this.$route.params.id, obj);
        window.location.href = 'http://localhost:8080/#/MyPosts/';
      } catch (err) {
        this.error = err.message;
        console.log(err.message);
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
    this.post = await PostService.getOnePost(this.$route.params.id);
    this.title = this.post.title;
    this.description = this.post.description;
    this.price = this.post.price;
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
#input-description{
  resize:none;
}
#sell-new-item{
  margin-top:30px;
  font-size:30px;
  font-weight:bold;
}
#add-post{
  margin-top:30px;
  border: 1px solid #2c3e50;
  width: 450px;
  margin-left: auto;
  margin-right: auto;
  padding-top:2%;
  padding-bottom:2%;
  padding-left:5%;
  text-align:left;
  font-size:25px;
}
input[type=text]{
    height:30px;
  }
</style>
