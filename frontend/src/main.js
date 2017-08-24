import Vue from 'vue';
import VueApollo from 'vue-apollo';
import {
  ApolloClient,
  createNetworkInterface,
} from 'apollo-client';
import App from './App.vue';
import router from './router';

// Create the apollo client
if (!process.env.GRAPHQL_ENDPOINT) {
  throw new Error('GRAPHQL_ENDPOINT is not defined');
}
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: process.env.GRAPHQL_ENDPOINT,
  }),
});

Vue.use(VueApollo);

Vue.config.productionTip = false;

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  template: '<App/>',
  components: { App },
});
