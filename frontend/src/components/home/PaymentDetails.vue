<template>
  <div class="content">
    <div class="row">
      <div class="text-center cbt-title">
        <h2 v-if="cbtAmount">{{ cbtAmount }} CBT</h2>
        <h2 v-else>0 CBT</h2>
      </div>
    </div>
    <div class="row">
      <div class="text-center">
        <strong>1 USD = {{ tokenUnitsPerUSD }} CBT Tokens</strong>
      </div>
    </div>
    <div class="row">
      <label class="pull-left title-usd-amount">Enter amount in USD</label>
      <input class="form-control input-usd-amount" type="text" v-model="usdAmountInput" placeholder="Amount" :disabled="isUSDAmountNotEmpty">
    </div>
  </div>
</template>


<script>
import { isEmpty } from 'lodash'
import { computeTokenAmount } from '../../lib/util'

export default {
  name: 'PaymentDetails',
  props: ['usdAmount', 'tokenUnitPrice'],
  data() {
    return {
      usdAmountInput: null,
    };
  },
  computed: {
    isUSDAmountNotEmpty() {
      return !isEmpty(this.usdAmount)
    },
    cbtAmount () {
      return this.usdAmountInput && this.tokenUnitPrice && computeTokenAmount(this.usdAmountInput, this.tokenUnitPrice);
    },
    tokenUnitsPerUSD () {
      return this.tokenUnitPrice && this.tokenUnitPrice;
    }
  },
  updated () {
    if (this.usdAmount) {
      this.usdAmountInput = this.usdAmount;
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
