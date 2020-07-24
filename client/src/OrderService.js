import axios from 'axios';

const url = 'http://localhost:4000/api/orders/';
class OrderService {
  // Get Order
  static getOrders() {
    return new Promise((resolve, reject) => {
      axios.get(url).then((res) => {
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
  static insertOrder(text) {
    return axios.post(url, {
      text,
    });
  }
}

export default OrderService;
