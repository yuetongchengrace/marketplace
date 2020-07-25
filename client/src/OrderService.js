import axios from 'axios';

const url = 'http://localhost:4000/api/orders';
class OrderService {
  // Get My Orders
  static getOrders(obj) {
    return new Promise((resolve, reject) => {
      axios.post(url, {
        username: obj.username,
      }).then((res) => {
        console.log(res);
        const { data } = res;
        resolve(
          data.map((order) => ({
            ...order,
            createdAt: new Date(order.createdAt),
          })),
        );
      })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // Create Order
//   static insertOrder(text) {
//     return axios.post(url, {
//       text,
//     });
//   }
}

export default OrderService;
