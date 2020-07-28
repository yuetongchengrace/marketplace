<template>
<div class = "container">
    <router-link to="ShowPosts" class="showallpostslink">Show All Posts</router-link>
    <router-link to="AddPost" class="addpostlink">Add Post</router-link>
    <router-link to="MyPosts" class="mypostslink">My Posts</router-link>
    <router-link to="Orders" class="orderlink">My Orders</router-link>
    <router-link to="MyCart" class="mycartlink" v-if="username">My Cart</router-link>
    <router-link to="Logout" class="logoutlink" v-if="username">Logout</router-link>
    <router-link to="Login" class="logoutlink" v-if="!username">Login</router-link>
    <router-view />
    <span v-if="username" class="user">User: {{ username }}</span>
    <span v-if="username">Balance: {{ balance }}</span>
  <div id="sell-new-item">Sell New Item</div>
  <div class="create-post" id="add-post">
    <form enctype="multipart/form-data">
      <label for="input-title">Title: </label>
      <input type="text" id="input-title" v-model="title" placeholder="item name">
      <br>
      <label for="input-description">Description: </label>
      <textarea type="text" id="input-description" v-model="description" placeholder
      ="description">
      </textarea>
      <br>
      <label for="input-price">Price: </label>
      <input type="text" id="input-price" v-model="price" placeholder="price">
      <br>
      <label for="uploadedFile">Upload Img: </label>
      <input type="file" ref="myFile" name="uploadedFile" @change.prevent="previewFile"/>
      <br><br>
      <button v-on:click.prevent="createPost">Post</button>
    </form>
  </div>
</div>

</template>

<script>
import axios from 'axios';
/* eslint-disable */
// import PostService from '../PostService';

export default {
  name: 'AddPostComponent',
  data() {
    return {
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
    previewFile(event) {
      // console.log(event);
      [this.file] = event.target.files;
      // this.file = this.$refs.myFile;
    },

    getUser() {
      this.username = localStorage.getItem('currentUser');
      console.log(localStorage.getItem('currentUser'));
    },

    async createPost() {
      if (this.username == null || this.title == null
      || this.description == null || this.file == null) {
        if (this.username == null) {
          this.$alert('You need to login first!');
        } else {
          this.$alert('Please input all necessary informations!');
        }
      } else {
        try {
          // this.username = localStorage.getItem('currentUser');
          // const newitem = {
          //   username: this.currentUser,
          //   title: this.title,
          //   description: this.description,
          //   price: this.price,
          //   picture: this.file,
          // };
          const fd = new FormData();
          console.log(fd);
          fd.append('productImage', this.file, this.file.name);
          fd.append('title', this.title);
          fd.append('description', this.description);
          fd.append('username', this.username);
          fd.append('price', this.price);
          // console.log(newitem);
          // console.log(fd.get('productImage'));
          await axios({
            method: 'POST',
            url: 'http://localhost:4000/api/posts/',
            data: fd,
            header: {
              'Content-Type': 'multipart/form-data',
            },
          });
          // await PostService.insertPost(fd);
          // await PostService.insertPost(newitem);
          this.$alert('Post added!');
          this.title = null;
          this.description = null;
          this.file = null;
          this.$refs.myFile.value = null;
          this.price = null;
        } catch (err) {
          this.error = err.message;
          console.log(err.message);
        }
      }
      // await PostService.insertPost(this.text);
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
  padding-left:6%;
  text-align:left;
  font-size:25px;
}
input[type=text]{
    height:30px;
  }
</style>
