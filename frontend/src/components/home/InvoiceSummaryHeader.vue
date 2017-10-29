<template>
<div class="header">
  <div class="top">
    <div class="row">
      <img class="commerce-block-white-bg" src="/static/assets/white-logo.png" />
      <span class="commerce-block-green">
          <img src="/static/assets/company-name.svg" />
        </span>
      <img class="icon-lock-green" src="/static/assets/icon-lock-green.svg" />
    </div>
  </div>

  <div class="row" style="display:flex">
    <div class="col-xs-6 text-center" >
      <div class="row">{{ cbtTokenAmount }} CBT</div>
      <div class="row">Tokens Purchased</div>
    </div>
    <div class="col-xs-6 text-center">
      <div class="row" v-if="transactionLink">{{ numberOfConfirmationsFormatted }} Confirmations</div>
      <!-- <div class="row">No. of Confirmations</div> -->
      <div class="col-xs-12 text-center external-link" v-if="transactionLink">
        <a :href="transactionLink" target="_blank">View on Blockchain</a>
      </div>
      <div class="row" v-if="transactionError">{{ transactionError }}</div>
    </div>

  </div>
</div>
</template>

<script>
import {
  fetchTxid,
  fetchConfirmations,
  requiredMinConfirmations
} from '../../lib/util';

export default {
  name: 'InvoiceSummaryHeader',
  props: [
    'cbtTokenAmount',
    'paymentAddress',
    'coin',
  ],
  data() {
    return {
      txid: null,
      transactionLink: null,
      numberOfConfirmations: 0,
      txChecker: null,
      transactionError: null
    };
  },
  computed: {
    numberOfConfirmationsFormatted() {
      const number = this.numberOfConfirmations || 0;
      const minNumber = requiredMinConfirmations(this.coin);
      return number > minNumber ? `${minNumber}+` : number.toString();
    }
  },
  methods: {
    // refreshTxStatus() {
    //   fetchTxid(this);
    // },

    // getTimeRemaining(endtime) {
    //   var t = Date.parse(endtime) - Date.parse(new Date());
    //   var seconds = Math.floor((t / 1000) % 60);
    //   var minutes = Math.floor((t / 1000 / 60) % 60);
    //   var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    //   var days = Math.floor(t / (1000 * 60 * 60 * 24));
    //   return {
    //     'total': t,
    //     'days': days,
    //     'hours': hours,
    //     'minutes': minutes,
    //     'seconds': seconds
    //   };
    // },
    //
    // initializeClock(id, endtime) {
    //   var clock = document.getElementById(id);
    //   var minutesSpan = clock.querySelector('.minutes');
    //   var secondsSpan = clock.querySelector('.seconds');
    //
    //   function updateClock() {
    //     var t = getTimeRemaining(endtime);
    //
    //     minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    //     secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    //
    //     if (t.total <= 0) {
    //       clearInterval(timeinterval);
    //     }
    //   }
    //
    //   updateClock();
    //   var timeinterval = setInterval(updateClock, 1000);
    // }

    // var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
    // initializeClock('clockdiv', deadline);

  },
  // beforeMount() {
  //   this.refreshTxStatus();
  // },
  // mounted() {
  //   var deadline = new Date('2017-12-25');
  //   this.initializeClock('clockdiv', deadline);
  //
  //   const that = this;
  //   // this.txChecker = setInterval(function() {
  //   //   if (!that.txid) {
  //   //     // fetch txid
  //   //     fetchTxid(that);
  //   //   }
  //   //   if (that.numberOfConfirmations && that.numberOfConfirmations > requiredMinConfirmations(that.coin)) {
  //   //     if (that.txChecker) {
  //   //       clearInterval(that.txChecker);
  //   //       that.txChecker = null;
  //   //     }
  //   //   } else {
  //   //     if (that.txid) {
  //   //       fetchConfirmations(that);
  //   //     }
  //   //   }
  //   // }, 10000);
  // },
  // destroyed() {
  //   if (this.txChecker) {
  //     clearInterval(this.txChecker)
  //   }
  // },
}
</script>

<style scoped>
.header {
  border-radius: 3px 3px 0 0;
  background-color: #258C42;
  color: #ffffff;
  padding: 5px;
  padding-bottom: 25px;
}

.top {
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
  margin-bottom: 25px;
}

.commerce-block-green {
  margin-top: -5px;
}

a:link {
  color: #ffffff;
}

a:visited {
  color: #ffffff;
}

.external-link {
  font-size: 12px;
  text-decoration: underline;
}

.commerce-block-white-bg {
  height: 24px;
}

#clockdiv {
  font-family: Lato, sans-serif;
  color: #fff;
  display: inline-block;
  font-weight: 500;
  text-align: center;
  font-size: 30px;
  display: flex;
  justify-content: center;
}

#clockdiv>div {
  padding: 3px;
  border-radius: 3px;
  background: #207438;
  display: inline-block;
  margin: 4px;
}

#clockdiv div>span {
  padding: 15px;
  border-radius: 3px;
  background: black;
  display: inline-block;
}

.smalltext {
  padding-top: 5px;
  font-size: 16px;
}
</style>
