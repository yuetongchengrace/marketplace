import axios from 'axios';

const url = 'http://localhost:4000/api/posts/';
class PostService {
  // Get Posts
  static getPosts() {
    return new Promise((resolve, reject) => {
      axios.get(url).then((res) => {
        const { data } = res;
        resolve(
          data.map((post) => ({
            ...post,
            createdAt: new Date(post.createdAt),
          })),
        );
      })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // Get One Post
  static getOnePost(id) {
    const url2 = `${url}${id}`;
    return new Promise((resolve, reject) => {
      axios.get(url2).then((response) => {
        const { data } = response;
        resolve(
          data,
        );
      })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // Get My Posts
  static getMyPosts(obj) {
    console.log(obj);
    const url1 = 'http://localhost:4000/api/posts/myposts';
    return new Promise((resolve, reject) => {
      axios.post(url1, {
        username: obj.username,
      }).then((res) => {
        const { data } = res;
        resolve(
          data.map((post) => ({
            ...post,
            createdAt: new Date(post.createdAt),
          })),
        );
      })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // Create Post
  static insertPost(data) {
    console.log(data);
    // const fd = data;
    // console.log(fd);
    // const fd=new FormData();
    // fd.append('productImage', data.picture);
    // fd.append('title', data.title);
    // fd.append('description', data.description);
    // fd.append('username', data.username);
    // fd.append('price', data.price);
    const config = {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return axios.post(url, {
      data, config,
      // title: data.title,
      // description: data.description,
      // username: data.username,
      // price: data.price,
      // picture: data.picture,
    });
  }

  // Delete Post
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }

  // Modify Post
  static modifyPost(id, obj) {
    return axios.post(`${url}${id}`, {
      username: obj.username,
      title: obj.title,
      description: obj.description,
      price: obj.price,
      // picture:req.file.path,
      // picture: req.body.picture,
    });
  }
}

export default PostService;
