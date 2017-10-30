<template>
<transition name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            <span class="tab-title">Welcome to CommerceBlock Token Portal</span>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">
            <div v-if=errorResponse class="alert alert-danger" role="alert">
              <p>{{errorResponse}}</p>
            </div>
            <div class="row">
              <div class="login-description text-center">
                Please enter in your whitelisted address
              </div>
            </div>
            <div class="row">
              <div v-bind:class="{ 'invite-code-input-red': !isValid, 'invite-code-input-green': isValid }">
                <input class="form-control span6" placeholder="Enter your address (BTC or ETH)" v-model="address" />
              </div>
            </div>
          </slot>
        </div>

        <div class="checkbox">
          <label><input type="checkbox" v-model="checked">I certify that I am not a citizen or resident of the United States of America, The Republic of Singapore or The People's Republic of China.</label>
        </div>

        <div class="checkbox">
          <label><input type="checkbox" v-model="kycChecked">I confirm that KYC documentation must be submitted for contributions of more than 11.5k USD and failure to submit may result in a refund.</label>
        </div>

        <div class="checkbox">
          <label><input type="checkbox" v-model="termsAccepted">I have read and accept [token sale terms agreement].</label>
        </div>

        <div class="checkbox">
          <label><input type="checkbox" v-model="ownAddress">I confirm this is my sending address and refund address.</label>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="btn btn-success btn-lg btn-block" @click="login" :disabled="isFormNotValid">Submit Address</button>
          </slot>
        </div>

      </div>
    </div>
    <div class="bottom-logo">
      <img src="/static/assets/commcerblock-big-gray.png" />
    </div>
  </div>
</transition>
</template>

<script>
import 'whatwg-fetch';
import gql from 'graphql-tag';
import httpStatus from 'http-status-codes';
import {
  isEmpty
} from 'lodash';
import endpoints from '../../lib/endpoints'
import {
  setAccessToken
} from '../../lib/vault'

const access_token_ttl = 30 * 60 * 1000;

export default {
  name: 'Login',
  data: function() {
    return {
      address: null,
      errorResponse: null,
      kycChecked: null,
      checked: null,
      termsAccepted: null,
      ownAddress: null
    }
  },
  methods: {
    login() {
      // TODO:: toggle progress bar
      if (isEmpty(this.address)) {
        // empty phrase
        this.errorResponse = 'Address is empty.';
      } else if (!this.isValid) {
        // check phrase
        this.errorResponse = 'Address is not valid, must be at least 10 chars.';
      } else {
        this.errorResponse = null;
        const that = this;
        this.doLogin()
          .then(this.parseResult)
          .catch(this.handleServerError)
          .then(this.handleLoginResult)
          .then(this.redirectToHome)
          .catch(this.handleGenericError)
      }
    },
    redirectToHome(result) {
      this.$router.push('/');
    },
    handleLoginResult(data) {
      if (data && data.access_token_id) {
        const accessToken = data && data.access_token_id;
        setAccessToken(accessToken, access_token_ttl);
        return data;
      } else {
        this.errorResponse = "Unexpected error occured, please try again.";
      }
    },
    handleGenericError(error) {
      console.log(error);
      this.errorResponse = "Unexpected error occured, please try again.";
    },
    handleServerError(error) {
      console.log(error);
      this.errorResponse = "Failed to connect to server, please try again.";
    },
    parseResult(response) {
      if (response.status === httpStatus.CREATED) {
        return response.json();
      } else if (response.status == httpStatus.NOT_FOUND) {
        this.errorResponse = "Unknown address.";
        return null;
      } else {
        this.errorResponse = "Unexpected error occured, please try again.";
        return null;
      }
    },
    doLogin() {
      const data = {
        address: this.address
      };
      return fetch(endpoints.login(), {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
      });
    },
  },
  computed: {
    isValid() {
      return !isEmpty(this.address) && this.address.length >= 10;
    },
    isFormNotValid() {
      return !(this.isValid && this.checked && this.kycChecked && this.termsAccepted && this.ownAddress)
    },
    apolloClient: function() {
      return this.$apollo.provider.defaultClient;
    }
  },
}
</script>

<style scoped>
.modal-mask {
  /*position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  display: table;
  transition: opacity .3s ease;*/
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.modal-wrapper {
  /*display: table-cell;
  vertical-align: middle;*/
}

.modal-container {
  max-width: 650px;
  /*min-height: 600px;*/
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  margin-top: 30px;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-header {
  text-align: center;
}

.modal-footer {
  padding: 0 !important;
  margin-top: 30px;
  border: none;
}


/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
  display: block !important;
}

.input-group input {
  height: 4em;
}

textarea {
  resize: none;
}

.invite-code-input-red input:focus {
  border-color: red;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(126, 239, 104, 0.6);
  outline: 0 none;
}

.invite-code-input-green input:focus {
  border-color: #258C42;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(126, 239, 104, 0.6);
  outline: 0 none;
}

.tab-title {
  color: #141414;
  font-family: "Open Sans";
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
}

.login-description {
  color: #141414;
  font-family: "Open Sans";
  font-size: 14px;
  line-height: 19px;
  margin: 5px 0 30px 0;
}

.seed-description {
  color: #141414;
  font-family: "Open Sans";
  font-size: 14px;
  line-height: 19px;
  margin: -20px 0 15px 0;
}

.generate-new {
  margin-top: 10px;
}

.generate-new a {
  color: #258C42;
}

.modal-body.small {
  margin: 10px 0;
}

.seed-box {
  height: 80px;
  margin-bottom: 20px;
  border: 1px solid #979797;
  padding: 10px;
}

.seed-item {
  background-color: #258C42;
  color: #fff;
  padding: 3px;
  border-radius: 2px;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
}

.hidden-item {
  visibility: hidden;
}

.bottom-logo {
  position: absolute;
  z-index: -1;
  bottom: 0;
  right: 0;
}
</style>
