<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header center">
            <slot name="header">
              <span class="tab-title">Congratulations!</span>
              <button type="button" class="close" data-dismiss="modal" @click="close">&times;</button>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <p>Thank you for participating in our token sale. The tokens will be distributed within [48 hours] of the token sale closing.</p>
              <p>We look forward to bringing further updates so please stay tuned via the Telegram channel and becoming part of our Twitter community.</p>

              Tell your friends!<br>
              <iframe
  src="https://platform.twitter.com/widgets/tweet_button.html?size=l&url=https%3A%2F%2Fwww.commerceblock.com&via=CommerceBlock&related=twitterapi%2Ctwitter&text=I%20just%20contributed%20to%20CommerceBlock%20token%20sale%21&hashtags=CommerceBlock%2CTokenSale%2CCBT"
  width="140"
  height="28"
  title="Twitter Tweet Button"
  style="border: 0; overflow: hidden;">
</iframe>
            </slot>
          </div>

           <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-success btn-lg btn-block " @click="close">Done</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NextStepsModal',
  methods: {
    close: function (event) {
      this.$emit('close');
    },
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
  text-align: justify !important;
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

.done-btn {
  margin: 20px;
}
</style>
