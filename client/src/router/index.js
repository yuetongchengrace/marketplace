import Vue from 'vue';
import Router from 'vue-router';
import PostComponent from '@/components/PostComponent.vue';
import AddPostComponent from '@/components/AddPostComponent.vue';
import OrderComponent from '@/components/OrderComponent.vue';
import LoginComponent from '@/components/LoginComponent.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: PostComponent,
    },
    {
      path: '/showposts',
      name: 'ShowPosts',
      component: PostComponent,
    },
    {
      path: '/addpost',
      name: 'AddPost',
      component: AddPostComponent,
    },
    {
      path: '/orders',
      name: 'Orders',
      component: OrderComponent,

    },
    {
      path: '/login',
      name: 'Login',
      component: LoginComponent,
    },
  ],
});
