<template>
  <div class="content">
    <div class="pay">Please pay</div>
    <div class="btc-amount">
      <i class="fa fa-btc"></i> {{ cryptoAmount }} {{ coinSymbol }}</div>
    <!-- <div class="usd-amount">10.00 USD</div> -->
    <div class="scan">Scan QR with your Bitcoin wallet</div>
    <qrcode :value="cryptoAddress" :size="150" :type="'image'" :padding="10" v-if="cryptoAddress" />
    <div class="pay">OR Pay using a Bitcoin address</div>
    <div class="btc-address">
      <a href="javascript:;" v-clipboard:copy="cryptoAddress" v-clipboard:success="onCopy" v-clipboard:error="onError">{{cryptoAddress}}</a>
    </div>
  </div>
</template>


<script>
import Qrcode from 'v-qrcode'

export default {
  name: 'InvoiceSummary',
  props: [
    'cryptoAmount',
    'coinSymbol',
    'cryptoAddress',
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
