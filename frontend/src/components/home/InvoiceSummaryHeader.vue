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

  <div>

      <span>Invoice ID: <br> <a :href="`/invoices/${this.invoiceId}`" id="invoice-id" target="_blank">{{ invoiceId }}</a></span>
      <div>{{ cbtTokenAmount }} CBT Tokens Purchased</div>

  </div>
</div>
</template>

<script>
import {
  fetchTxid,
  fetchConfirmations,
  requiredMinConfirmations
} from '../../lib/util';
import InvoiceSummary from '../invoice/InvoiceSummary.vue'

export default {
  name: 'InvoiceSummaryHeader',
  props: [
    'cbtTokenAmount',
    'paymentAddress',
    'coin',
    'invoiceId',
  ],
  data() {
    return {
      txid: null,
      transactionLink: null,
      numberOfConfirmations: 0,
      txChecker: null,
      transactionError: null,
    };
  },
  computed: {
    numberOfConfirmationsFormatted() {
      const number = this.numberOfConfirmations || 0;
      const minNumber = requiredMinConfirmations(this.coin);
      return number > minNumber ? `${minNumber}+` : number.toString();
    }
  },
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

#invoice-id {
  text-decoration: underline;
}
</style>
