<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header center">
            <slot name="header">
              <span class="tab-title">Token Sale Terms</span>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="row">
                <div class="checkbox pull-left">
                  <label><input type="checkbox"  v-model="checked1">Click here to confirm that you are neither a United States citizen nor resident, and don't have primary residence or domicile in the United States, including Puerto Rico, the U.S. Virgin Islands and any other possessions of the United States.</label>
                </div>
              </div>
              <div class="row">
                <div class="checkbox pull-left">
                  <label><input type="checkbox"  v-model="checked2">Click here to confirm that you have read and understood the Token Sale Policy and expressly accept all terms, conditions, obligations, affirmations, representations and warrenties described in these Terms and agree to be bound by them.</label>
                </div>
              </div>
              <div class="row">
                <div class="checkbox pull-left">
                  <label><input type="checkbox"  v-model="checked3">Click here to confirm that you have read and understood the Gereral Terms and Conditions and Privacy Policy and expressly accept all terms, conditions, obligations, affirmations, representations and warrenties described in these Terms and agree to be bound by them.</label>
                </div>
              </div>
              <div class="row">
                <div class="checkbox pull-left">
                  <label><input type="checkbox"  v-model="checked4">Click here to confirm that you have read the CommerceBlock White Paper.</label>
                </div>
              </div>
            </slot>
          </div>

           <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-success btn-lg btn-block " @click="redirectToHome" :disabled="isFormNotValid">Continue to Token Sale</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TermsConfirmationModal',
  data () {
    return {
      checked1: null,
      checked2: null,
      checked3: null,
      checked4: null,
    }
  },
  methods: {
    redirectToHome () {
      this.$router.push('/');
    }
  },
  computed: {
    isFormNotValid () {
      return !this.checked1 || !this.checked2 || !this.checked3 || !this.checked4
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
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
  text-align: center;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 650px;
  height: 550px;
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
  text-align: justify;
}

.modal-default-button {
  float: right;
}

.tab-title {
  color: #141414;
  font-family: "Open Sans";
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
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

.title {
  color: #141414;
  font-family: "Open Sans";
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
}

a, a:link, a:visited, a:hover, a:active {
  padding-top: 5px;
  color: #258C42;
}

.done-btn {
  margin: 20px;
}
</style>
