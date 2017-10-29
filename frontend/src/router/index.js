
// imports
import Vue from 'vue';
import Router from 'vue-router';

// local imports
import Login from '../components/login/Login.vue';
import Home from '../components/home/Home.vue';
import InvoiceSummary from '../components/invoice/InvoiceSummary.vue'
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
    {
      path: '/invoices/:id',
      name: 'InvoiceSummary',
      component: InvoiceSummary,
      props: (route) => ({ invoiceId: route.params.id }),
    },
  ]
});
