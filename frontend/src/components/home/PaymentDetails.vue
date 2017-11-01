<template>
  <div class="content">
    <div class="row">
      <div class="text-center cbt-title">
        <h2 v-if="cbtAmount">{{ cbtAmount }} CBT</h2>
        <h2 v-else>0 CBT</h2>
      </div>
    </div>
    <div class="row">
      <div style="text-align: left">
        <strong>1 USD = {{ tokenUnitsPerUSD }} CBT Tokens</strong>
        <br>
        <strong>1 CBT = {{ this.changeRates.BTC }} BTC</strong>
        <br>
        <strong>1 CBT = {{ this.changeRates.ETH }} ETH</strong>
        <br>
        <!-- <strong>1 CBT = {{ this.changeRates.ETH }} ETH</strong> -->
      </div>
    </div>
    <div class="row">
      <label class="pull-left title-usd-amount">Enter amount in USD</label>
      <input class="form-control input-usd-amount" type="text" v-model="usdAmountInput" placeholder="Amount" :disabled="isUSDAmountNotEmpty" ref="usdAmount">
    </div>

    <div class="row">
      <div class="form-group">
        <label class="pull-left title">Enter Ethereum CBT token receiving address. <br> You need to control private and public key of this address.</label>
        <input class="form-control" type="text" v-model="ethereumReturnAddressInput" placeholder="Etherum address"  :disabled="isEthereumReturnAddressNotEmpty" ref="ethereumReturnAddress"/>
        <div class="col-xs-12">
        </div>
      </div>
    </div>

  </div>
</template>

<!-- use this for changeRates: {{this.changeRates.BTC}} -->

<script>
import { isEmpty } from 'lodash'
import { computeTokenAmount } from '../../lib/util'

export default {
  name: 'PaymentDetails',
  props: ['usdAmount', 'tokenUnitPrice', 'changeRates', 'ethereumReturnAddress', 'ethereumWalletProvider'],
  data() {
    return {
      usdAmountInput: null,
      ethereumReturnAddressInput: null,
      ethereumWalletProviderInput: null
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
    },
    isEthereumReturnAddressNotEmpty () {
      return !isEmpty(this.ethereumReturnAddress);
    },
    isEthereumWalletProviderNotEmpty () {
      return !isEmpty(this.ethereumWalletProvider);
    },
  },
  updated () {
    if (this.usdAmount) {
      this.usdAmountInput = this.usdAmount;
    }
    if (this.ethereumReturnAddress) {
      this.ethereumReturnAddressInput = this.ethereumReturnAddress;
    }
    if (this.ethereumWalletProvider) {
      this.ethereumWalletProviderInput = this.ethereumWalletProvider;
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
  padding: 0 50px;
  padding-bottom: 100px;
  position: relative;
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
