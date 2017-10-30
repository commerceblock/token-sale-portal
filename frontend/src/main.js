
// imports
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import VueClipboard from 'vue-clipboard2';
import {
  ApolloClient,
  createNetworkInterface,
} from 'apollo-client';

// local imports
import App from './App.vue';
import router from './router';
import { gql, invoicesGQL, initBaseUrl } from './lib/endpoints';
import { getAccessToken } from './lib/vault';
import { middleware } from './router/auth';

// check env
if (!process.env.BASE_URL) {
  throw new Error('BASE_URL is not defined');
}

// init endpoints
initBaseUrl(process.env.BASE_URL);
Vue.config.productionTip = false;

Vue.use(VueClipboard);
Vue.use(VueApollo);

// portal gql
const portalNetworkInterface = createNetworkInterface({ uri: gql() })
  .use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        // Create the header object if needed.
        req.options.headers = {};
      }
      // get the authentication token from store if it exists
      const accessToken = getAccessToken();
      req.options.headers.authorization = accessToken ? `Bearer ${accessToken}` : null;
      next();
    } }]);

const portalApolloClient = new ApolloClient({
  networkInterface: portalNetworkInterface
});

// invoices gql
const invoicesApolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: invoicesGQL(),
  }),
});

const apolloProvider = new VueApollo({
  clients: {
    portal: portalApolloClient,
    invoices: invoicesApolloClient,
  },
  defaultClient: portalApolloClient,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  template: '<App/>',
  components: { App },
});
// end
