
// imports
import Vue from 'vue';
import Router from 'vue-router';

// local imports
import Home from '../components/home/Home.vue';
import Login from '../components/login/Login.vue';
import { requireAuth } from './auth';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      component: Home,
      beforeEnter: requireAuth,
    },
  ]
});
