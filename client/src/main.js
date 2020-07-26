import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import VueSimpleAlert from 'vue-simple-alert';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueSimpleAlert);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
