<template>
<div class="content">

  <div v-if="transactionLink" class="receipt">
    <div class="row">{{ numberOfConfirmationsFormatted }} Confirmations</div>
    <!-- <div class="row">No. of Confirmations</div> -->
    <div class="col-xs-12 text-center external-link" v-if="transactionLink">
      <a :href="transactionLink" target="_blank">View on Blockchain</a>
    </div>
    <div class="row" v-if="transactionError">{{ transactionError }}</div>
  </div>

  <div v-else class="pay-to">

      Your tokens are allocated for:

      <div id="clockdiv">
        <span class="minutes">20</span>:
        <!-- <div class="smalltext">Minutes</div> -->
        <span class="seconds">00</span>
        <!-- <div class="smalltext">Seconds</div> -->
      </div>

    <div class="pay">Please pay</div>
    <div class="btc-amount">
      <i class="fa fa-btc" v-if="isBTC" /> {{ cryptoAmount }} {{ coin }}</div>
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
</div>
</template>


<script>
import Qrcode from 'v-qrcode'
import {
  isBTC,
  fetchTxid,
  fetchConfirmations,
  requiredMinConfirmations
} from '../../lib/util'

export default {
  name: 'InvoiceSummary',
  props: [
    'cryptoAmount',
    'coin',
    'paymentAddress',
    'usdAmount'
  ],
  beforeMount() {
    this.refreshTxStatus();
  },
  data() {
    return {
      copiedToClipboard: false,

      transactionLink: null,
      txid: null,
      numberOfConfirmations: 0,
      txChecker: null,
      transactionError: null
    }
  },
  components: {
    Qrcode
  },
  methods: {
    refreshTxStatus() {
      fetchTxid(this);
    },

    onCopy: function(e) {
      this.copiedToClipboard = true
      setTimeout(() => this.copiedToClipboard = false, 2000)
    },

    refreshTxStatus() {
      fetchTxid(this);
    },

    onError: function(e) {
      // TODO complete
    },

    initializeClock(id, endtime) {
      function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        return {
          'minutes': minutes,
          'seconds': seconds
        };
      }

      console.log('CLOCK INITIALIZED');
      var clock = document.getElementById(id);
      var minutesSpan = clock.querySelector('.minutes');
      var secondsSpan = clock.querySelector('.seconds');

      function updateClock() {
        var t = getTimeRemaining(endtime);

        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }

      updateClock();
      var timeinterval = setInterval(updateClock, 1000);
    }

    // var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
    // initializeClock('clockdiv', deadline);

  },
  computed: {
    isBTC() {
      return isBTC(this.coin);
    },
    coinType() {
      return isBTC(this.coin) ? 'Bitcoin' : 'Ethereum';
    },
    numberOfConfirmationsFormatted() {
      const number = this.numberOfConfirmations || 0;
      const minNumber = requiredMinConfirmations(this.coin);
      return number > minNumber ? `${minNumber}+` : number.toString();
    }
  },
  mounted() {
    const that = this;

    // var deadline = new Date('2017-12-25');

    var twentyMinutesLater = new Date();
    twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 20);

    this.initializeClock('clockdiv', twentyMinutesLater);

    this.txChecker = setInterval(function() {
      if (!that.txid) {
        // fetch txid
        fetchTxid(that);
      }
      if (that.numberOfConfirmations && that.numberOfConfirmations > requiredMinConfirmations(that.coin)) {
        if (that.txChecker) {
          clearInterval(that.txChecker);
          that.txChecker = null;
        }
      } else {
        if (that.txid) {
          fetchConfirmations(that);
        }
      }
    }, 10000);
  },
  destroyed() {
    if (this.txChecker) {
      clearInterval(this.txChecker)
    }
  },
}
</script>

<style scoped>
#clockdiv {
  margin-bottom: 20px;

}
.content {
  color: #141414;
  font-family: "Open Sans";
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  padding: 20px 10px;
  padding-bottom: 60px;
  position: relative;
  min-height: 300px;
}

.btc-address {
  margin-bottom: 60px;
  position: relative;
}

.clipboard-wrapper {
  position: relative;
}

.btc-address:hover>div {
  display: block;
}

.clipboard {
  display: none;
  position: absolute;
  bottom: -35px;
  color: white;
  left: 0;
  right: 0;
  background: rgba(0, 128, 0, 0.88);
  border-radius: 5px;
  /*width: 230px;*/
  margin: 0 auto;
  padding: 5px;
}
</style>
