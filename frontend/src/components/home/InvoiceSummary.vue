<template>
  <div class="content">
    <div class="pay">Please pay</div>
    <div class="btc-amount">
      <i class="fa fa-btc" v-if="isBTC"/> {{ cryptoAmount }} {{ coin }}</div>
    <div class="usd-amount">{{ usdAmount }} USD</div>
    <div class="scan">Scan QR with your {{ coinType }} wallet</div>
    <qrcode :value="paymentAddress" :size="150" :type="'image'" :padding="10" v-if="paymentAddress" />
    <div class="pay">OR Pay using a {{ coinType }} address</div>
    <div class="btc-address">
      <a href="javascript:;" v-clipboard:copy="paymentAddress" v-clipboard:success="onCopy" v-clipboard:error="onError">{{paymentAddress}}</a>
    </div>
  </div>
</template>


<script>
import Qrcode from 'v-qrcode'
import { isBTC } from '../../lib/util'

export default {
  name: 'InvoiceSummary',
  props: [
    'cryptoAmount',
    'coin',
    'paymentAddress',
    'usdAmount',
  ],
  components: {
    Qrcode
  },
  methods: {
    onCopy: function(e) {
      // TODO complete
    },
    onError: function(e) {
      // TODO complete
    },
  },
  computed: {
    isBTC () {
      return isBTC(this.coin);
    },
    coinType () {
      return isBTC(this.coin) ? 'Bitcoin' : 'Ethereum';
    }
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
  padding-bottom: 60px;
}

.btc-address {
  margin-bottom: 30px;
}
</style>
