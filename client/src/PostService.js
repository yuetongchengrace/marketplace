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

  // Get My Posts
  static getMyPosts() {
    const url1 = 'http://localhost:4000/api/posts/myposts';
    return new Promise((resolve, reject) => {
      axios.get(url1).then((res) => {
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
  static insertPost(text) {
    return axios.post(url, {
      text,
    });
  }

  // Delete Post
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;
