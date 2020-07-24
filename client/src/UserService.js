import axios from 'axios';

const url = 'http://localhost:4000/api/users/';
class UserService {
  // Get Users
  static getUsers() {
    return new Promise((resolve, reject) => {
      axios.get(`${url}login`).then((res) => {
        const { data } = res;
        resolve(
          data.map((user) => ({
            ...user,
          })),
        );
      })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // Create User
  // text?
  static insertUser(obj) {
    return axios.post(`${url}register`, {
      obj,
    });
  }
}

export default UserService;
