import Vue from 'vue';
import VueApollo from 'vue-apollo';
import {
  ApolloClient,
  createNetworkInterface,
} from 'apollo-client';
import App from './App.vue';
import router from './router';
import { getAccessToken } from './lib/vault';

// Create the apollo client
if (!process.env.GRAPHQL_ENDPOINT) {
  throw new Error('GRAPHQL_ENDPOINT is not defined');
}

const networkInterface = createNetworkInterface({
  uri: process.env.GRAPHQL_ENDPOINT,
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from store if it exists
    const accessToken = getAccessToken();
    req.options.headers.authorization = token ? `Bearer ${accessToken}` : null;
    next();
  }
}]);

const apolloClient = new ApolloClient({
  networkInterface,
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
