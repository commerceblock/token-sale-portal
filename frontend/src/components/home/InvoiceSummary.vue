<template>
<div class="content">
  <div class="pay">Please pay</div>
  <div class="btc-amount">
    <i class="fa fa-btc" v-if="isBTC" /> {{ cryptoAmount }} {{ coin }}</div>
  <div class="usd-amount">{{ usdAmount }} USD</div>
  <div class="scan">Scan QR with your {{ coinType }} wallet</div>
  <qrcode :value="paymentAddress" :size="150" :type="'image'" :padding="10" v-if="paymentAddress" />
  <div class="pay">Or pay to CommerceBlock {{ coinType }} address</div>
  <div class="btc-address">
      <div v-if="copiedToClipboard" class="clipboard">
        Address copied in your clipboard!
      </div>

      <div v-else class="clipboard">
        Copy to your clipboard
      </div>

    <a href="javascript:;" v-clipboard:copy="paymentAddress" v-clipboard:success="onCopy" v-clipboard:error="onError">{{paymentAddress}}</a>
  </div>
</div>
</template>


<script>
import Qrcode from 'v-qrcode'
import {
  isBTC
} from '../../lib/util'

export default {
  name: 'InvoiceSummary',
  props: [
    'cryptoAmount',
    'coin',
    'paymentAddress',
    'usdAmount'
  ],
  data() {
    return {
      copiedToClipboard: false
    }
  },
  components: {
    Qrcode
  },
  methods: {
    onCopy: function(e) {
      this.copiedToClipboard = true
      setTimeout(() => this.copiedToClipboard = false, 2000)

    },
    onError: function(e) {
      // TODO complete
    },
  },
  computed: {
    isBTC() {
      return isBTC(this.coin);
    },
    coinType() {
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
  position: relative;
}

.btc-address {
  margin-bottom: 30px;
  position: relative;
}

.clipboard-wrapper {
  position: relative;
}

.btc-address:hover > div {
  display: block;
}

.clipboard {
  display: none;
  position: absolute;
  top: -60px;
  color: white;
  left: 0;
  right: 0;
  background: rgba(0, 128, 0, 0.88);
  border-radius: 5px;
  width: 230px;
  margin: 0 auto;
  padding: 5px;
}
</style>
