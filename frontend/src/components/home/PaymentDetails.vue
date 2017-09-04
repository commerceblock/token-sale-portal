<template>
  <div class="content">
    <div class="row">
      <div class="text-center cbt-title">
        <h2 v-if="cbtAmount">{{ cbtAmount }} CBT</h2>
        <h2 v-else>0.0 CBT</h2>
      </div>
    </div>
    <div class="row">
      <div class="text-center">
        <strong>1 CommerceBlock Token = 10 USD</strong>
      </div>
    </div>
    <div class="row">
      <div class="text-center">
        <small>25% Preorder Bouns</small>
      </div>
    </div>
    <div class="row">
      <label class="pull-left title-usd-amount">Enter amount in USD</label>
      <input class="form-control input-usd-amount" type="text" v-model="usdAmountInput" placeholder="Amount" :disabled="isUSDAmountNotEmpty">
    </div>
    <div class="row">
      <div class="input-group form-group">
        <label class="pull-left title-usd-amount">How you would like to pay?</label>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-6">
        <label class="radio-inline radio-center">
          <input type="radio" name="currencyType" value="btc" v-model="coinInput" :disabled="isCoinNotEmpty">
          <img height="30" src="/static/assets/bitcoin-logo.png" />
        </label>
      </div>
      <div class="col-xs-6">
        <label class="radio-inline radio-center">
          <input type="radio" name="currencyType" value="eth" v-model="coinInput" :disabled="isCoinNotEmpty">
          <img height="30" src="/static/assets/ether-logo.png" />
        </label>
      </div>
    </div>
  </div>
</template>


<script>
import { isEmpty } from 'lodash'

export default {
  name: 'PaymentDetails',
  props: ['usdAmount', 'coin'],
  data() {
    return {
      cbtAmount: null,
      usdAmountInput: null,
      coinInput: null,
    };
  },
  computed: {
    isUSDAmountNotEmpty() {
      return !isEmpty(this.usdAmount)
    },
    isCoinNotEmpty() {
      return !isEmpty(this.coin)
    },
  },
  updated () {
    if (this.usdAmount) {
      this.usdAmountInput = this.usdAmount;
    }
    if (this.coin) {
      this.coinInput = this.coin;
    }
  },
}
</script>

<style scoped>
.content {
  color: #141414;
  font-family: "Open Sans";
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  padding: 50px;
  padding-bottom: 100px;
}

.cbt-title {
  color: #258C42;
}

.title-usd-amount {
  margin-top: 25px;
}

.title-usd-input {
  padding-left: 20px;
}

.input-usd-amount {
  padding-left: 20px;
}

.radio-center {
  display: flex;
  align-items: center;
  padding-left: 55px;
}
</style>
