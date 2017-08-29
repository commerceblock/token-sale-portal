
// imports
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import {
  ApolloClient,
  createNetworkInterface,
} from 'apollo-client';

// local imports
import App from './App.vue';
import router from './router';
import endpoints from './lib/endpoints'
import { getAccessToken } from './lib/vault';
import { middleware } from './router/auth'

// check env
if (!process.env.BASE_URL) {
  throw new Error('BASE_URL is not defined');
}

// init endpoints
endpoints.initBaseUrl(process.env.BASE_URL);
Vue.config.productionTip = false;

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    networkInterface: createNetworkInterface({
      uri: endpoints.gql(),
    }).use([{
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {};  // Create the header object if needed.
        }
        // get the authentication token from store if it exists
        const accessToken = getAccessToken();
        req.options.headers.authorization = accessToken ? `Bearer ${accessToken}` : null;
        next();
      }
    }]),
  }),
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  template: '<App/>',
  components: { App },
});
