
// imports
import Vue from 'vue';
import Router from 'vue-router';

// local imports
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
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
