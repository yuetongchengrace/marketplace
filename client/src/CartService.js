import axios from 'axios';

const url = 'http://localhost:4000/api/carts/';

class CartService {
  // Get My Cart
  static getMyCart(obj) {
    console.log(obj);
    return new Promise((resolve, reject) => {
      axios.post(url, {
        username: obj.username,
      }).then((res) => {
        const { data } = res;
        resolve(
          data.map((cart) => ({
            ...cart,
          })),
        ).then((response) => response.json());
      })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static deleteitem(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default CartService;
