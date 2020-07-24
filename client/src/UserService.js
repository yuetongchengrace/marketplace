import axios from 'axios';

const url = 'http://localhost:4000/api/users/';
class UserService {
  // Login
  // static getUsers(data) {
  //   return new Promise((resolve, reject) => {
  //     axios.post(`${url}login`, {
  //       username: data.username,
  //       password: data.password,
  //     }).then((res) => {
  //       console.log(res);
  //     })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // }

  // Create User
  // text?
  static insertUser(obj) {
    return axios.post(`${url}register`, {
      obj,
    });
  }
}

export default UserService;
