<template>
  <div class="content">
    <div class="timer">
      <small>Invoice will expire in {{ timeLeft }} </small>
    </div>
    <div class="pay">Please pay</div>
    <div class="btc-amount">
      <i class="fa fa-btc"></i> {{ btcAmount }}</div>
    <!-- <div class="usd-amount">10.00 USD</div> -->
    <div class="scan">Scan QR with your Bitcoin wallet</div>
    <qrcode :value="bitcoinAddress" :size="150" :type="'image'" :padding="10" v-if="bitcoinAddress" />
    <div class="pay">OR Pay using a Bitcoin address</div>
    <div class="btc-address">
      <a href="javascript:;" v-clipboard:copy="bitcoinAddress" v-clipboard:success="onCopy" v-clipboard:error="onError">{{bitcoinAddress}}</a>
    </div>
  </div>
</template>


<script>
import Qrcode from 'v-qrcode'

export default {
  name: 'InvoiceSummary',
  props: [],
  data() {
    return {
      timeLeft: null,
      btcAmount: null,
      bitcoinAddress: '1XABCD',
    };
  },
  components: {
    Qrcode
  },
  computed: {
  },
  methods: {
    onCopy: function(e) {
      // TODO complete
      console.log('onCopy')
    },
    onError: function(e) {
      // TODO complete
      console.log('onError')
    },
  }
}
</script>

<style scoped>
.content {
  color: #141414;
  font-family: "Open Sans";
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  padding: 20px 10px;
}

.timer {
  // margin-top: 5px;
  margin-bottom: 10px;
}

.btc-address {
  margin-bottom: 30px;
}
</style>
