import Vue from 'vue';
import Router from 'vue-router';
import PostComponent from '@/components/PostComponent.vue';
import AddPostComponent from '@/components/AddPostComponent.vue';
import OrderComponent from '@/components/OrderComponent.vue';
import LoginComponent from '@/components/LoginComponent.vue';
import SignupComponent from '@/components/SignupComponent.vue';
import MyPostComponent from '@/components/MyPostComponent.vue';

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
      path: '/myposts',
      name: 'MyPosts',
      component: MyPostComponent,
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
    {
      path: '/signup',
      name: 'Signup',
      component: SignupComponent,
    },
  ],
});
