<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <modal v-if="showModal" />
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
                  Please enter in your invite code
                </div>
              </div>
              <div class="row">
                <div v-bind:class="{ 'invite-code-input-red': !isValid, 'invite-code-input-green': isValid }">
                  <input class="form-control span6" placeholder="Enter your invitation code." v-model="inviteCode" />
                </div>
              </div>
              <div class="row">
                <div class="checkbox">
                  <label><input type="checkbox"  v-model="checked">I certify that I am not a citizen of resident of the United States of America or The Republic of Singapore</label>
                </div>
              </div>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-success btn-lg btn-block" @click="login" :disabled="isFormNotValid">Submit Invite Code</button>
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
import httpStatus from 'http-status-codes';
import { isEmpty } from 'lodash';
import Modal from './TermsConfirmationModal.vue'
import  endpoints from '../../lib/endpoints'
import { setAccessToken } from '../../lib/vault'

const access_token_ttl = 30 * 60 * 1000;

export default {
  name: 'Login',
  components: {
    Modal
  },
  data: function() {
    return {
      inviteCode: null,
      checked: null,
      errorResponse: null,
      showModal: null
    }
  },
  methods: {
    login () {
      // TODO:: toggle progress bar
      if (isEmpty(this.inviteCode)) {
        // empty phrase
        this.errorResponse = 'code is empty.';
      } else if (!this.isValid) {
        // check phrase
        this.errorResponse = 'code is not valid, must be at least 10 chars.';
      } else {
        this.errorResponse = null;
        const that = this;
        this.doLogin()
          .then(response => that.parseResult(response))
          .catch(error => that.handleError(error))
          .then(data => {
            const accessToken = data && data.access_token_id;
            if (accessToken) {
              setAccessToken(accessToken, access_token_ttl);
              this.showModal = true;
            }
          });
      }
    },
    handleError (error) {
      console.log(error);
      this.errorResponse = "Failed to connect to server, please try again.";
    },
    parseResult (response) {
      if (response.status === httpStatus.CREATED) {
        return response.json();
      } else if (response.status == httpStatus.NOT_FOUND) {
        this.errorResponse = "Unknown code, please check your input.";
        return null;
      } else {
        this.errorResponse = "Unexpected error occured, please try again.";
        return null;
      }
    },
    doLogin (hdPrvKey) {
      const data = {
        invite_code: this.inviteCode
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
    isValid () {
      return !isEmpty(this.inviteCode) && this.inviteCode.length >= 10;
    },
    isFormNotValid () {
      return !this.isValid || !this.checked
    }
  },
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 650px;
  height: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
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
  padding-top: 10px;
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
